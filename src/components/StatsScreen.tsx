import React from 'react';
import { GameStats } from '../types';
import { X, Trophy, Award, Clock, Flame, Shield, Trash2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface StatsScreenProps {
  stats: GameStats;
  onClose: () => void;
  onResetStats: () => void;
  onViewDatabase?: () => void;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ stats, onClose, onResetStats, onViewDatabase }) => {
  const [confirmReset, setConfirmReset] = React.useState(false);
  const winRate = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0;

  const formatTime = (secs: number | null) => {
    if (secs === null) return '--';
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="relative my-auto w-full max-w-2xl max-h-[92dvh] overflow-y-auto bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 text-white"
        id="stats-screen-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Career Statistics</h2>
            <p className="text-xs text-slate-400 font-semibold">Saved locally on your device</p>
          </div>
        </div>

        {/* Top Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-bold uppercase">Games Played</div>
            <div className="text-2xl font-black text-white font-mono mt-1">{stats.gamesPlayed}</div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-bold uppercase">Win Rate</div>
            <div className="text-2xl font-black text-emerald-400 font-mono mt-1">{winRate}%</div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-bold uppercase">Best Avg Rating</div>
            <div className="text-2xl font-black text-amber-400 font-mono mt-1">{stats.bestAverageRating || '--'}</div>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800">
            <div className="text-xs text-slate-400 font-bold uppercase">Fastest Win</div>
            <div className="text-2xl font-black text-teal-400 font-mono mt-1">{formatTime(stats.fastestTimeSeconds)}</div>
          </div>
        </div>

        {/* Difficulty Breakdown */}
        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col gap-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
            Victories By Difficulty
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
            <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
              <span className="block text-[10px] opacity-80 uppercase">Easy</span>
              <span className="text-lg font-black font-mono">{stats.easyWins}</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-950/60 border border-amber-500/30 text-amber-300">
              <span className="block text-[10px] opacity-80 uppercase">Medium</span>
              <span className="text-lg font-black font-mono">{stats.mediumWins}</span>
            </div>
            <div className="p-2 rounded-xl bg-red-950/60 border border-red-500/30 text-red-300">
              <span className="block text-[10px] opacity-80 uppercase">Hard</span>
              <span className="text-lg font-black font-mono">{stats.hardWins}</span>
            </div>
          </div>
        </div>

        {/* Favorite Formation & Skips */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">Favorite Formation:</span>
            <span className="text-base font-black text-amber-300 font-mono">{stats.favoriteFormation}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold">Skips Used:</span>
            <span className="text-base font-black text-emerald-400 font-mono">{stats.totalSkipsUsed}</span>
          </div>
        </div>

        {/* Recent Match History */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">
              Recent Completed Squads
            </h3>
            {onViewDatabase && (
              <button
                onClick={() => {
                  soundFx.playClick();
                  onClose();
                  onViewDatabase();
                }}
                className="text-xs text-yellow-400 font-bold hover:underline"
              >
                View Full Leaderboard →
              </button>
            )}
          </div>

          {stats.history.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800 text-center text-xs text-slate-500">
              No completed squad games yet. Draft your first XI!
            </div>
          ) : (
            <div className="max-h-48 overflow-y-auto flex flex-col gap-2 pr-1">
              {stats.history.map((record) => (
                <div
                  key={record.id}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span>{record.formation} ({record.difficulty.toUpperCase()})</span>
                      {record.squadScore && (
                        <span className="px-1.5 py-0.5 bg-yellow-500/20 text-yellow-400 font-mono font-bold rounded text-[10px]">
                          Score: {record.squadScore}
                        </span>
                      )}
                    </span>
                    <span className="text-[10px] text-slate-400">{record.date} • {record.uniqueCountriesCount} Nations</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-amber-400 font-black">★ {record.averageRating}</span>
                    <span className="text-teal-400">{formatTime(record.completedTimeSeconds)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reset Button / Confirmation */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          {confirmReset ? (
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 bg-red-950/60 border border-red-500/40 p-3 rounded-xl animate-fadeIn">
              <span className="text-xs font-bold text-red-200">
                Are you sure you want to delete all career statistics & match history?
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    soundFx.playClick();
                    onResetStats();
                    setConfirmReset(false);
                  }}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-black rounded-lg shadow-md transition-colors"
                  id="confirm-reset-stats-btn"
                >
                  Yes, Reset All
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setConfirmReset(false);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="text-[11px] text-slate-500 font-semibold">
                Local Storage Career Data
              </span>
              <button
                onClick={() => {
                  soundFx.playClick();
                  setConfirmReset(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-red-400 hover:text-red-300 text-xs font-bold rounded-lg hover:bg-red-950/50 transition-colors"
                id="reset-stats-btn"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Reset Statistics</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
