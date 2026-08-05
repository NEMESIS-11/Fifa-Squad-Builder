import React from 'react';
import { RotateCcw, AlertTriangle, Home as HomeIcon, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';
import { DifficultyMode } from '../types';
import { calculateContinuePenaltyInfo } from '../utils/squadRanking';

interface GameOverModalProps {
  strikes: number;
  filledCount: number;
  difficulty?: DifficultyMode;
  onRetry: () => void;
  onHome?: () => void;
  onContinue?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  strikes,
  filledCount,
  difficulty,
  onRetry,
  onHome,
  onContinue,
}) => {
  const penaltyInfo = calculateContinuePenaltyInfo(filledCount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-black/85 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="my-auto w-full max-w-md max-h-[90dvh] overflow-y-auto bg-slate-900 border-2 border-red-500/60 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 text-center text-white"
        id="game-over-modal"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-red-950/80 border border-red-500 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/20">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-red-500">
            5 Strikes! Game Over
          </h3>
          <p className="text-sm text-slate-300 font-semibold mt-2">
            You accumulated 5 strikes in Hard Mode before completing your World Cup XI.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex justify-around">
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Players Drafted</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">{filledCount} / 11</div>
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase">Strikes Incurred</div>
            <div className="text-2xl font-black text-red-400 font-mono mt-1">{strikes} / 5</div>
          </div>
        </div>

        {/* Hard Mode Continue Option */}
        {difficulty === 'hard' && onContinue && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/70 via-slate-900 to-amber-900/50 border-2 border-amber-500/50 text-left flex flex-col gap-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm">
                <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
                <span>Continue Draft (Hard Mode Option)</span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-mono font-bold border border-amber-500/30">
                Penalty Applied
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Continue your draft with additional skips and strikes reset. A penalty is deducted from your final squad rating based on current progress.
            </p>

            <div className="grid grid-cols-2 gap-2 text-center my-1 font-mono">
              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Rating Penalty</div>
                <div className="text-base font-black text-rose-400">-{penaltyInfo.penaltyPoints.toFixed(1)} Pts</div>
                <div className="text-[9px] text-slate-500 font-sans mt-0.5">{filledCount} players added</div>
              </div>

              <div className="p-2.5 bg-slate-950/80 rounded-xl border border-white/10">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Refill Bonus</div>
                <div className="text-base font-black text-emerald-400">+{penaltyInfo.additionalSkips} Skips & 0 Strikes</div>
                <div className="text-[9px] text-slate-500 font-sans mt-0.5">{penaltyInfo.emptySlots} empty slots</div>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onContinue();
              }}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              id="game-over-continue-btn"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Continue Draft (-{penaltyInfo.penaltyPoints.toFixed(1)} Pts Penalty)</span>
            </button>
          </div>
        )}

        <div className="flex gap-2">
          {onHome && (
            <button
              onClick={() => {
                soundFx.playClick();
                onHome();
              }}
              className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg flex items-center justify-center gap-2 border border-white/10"
              id="game-over-home-btn"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Main Menu</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick();
              onRetry();
            }}
            className="flex-1 py-3.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
            id="try-again-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
