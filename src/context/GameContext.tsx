import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  DifficultyMode,
  Formation,
  FilledSlot,
  GameChallenge,
  GameStatus,
  GameSettings,
  GameStats,
  Player,
  PitchPositionSlot,
} from '../types';
import { FORMATIONS, getFormationById, canPlayerPlayPosition } from '../data/formations';
import { getRandomChallenge, getRandomFourPlayers, findMatchingPlayerInSquad } from '../data/worldCupSquads';
import {
  loadSettings,
  saveSettings,
  loadStats,
  saveGameWinStats,
  recordGameLossStats,
  resetStats as resetLocalStats,
} from '../utils/storage';
import { soundFx } from '../utils/audio';
import { evaluateUserSquadRank, calculateContinuePenaltyInfo } from '../utils/squadRanking';

interface GameContextType {
  status: GameStatus;
  difficulty: DifficultyMode;
  formation: Formation;
  filledSlots: FilledSlot[];
  currentChallenge: GameChallenge | null;
  skipsRemaining: number;
  strikes: number; // Max 5
  elapsedSeconds: number;
  continuePenalty: number;
  pendingPositionPlayer: { player: Player; validSlots: PitchPositionSlot[] } | null;
  selectedPitchPlayer: Player | null; // For viewing details on click
  settings: GameSettings;
  stats: GameStats;
  messageBanner: { text: string; type: 'success' | 'error' | 'info' } | null;

  // Actions
  setDifficulty: (diff: DifficultyMode) => void;
  setFormationId: (id: string) => void;
  startNewGame: (diff?: DifficultyMode, formId?: string) => void;
  selectPlayerOption: (player: Player) => void;
  confirmPositionAssignment: (slotId: string) => void;
  cancelPositionAssignment: () => void;
  skipChallenge: () => void;
  submitHardSearch: (playerNameQuery: string) => { success: boolean; message: string };
  continueWithPenalty: () => void;
  restartGame: () => void;
  goToHome: () => void;
  setSelectedPitchPlayer: (player: Player | null) => void;
  updateSettings: (newSettings: Partial<GameSettings>) => void;
  resetAllStats: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [stats, setStats] = useState<GameStats>(loadStats);

  const [status, setStatus] = useState<GameStatus>('idle');
  const [difficulty, setDifficulty] = useState<DifficultyMode>('easy');
  const [formation, setFormation] = useState<Formation>(FORMATIONS[0]);
  const [filledSlots, setFilledSlots] = useState<FilledSlot[]>([]);
  const [currentChallenge, setCurrentChallenge] = useState<GameChallenge | null>(null);
  const [skipsRemaining, setSkipsRemaining] = useState<number>(3);
  const [strikes, setStrikes] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [continuePenalty, setContinuePenalty] = useState<number>(0);

