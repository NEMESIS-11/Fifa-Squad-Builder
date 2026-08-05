import React from 'react';
import { GameChallenge, DifficultyMode, Player } from '../types';
import { EasyMediumOptions } from './EasyMediumOptions';
import { HardSearch } from './HardSearch';
import { FastForward, ShieldAlert, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ChallengeCardProps {
  challenge: GameChallenge;
  difficulty: DifficultyMode;
  filledCount: number;
  skipsRemaining: number;
  strikes: number;
  onSelectPlayer: (player: Player) => void;
  onSkip: () => void;
  onSubmitSearch: (query: string) => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  difficulty,
  filledCount,
  skipsRemaining,
  strikes,
  onSelectPlayer,
  onSkip,
  onSubmitSearch,
}) => {
  return (
    <div
      className="w-full bg-[#0a0f14] border border-white/10 rounded-3xl p-5 shadow-2xl flex flex-col gap-5"
      id="challenge-card"
    >
      {/* Current Challenge Info Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-5 sm:p-6 rounded-2xl shadow-xl border border-blue-400/30">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-0.5">
              Current Draft
            </p>
            <div className="flex items-center gap-2.5">
              <span className="text-3xl sm:text-4xl drop-shadow">{challenge.flagEmoji}</span>
              <h2 className="text-2xl sm:text-3xl font-black italic uppercase text-white tracking-wide">
                {challenge.country}
              </h2>
            </div>
          </div>
          <div className="bg-white/10 px-3.5 py-1.5 rounded-xl text-xl sm:text-2xl font-black text-white border border-white/20 shadow-inner font-mono">
            {challenge.year}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-blue-400/20">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400" />
            <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
              Difficulty: {difficulty}
            </span>
          </div>

          <span className="text-xs font-mono font-bold text-blue-200">
            {filledCount} / 11 Players
          </span>
        </div>
      </div>

      {/* Progress & Skips Bar */}
      <div className="flex flex-col gap-2 bg-white/5 p-3 sm:p-3.5 rounded-xl border border-white/10">
        <div className="flex items-center justify-between text-xs font-bold text-slate-300">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 uppercase font-black tracking-wider">
              Pick #{Math.min(filledCount + 1, 11)} of 11
            </span>
          </div>

          {/* Skip Challenge Button or Refill with Penalty */}
          {difficulty === 'hard' && skipsRemaining <= 0 ? (
            <button
              onClick={() => {
                soundFx.playClick();
                onSkip();
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 rounded-xl text-xs font-extrabold uppercase tracking-widest text-amber-300 transition-all cursor-pointer animate-pulse"
              id="skip-continue-penalty-btn"
              title="Refill skips & reset strikes with rating penalty"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>Continue Draft (-Penalty)</span>
            </button>
          ) : (
            <button
              onClick={() => {
                soundFx.playClick();
                onSkip();
              }}
              disabled={skipsRemaining <= 0}
              className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl text-xs font-bold uppercase tracking-widest text-slate-200 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              id="skip-challenge-btn"
            >
              <FastForward className="w-3.5 h-3.5 text-yellow-400" />
              <span>Skip ({skipsRemaining})</span>
            </button>
          )}
        </div>

        {/* Mini 11-Slot Squad Progress Dots */}
        <div className="flex items-center gap-1 w-full pt-1 border-t border-white/5">
          {[...Array(11)].map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all ${
                i < filledCount
                  ? 'bg-yellow-400 shadow-sm shadow-yellow-400/50'
                  : i === filledCount
                  ? 'bg-emerald-400 animate-pulse'
                  : 'bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Draft Selection Content */}
      {difficulty === 'hard' ? (
        <HardSearch
          country={challenge.country}
          year={challenge.year}
          squad={challenge.squad}
          strikes={strikes}
          onSubmitSearch={onSubmitSearch}
        />
      ) : (
        challenge.options && (
          <EasyMediumOptions
            options={challenge.options}
            difficulty={difficulty}
            onSelectPlayer={onSelectPlayer}
          />
        )
      )}
    </div>
  );
};
