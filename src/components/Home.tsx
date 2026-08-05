import React from 'react';
import { DifficultyMode } from '../types';
import { FormationSelector } from './FormationSelector';
import { DifficultySelector } from './DifficultySelector';
import { Trophy, Play, BarChart3, Settings, HelpCircle, Database, Globe } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HomeProps {
  difficulty: DifficultyMode;
  formationId: string;
  onSelectDifficulty: (diff: DifficultyMode) => void;
  onSelectFormation: (formId: string) => void;
  onStartGame: () => void;
  onOpenStats: () => void;
  onOpenDatabase: () => void;
  onOpenSettings: () => void;
  onOpenInstructions: () => void;
}

export const Home: React.FC<HomeProps> = ({
  difficulty,
  formationId,
  onSelectDifficulty,
  onSelectFormation,
  onStartGame,
  onOpenStats,
  onOpenDatabase,
  onOpenSettings,
  onOpenInstructions,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4 sm:gap-6 p-2 sm:p-6 text-white" id="home-screen">
      {/* Title Header */}
      <div className="text-center flex flex-col items-center gap-4">
        <div className="relative group">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 flex items-center justify-center text-slate-950 shadow-2xl shadow-yellow-500/20 transform group-hover:scale-105 transition-transform duration-300">
            <Trophy className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md text-black" />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#0a0f14] text-yellow-400 text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full border border-yellow-500/40 shadow-md whitespace-nowrap">
            1970 – 2022
          </div>
        </div>

        <div className="mt-2">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase italic text-white">
            FIFA World Cup
          </h1>
          <h2 className="text-xl sm:text-3xl font-extrabold text-yellow-400 uppercase tracking-wider mt-0.5">
            Squad Builder
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-medium max-w-md mx-auto mt-2">
            Draft historical World Cup squads to construct your ultimate tactical XI across 14 iconic tournaments.
          </p>
        </div>
      </div>

      {/* Main Game Setup Card */}
      <div className="bg-[#0a0f14] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col gap-6">
        <FormationSelector
          selectedFormationId={formationId}
          onSelectFormation={onSelectFormation}
        />

        <DifficultySelector
          selectedDifficulty={difficulty}
          onSelectDifficulty={onSelectDifficulty}
        />

        {/* Start Game CTA */}
        <button
          onClick={() => {
            soundFx.playWhistle();
            onStartGame();
          }}
          className="w-full py-4 sm:py-5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-yellow-500/20 transition-all transform active:scale-98 flex items-center justify-center gap-3 border border-yellow-300/40 uppercase tracking-wide"
          id="start-game-btn"
        >
          <Play className="w-6 h-6 fill-slate-950" />
          <span>START DRAFT</span>
        </button>
      </div>

      {/* Squad Database Leaderboard Banner */}
      <button
        onClick={() => {
          soundFx.playClick();
          onOpenDatabase();
        }}
        className="w-full p-4 rounded-2xl bg-gradient-to-r from-yellow-950/60 via-[#0a0f14] to-yellow-950/60 border border-yellow-500/40 hover:border-yellow-400 flex items-center justify-between gap-3 text-left transition-all group"
        id="home-open-database-btn"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 group-hover:scale-105 transition-transform">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase text-yellow-400 tracking-wider">
              All-Time Squad Database & Leaderboard
            </div>
            <div className="text-xs text-slate-300 font-medium">
              View ranked best possible squads (#1 Samba Immortals to #N)
            </div>
          </div>
        </div>

        <div className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 text-xs font-mono font-bold rounded-lg border border-yellow-500/30 group-hover:bg-yellow-500 group-hover:text-slate-950 transition-colors shrink-0">
          Rank 1-N →
        </div>
      </button>

      {/* Secondary Action Toolbar */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => {
            soundFx.playClick();
            onOpenStats();
          }}
          className="p-3.5 rounded-2xl bg-[#0a0f14] border border-white/10 hover:bg-white/5 flex flex-col items-center justify-center gap-1.5 transition-all text-slate-300 hover:text-white"
          id="home-stats-btn"
        >
          <BarChart3 className="w-5 h-5 text-yellow-400" />
          <span className="text-xs font-bold">Statistics</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onOpenInstructions();
          }}
          className="p-3.5 rounded-2xl bg-[#0a0f14] border border-white/10 hover:bg-white/5 flex flex-col items-center justify-center gap-1.5 transition-all text-slate-300 hover:text-white"
          id="home-rules-btn"
        >
          <HelpCircle className="w-5 h-5 text-blue-400" />
          <span className="text-xs font-bold">How To Play</span>
        </button>

        <button
          onClick={() => {
            soundFx.playClick();
            onOpenSettings();
          }}
          className="p-3.5 rounded-2xl bg-[#0a0f14] border border-white/10 hover:bg-white/5 flex flex-col items-center justify-center gap-1.5 transition-all text-slate-300 hover:text-white"
          id="home-settings-btn"
        >
          <Settings className="w-5 h-5 text-slate-400" />
          <span className="text-xs font-bold">Settings</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] text-slate-500 font-mono flex items-center justify-center gap-2">
        <Globe className="w-3.5 h-3.5 text-yellow-500/60" />
        <span>1970 • 1974 • 1978 • 1982 • 1986 • 1990 • 1994 • 1998 • 2002 • 2006 • 2010 • 2014 • 2018 • 2022</span>
      </div>
    </div>
  );
};
