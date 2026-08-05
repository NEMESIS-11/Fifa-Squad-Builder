import { GameStats, GameSettings, GameHistoryRecord } from '../types';

const STATS_KEY = 'fifa_squad_builder_stats_v1';
const SETTINGS_KEY = 'fifa_squad_builder_settings_v1';

export const DEFAULT_SETTINGS: GameSettings = {
  soundEnabled: true,
  soundVolume: 0.6,
  pitchTheme: 'classic',
  hapticsEnabled: true,
};

export const getInitialStats = (): GameStats => ({
  gamesPlayed: 0,
  gamesWon: 0,
  bestAverageRating: 0,
  fastestTimeSeconds: null,
  favoriteFormation: '4-3-3',
  easyWins: 0,
  mediumWins: 0,
  hardWins: 0,
  totalSkipsUsed: 0,
  totalStrikesTaken: 0,
  history: [],
});

export const DEFAULT_STATS: GameStats = getInitialStats();

export const loadSettings = (): GameSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
};

export const saveSettings = (settings: GameSettings) => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    // Ignore
  }
};

export const loadStats = (): GameStats => {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return getInitialStats();
    return { ...getInitialStats(), ...JSON.parse(raw) };
  } catch (e) {
    return getInitialStats();
  }
};

export const saveGameWinStats = (
  record: GameHistoryRecord,
  skipsUsed: number,
  strikesTaken: number
): GameStats => {
  const current = loadStats();
  const updatedHistory = [record, ...current.history].slice(0, 30); // Keep last 30 games

  // Calculate favorite formation
  const formationCounts: Record<string, number> = {};
  updatedHistory.forEach(r => {
    formationCounts[r.formation] = (formationCounts[r.formation] || 0) + 1;
  });
  let topFormation = current.favoriteFormation;
  let maxCount = 0;
  Object.entries(formationCounts).forEach(([form, cnt]) => {
    if (cnt > maxCount) {
      maxCount = cnt;
      topFormation = form;
    }
  });

  const updated: GameStats = {
    ...current,
    gamesPlayed: current.gamesPlayed + 1,
    gamesWon: current.gamesWon + 1,
    bestAverageRating: Math.max(current.bestAverageRating, record.averageRating),
    fastestTimeSeconds: current.fastestTimeSeconds === null
      ? record.completedTimeSeconds
      : Math.min(current.fastestTimeSeconds, record.completedTimeSeconds),
    favoriteFormation: topFormation,
    easyWins: current.easyWins + (record.difficulty === 'easy' ? 1 : 0),
    mediumWins: current.mediumWins + (record.difficulty === 'medium' ? 1 : 0),
    hardWins: current.hardWins + (record.difficulty === 'hard' ? 1 : 0),
    totalSkipsUsed: current.totalSkipsUsed + skipsUsed,
    totalStrikesTaken: current.totalStrikesTaken + strikesTaken,
    history: updatedHistory,
  };

  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  } catch (e) {
    // Ignore
  }

  return updated;
};

export const recordGameLossStats = () => {
  const current = loadStats();
  const updated: GameStats = {
    ...current,
    gamesPlayed: current.gamesPlayed + 1,
  };
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  } catch (e) {
    // Ignore
  }
  return updated;
};

export const resetStats = (): GameStats => {
  try {
    localStorage.removeItem(STATS_KEY);
    localStorage.clear();
  } catch (e) {}
  return getInitialStats();
};