  const [pendingPositionPlayer, setPendingPositionPlayer] = useState<{
    player: Player;
    validSlots: PitchPositionSlot[];
  } | null>(null);
  const [selectedPitchPlayer, setSelectedPitchPlayer] = useState<Player | null>(null);
  const [messageBanner, setMessageBanner] = useState<{
    text: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Sync sound settings with AudioSynthesizer
  useEffect(() => {
    soundFx.setEnabled(settings.soundEnabled);
    soundFx.setVolume(settings.soundVolume);
  }, [settings]);

  // Timer loop when playing
  useEffect(() => {
    let interval: any = null;
    if (status === 'playing') {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const showBanner = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    setMessageBanner({ text, type });
    setTimeout(() => {
      setMessageBanner(null);
    }, 3500);
  };

  const setFormationId = (id: string) => {
    const f = getFormationById(id);
    setFormation(f);
  };

  // Helper: Get open (unfilled) slots in current formation
  const getUnfilledSlots = useCallback((): PitchPositionSlot[] => {
    const filledSlotIds = filledSlots.map((s) => s.slotId);
    return formation.slots.filter((slot) => !filledSlotIds.includes(slot.id));
  }, [formation, filledSlots]);

  // Helper: Get open (unfilled) positions in current formation
  const getUnfilledPositions = (slots: FilledSlot[], form: Formation): string[] => {
    const filledSlotIds = slots.map((s) => s.slotId);
    return form.slots
      .filter((slot) => !filledSlotIds.includes(slot.id))
      .map((slot) => slot.position);
  };

  // Helper: Get identifiers of players already selected in 11 squad members
  const getSelectedIdentifiers = (slots: FilledSlot[]): string[] => {
    const ids: string[] = [];
    slots.forEach((s) => {
      ids.push(s.player.id);
      ids.push(s.player.name);
    });
    return ids;
  };

  // Generate next challenge
  const nextChallenge = useCallback(
    (overrideFilled?: FilledSlot[]) => {
      const currentFilled = overrideFilled !== undefined ? overrideFilled : filledSlots;
      const excluded = getSelectedIdentifiers(currentFilled);
      const unfilledPositions = getUnfilledPositions(currentFilled, formation);

      const squad = getRandomChallenge(excluded, unfilledPositions);
      const options = getRandomFourPlayers(squad, excluded, unfilledPositions);
      setCurrentChallenge({
        id: `${squad.country}-${squad.year}-${Date.now()}`,
        year: squad.year,
        country: squad.country,
        countryCode: squad.countryCode,
        flagEmoji: squad.flagEmoji,
        squad: squad.players,
        options,
      });
    },
    [filledSlots, formation]
  );

  // Start new game
  const startNewGame = (diff?: DifficultyMode, formId?: string) => {
    const chosenDiff = diff || difficulty;
    const chosenForm = formId ? getFormationById(formId) : formation;

    setDifficulty(chosenDiff);
    setFormation(chosenForm);
    setFilledSlots([]);
    setSkipsRemaining(3);
    setStrikes(0);
    setElapsedSeconds(0);
    setContinuePenalty(0);
    setPendingPositionPlayer(null);
    setSelectedPitchPlayer(null);
    setStatus('playing');

    soundFx.playWhistle();
    if (settings.hapticsEnabled) soundFx.triggerHaptic();

    // Draw first challenge with empty selected list
    const unfilledPositions = chosenForm.slots.map((s) => s.position);
    const squad = getRandomChallenge([], unfilledPositions);
    const options = getRandomFourPlayers(squad, [], unfilledPositions);
    setCurrentChallenge({
      id: `${squad.country}-${squad.year}-${Date.now()}`,
      year: squad.year,
      country: squad.country,
      countryCode: squad.countryCode,
      flagEmoji: squad.flagEmoji,
      squad: squad.players,
      options,
    });
  };

  // Handle position assignment
  const lockPlayerToSlot = useCallback(
    (player: Player, slotId: string) => {
      soundFx.playSelectPlayer();
      if (settings.hapticsEnabled) soundFx.triggerHaptic();

      const newFilled = [...filledSlots, { slotId, position: player.primaryPosition, player, assignedAt: Date.now() }];
      setFilledSlots(newFilled);
      setPendingPositionPlayer(null);

      // Check if XI complete
      if (newFilled.length === 11) {
        setStatus('completed');
        soundFx.playFanfare();

        // Calculate average rating
        const totalRating = newFilled.reduce((acc, curr) => acc + curr.player.overallRating, 0);
        const avgRating = Math.round((totalRating / 11) * 10) / 10;

        const uniqueCountries = new Set(newFilled.map((s) => s.player.country)).size;
        const uniqueYears = new Set(newFilled.map((s) => s.player.year)).size;

        // Calculate squad score & rank
        const rankInfo = evaluateUserSquadRank(newFilled, difficulty, elapsedSeconds, formation.name, continuePenalty);

        const record = {
          id: `game-${Date.now()}`,
          date: new Date().toLocaleDateString(),
          difficulty,
          formation: formation.name,
          squadName: `${formation.name} World Cup XI`,
          averageRating: avgRating,
          squadScore: rankInfo.scoreResult.score,
          squadRank: rankInfo.rank,
          completedTimeSeconds: elapsedSeconds,
          uniqueCountriesCount: uniqueCountries,
          uniqueYearsCount: uniqueYears,
          players: newFilled.map((s) => ({
            slotPosition: s.position,
            playerName: s.player.name,
            country: s.player.country,
            year: s.player.year,
            rating: s.player.overallRating,
          })),
        };

        const newStats = saveGameWinStats(record, 3 - skipsRemaining, strikes);
        setStats(newStats);
        showBanner('🎉 Congratulations! Your World Cup XI is complete!', 'success');
      } else {
        // Draw next challenge with updated squad members list
        nextChallenge(newFilled);
      }
    },
    [filledSlots, skipsRemaining, strikes, difficulty, formation, elapsedSeconds, settings, continuePenalty, nextChallenge]
  );

  // User selects a player from Easy/Medium options or Hard search
  const selectPlayerOption = useCallback(
    (player: Player) => {
      // Check if player is already selected in 11 squad members
      const isAlreadySelected = filledSlots.some(
        (s) =>
          s.player.id.toLowerCase() === player.id.toLowerCase() ||
          s.player.name.toLowerCase() === player.name.toLowerCase()
      );

      if (isAlreadySelected) {
        soundFx.playStrike();
        showBanner(`${player.name} is already selected in your 11 squad members!`, 'error');
        return;
      }

      const unfilled = getUnfilledSlots();

      // Find all unfilled slots this player can legally play in
      const validSlots = unfilled.filter((slot) =>
        canPlayerPlayPosition(
          player.primaryPosition,
          player.secondaryPositions,
          slot.position,
          player.isGoalkeeper
        )
      );

      if (validSlots.length === 0) {
        soundFx.playStrike();
        showBanner(
          `No matching open positions in your ${formation.name} for ${player.name} (${player.primaryPosition}).`,
          'error'
        );
        return;
      }

      if (validSlots.length === 1) {
        // Auto-assign
        lockPlayerToSlot(player, validSlots[0].id);
      } else {
        // Multiple open slots! Prompt user to choose
        soundFx.playClick();
        setPendingPositionPlayer({ player, validSlots });
      }
    },
    [filledSlots, getUnfilledSlots, lockPlayerToSlot, formation]
  );

  const confirmPositionAssignment = (slotId: string) => {
    if (!pendingPositionPlayer) return;
    lockPlayerToSlot(pendingPositionPlayer.player, slotId);
  };

  const cancelPositionAssignment = () => {
    setPendingPositionPlayer(null);
  };

  // Skip challenge logic
  const skipChallenge = () => {
    if (skipsRemaining <= 0) {
      if (difficulty === 'hard') {
        continueWithPenalty();
        return;
      }
      soundFx.playStrike();
      showBanner('No skips remaining!', 'error');
      return;
    }
    soundFx.playClick();
    setSkipsRemaining((prev) => prev - 1);
    nextChallenge(filledSlots);
    showBanner('Challenge skipped. New World Cup squad drawn!', 'info');
  };

  const continueWithPenalty = () => {
    const { penaltyPoints, additionalSkips } = calculateContinuePenaltyInfo(filledSlots.length);
    setContinuePenalty((prev) => Math.round((prev + penaltyPoints) * 10) / 10);
    setSkipsRemaining((prev) => prev + additionalSkips);
    setStrikes(0);
    setStatus('playing');
    soundFx.playWhistle();
    if (settings.hapticsEnabled) soundFx.triggerHaptic();
    nextChallenge(filledSlots);
    showBanner(
      `Draft Continued! Added +${additionalSkips} Skips & reset strikes (-${penaltyPoints.toFixed(1)} rating penalty)`,
      'info'
    );
  };

  // Hard Mode search submission
  const submitHardSearch = (query: string): { success: boolean; message: string } => {
    if (!currentChallenge) return { success: false, message: 'No active challenge' };

    const matchedPlayer = findMatchingPlayerInSquad(query, currentChallenge.squad);

    if (matchedPlayer) {
      // Check if player is already selected in 11 squad members
      const isAlreadySelected = filledSlots.some(
        (s) =>
          s.player.id.toLowerCase() === matchedPlayer.id.toLowerCase() ||
          s.player.name.toLowerCase() === matchedPlayer.name.toLowerCase()
      );

      if (isAlreadySelected) {
        soundFx.playStrike();
        const msg = `${matchedPlayer.name} is already selected in your 11 squad members!`;
        showBanner(msg, 'error');
        return { success: false, message: msg };
      }

      // Correct player in squad!
      const unfilled = getUnfilledSlots();
      const validSlots = unfilled.filter((slot) =>
        canPlayerPlayPosition(
          matchedPlayer.primaryPosition,
          matchedPlayer.secondaryPositions,
          slot.position,
          matchedPlayer.isGoalkeeper
        )
      );

      if (validSlots.length === 0) {
        // Player is in squad, but formation has no open position for them
        soundFx.playClick();
        const msg = `${matchedPlayer.name} is part of the squad, but there are no valid positions left for this player in your ${formation.name}!`;
        showBanner(msg, 'info');
        return { success: false, message: msg };
      }

      selectPlayerOption(matchedPlayer);
      return { success: true, message: `Found ${matchedPlayer.name}!` };
    } else {
      // Incorrect player! Strike!
      soundFx.playStrike();
      const newStrikes = strikes + 1;
      setStrikes(newStrikes);

      if (newStrikes >= 5) {
        setStatus('gameover');
        recordGameLossStats();
        setStats(loadStats());
        showBanner('5 Strikes! Game Over!', 'error');
        return { success: false, message: '5 strikes reached. Game Over!' };
      } else {
        const msg = `Strike ${newStrikes}/5! "${query}" was not in ${currentChallenge.country} ${currentChallenge.year} squad.`;
        showBanner(msg, 'error');
        return { success: false, message: msg };
      }
    }
  };

  const restartGame = () => {
    startNewGame(difficulty, formation.id);
  };

  const goToHome = () => {
    setStatus('idle');
    setFilledSlots([]);
    setPendingPositionPlayer(null);
    setSelectedPitchPlayer(null);
    setSkipsRemaining(3);
    setStrikes(0);
    setElapsedSeconds(0);
    setContinuePenalty(0);
  };

  const updateSettings = (newSettings: Partial<GameSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      saveSettings(updated);
      return updated;
    });
  };

  const resetAllStats = () => {
    const res = resetLocalStats();
    setStats(res);
    showBanner('Statistics reset successfully.', 'info');
  };

  return (
    <GameContext.Provider
      value={{
        status,
        difficulty,
        formation,
        filledSlots,
        currentChallenge,
        skipsRemaining,
        strikes,
        elapsedSeconds,
        continuePenalty,
        pendingPositionPlayer,
        selectedPitchPlayer,
        settings,
        stats,
        messageBanner,
        setDifficulty,
        setFormationId,
        startNewGame,
        selectPlayerOption,
        confirmPositionAssignment,
        cancelPositionAssignment,
        skipChallenge,
        submitHardSearch,
        continueWithPenalty,
        restartGame,
        goToHome,
        setSelectedPitchPlayer,
        updateSettings,
        resetAllStats,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
