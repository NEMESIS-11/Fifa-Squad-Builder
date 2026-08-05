import React, { useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { Home } from './components/Home';
import { FootballPitch } from './components/FootballPitch';
import { ChallengeCard } from './components/ChallengeCard';
import { PositionSelectorModal } from './components/PositionSelectorModal';
import { PlayerCardModal } from './components/PlayerCardModal';
import { EndGameModal } from './components/EndGameModal';
import { GameOverModal } from './components/GameOverModal';
import { StatsScreen } from './components/StatsScreen';
import { SettingsModal } from './components/SettingsModal';
import { InstructionsModal } from './components/InstructionsModal';
import { SquadDatabaseModal } from './components/SquadDatabaseModal';
import { PitchPositionSlot, Player } from './types';
import { Trophy, Home as HomeIcon, BarChart3, Settings, HelpCircle, Clock, Shield, Database } from 'lucide-react';
import { soundFx } from './utils/audio';

const GameContainer: React.FC = () => {
  const {
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
  } = useGame();

  const [showStats, setShowStats] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [mobileTab, setMobileTab] = useState<'draft' | 'pitch'>('draft');

  // Map slotId -> Player
  const filledMap = new Map<string, Player>();
  filledSlots.forEach((s) => filledMap.set(s.slotId, s.player));

  const handleSlotClick = (slot: PitchPositionSlot, player: Player | null) => {
    if (player) {
      setSelectedPitchPlayer(player);
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-[100dvh] w-full bg-[#05080a] text-slate-100 flex flex-col font-sans selection:bg-yellow-500 selection:text-slate-950 pb-[env(safe-area-inset-bottom,16px)]">
      {/* Toast Banner Overlay */}
      {messageBanner && (
        <div
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs sm:text-sm border transition-all animate-bounce flex items-center gap-2 ${
            messageBanner.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-400 text-emerald-100'
              : messageBanner.type === 'error'
              ? 'bg-red-950/95 border-red-500 text-red-100'
              : 'bg-[#0a0f14] border-white/20 text-slate-200'
          }`}
          id="toast-message-banner"
        >
          {messageBanner.text}
        </div>
      )}

      {/* Top Header Bar when in-game */}
      {status === 'playing' && (
        <header className="sticky top-0 z-30 w-full bg-[#0a0f14]/95 backdrop-blur-md border-b border-white/10 px-3 sm:px-8 py-2.5 sm:py-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => {
                soundFx.playClick();
                if (filledSlots.length === 0 || confirm('Return to start screen? Current draft progress will be lost.')) {
                  goToHome();
                }
              }}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 hover:scale-105 active:scale-95 transition-transform shrink-0 cursor-pointer"
              title="Return to Start Menu"
              id="header-home-btn"
            >
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick();
                if (filledSlots.length === 0 || confirm('Return to start screen? Current draft progress will be lost.')) {
                  goToHome();
                }
              }}
              className="min-w-0 text-left hover:opacity-85 transition-opacity cursor-pointer group"
              title="Return to Start Menu"
            >
              <h1 className="text-sm sm:text-xl font-black tracking-tight uppercase italic text-white truncate group-hover:text-yellow-400 transition-colors">
                Squad Builder
              </h1>
              <p className="text-[9px] sm:text-xs text-yellow-500 uppercase tracking-widest font-bold font-mono truncate">
                {formation.name}
              </p>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Squad Completion Progress Indicator */}
            <div className="hidden sm:flex flex-col items-center">
              <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">
                Completion ({filledSlots.length}/11)
              </div>
              <div className="flex gap-1" id="squad-completion-pills">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 sm:w-3.5 h-1.5 rounded-full transition-all ${
                      i < filledSlots.length
                        ? 'bg-yellow-500 shadow-sm shadow-yellow-500/50'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Timer Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded-xl border border-white/10 text-xs font-mono font-bold text-yellow-400">
              <Clock className="w-3.5 h-3.5 text-yellow-500" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setShowStats(true);
                }}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-yellow-400 transition-all active:scale-95"
                title="Career Statistics"
              >
                <BarChart3 className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setShowSettings(true);
                }}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 transition-all active:scale-95"
                title="Settings"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main View Router */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-6 flex flex-col items-center justify-start sm:justify-center">
        {status === 'idle' && (
          <Home
            difficulty={difficulty}
            formationId={formation.id}
            onSelectDifficulty={setDifficulty}
            onSelectFormation={setFormationId}
            onStartGame={() => startNewGame()}
            onOpenStats={() => setShowStats(true)}
            onOpenDatabase={() => setShowDatabase(true)}
            onOpenSettings={() => setShowSettings(true)}
            onOpenInstructions={() => setShowInstructions(true)}
          />
        )}

        {status === 'playing' && currentChallenge && (
          <div className="w-full flex flex-col items-center">
            {/* Mobile Tab Switcher (< lg) */}
            <div className="w-full max-w-md mx-auto mb-4 p-1.5 bg-[#0a0f14] border border-white/10 rounded-2xl flex items-center gap-2 lg:hidden shadow-xl" id="mobile-tab-bar">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileTab('draft');
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  mobileTab === 'draft'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-yellow-500/20'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
                id="mobile-tab-draft-btn"
              >
                <span>📋 Pick Player</span>
                <span className="text-[10px] bg-slate-950/30 px-1.5 py-0.5 rounded font-mono font-bold">
                  {currentChallenge.countryCode} '{String(currentChallenge.year).slice(2)}
                </span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick();
                  setMobileTab('pitch');
                }}
                className={`flex-1 py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                  mobileTab === 'pitch'
                    ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-md shadow-yellow-500/20'
                    : 'text-slate-400 hover:text-white bg-white/5'
                }`}
                id="mobile-tab-pitch-btn"
              >
                <span>⚽ Pitch View</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">
                  {filledSlots.length}/11
                </span>
              </button>
            </div>

            {/* Main Playing Layout: Dual column on Desktop, Tabbed/Toggle on Mobile */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Pitch View Column */}
              <div
                className={`lg:col-span-6 xl:col-span-7 w-full flex-col items-center justify-center ${
                  mobileTab === 'pitch' ? 'flex' : 'hidden lg:flex'
                }`}
              >
                <FootballPitch
                  slots={formation.slots}
                  filledPlayersMap={filledMap}
                  difficulty={difficulty}
                  isGameComplete={false}
                  pitchTheme={settings.pitchTheme}
                  onSlotClick={handleSlotClick}
                />

                {/* Mobile Floating Return to Draft Button */}
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setMobileTab('draft');
                  }}
                  className="mt-4 lg:hidden px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full shadow-2xl flex items-center gap-2 border border-yellow-300/40 animate-pulse"
                >
                  <span>📋 Return To Active Draft Pick</span>
                </button>
              </div>

              {/* Challenge & Draft Control Column */}
              <div
                className={`lg:col-span-6 xl:col-span-5 w-full flex-col gap-4 ${
                  mobileTab === 'draft' ? 'flex' : 'hidden lg:flex'
                }`}
              >
                <ChallengeCard
                  challenge={currentChallenge}
                  difficulty={difficulty}
                  filledCount={filledSlots.length}
                  skipsRemaining={skipsRemaining}
                  strikes={strikes}
                  onSelectPlayer={selectPlayerOption}
                  onSkip={skipChallenge}
                  onSubmitSearch={submitHardSearch}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {pendingPositionPlayer && (
        <PositionSelectorModal
          player={pendingPositionPlayer.player}
          validSlots={pendingPositionPlayer.validSlots}
          onConfirm={confirmPositionAssignment}
          onCancel={cancelPositionAssignment}
        />
      )}

      {selectedPitchPlayer && (
        <PlayerCardModal
          player={selectedPitchPlayer}
          onClose={() => setSelectedPitchPlayer(null)}
        />
      )}

      {status === 'completed' && (
        <EndGameModal
          filledSlots={filledSlots}
          formation={formation}
          difficulty={difficulty}
          elapsedSeconds={elapsedSeconds}
          continuePenalty={continuePenalty}
          pitchTheme={settings.pitchTheme}
          onPlayAgain={restartGame}
          onHome={goToHome}
          onViewDatabase={() => setShowDatabase(true)}
        />
      )}

      {status === 'gameover' && (
        <GameOverModal
          strikes={strikes}
          filledCount={filledSlots.length}
          difficulty={difficulty}
          onRetry={restartGame}
          onHome={goToHome}
          onContinue={continueWithPenalty}
        />
      )}

      {showDatabase && (
        <SquadDatabaseModal onClose={() => setShowDatabase(false)} />
      )}

      {showStats && (
        <StatsScreen
          stats={stats}
          onClose={() => setShowStats(false)}
          onResetStats={resetAllStats}
          onViewDatabase={() => setShowDatabase(true)}
        />
      )}

      {showSettings && (
        <SettingsModal
          settings={settings}
          onUpdateSettings={updateSettings}
          onClose={() => setShowSettings(false)}
        />
      )}

      {showInstructions && (
        <InstructionsModal onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
