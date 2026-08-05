import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';
import { FilledSlot, Formation, DifficultyMode } from '../types';
import { Trophy, Share2, RotateCcw, Copy, Check, Clock, Globe, Calendar, Award, Sparkles, Database, Home as HomeIcon, Zap } from 'lucide-react';
import { FootballPitch } from './FootballPitch';
import { soundFx } from '../utils/audio';
import { evaluateUserSquadRank } from '../utils/squadRanking';

interface EndGameModalProps {
  filledSlots: FilledSlot[];
  formation: Formation;
  difficulty: DifficultyMode;
  elapsedSeconds: number;
  continuePenalty?: number;
  pitchTheme?: 'classic' | 'night' | 'vintage' | 'neon';
  onPlayAgain: () => void;
  onHome?: () => void;
  onViewDatabase?: () => void;
}

export const EndGameModal: React.FC<EndGameModalProps> = ({
  filledSlots,
  formation,
  difficulty,
  elapsedSeconds,
  continuePenalty = 0,
  pitchTheme = 'classic',
  onPlayAgain,
  onHome,
  onViewDatabase,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const pitchRef = useRef<HTMLDivElement>(null);

  // Calculate dynamic squad rank & score with continue penalty if applied
  const rankInfo = evaluateUserSquadRank(filledSlots, difficulty, elapsedSeconds, formation.name, continuePenalty);

  // Trigger celebratory confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignore
    }
  }, []);

  // Calculate squad statistics
  const totalRating = filledSlots.reduce((acc, curr) => acc + curr.player.overallRating, 0);
  const avgRating = Math.round((totalRating / 11) * 10) / 10;

  const uniqueCountries = new Set(filledSlots.map((s) => s.player.country));
  const uniqueYears = new Set(filledSlots.map((s) => s.player.year));

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}m ${s}s`;
  };

  const filledMap = new Map();
  filledSlots.forEach((s) => filledMap.set(s.slotId, s.player));

  // Copy textual summary to clipboard
  const handleCopySummary = () => {
    soundFx.playClick();
    const line1 = `🏆 World Cup XI Rank #${rankInfo.rank}/${rankInfo.totalSquads} (${formation.name} - ${difficulty.toUpperCase()})`;
    const line2 = `⭐ Squad Score: ${rankInfo.scoreResult.score} (Tier ${rankInfo.tier}) | Avg Rating: ${avgRating}${
      continuePenalty > 0 ? ` | Penalty: -${continuePenalty.toFixed(1)} pts` : ''
    }`;
    const line3 = `🌍 ${uniqueCountries.size} Countries | 📅 ${uniqueYears.size} Tournaments | ⏱️ Time: ${formatTime(elapsedSeconds)}`;
    const playersList = filledSlots
      .map((s) => `${s.position}: ${s.player.name} (${s.player.country} '${String(s.player.year).slice(2)})`)
      .join('\n');

    const textToCopy = `${line1}\n${line2}\n${line3}\n\n${playersList}\n\nBuilt on FIFA World Cup Squad Builder!`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download screenshot of pitch
  const handleShareScreenshot = async () => {
    soundFx.playClick();
    if (!pitchRef.current) return;
    setIsExporting(true);

    try {
      const node = pitchRef.current;

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#070c10',
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `world-cup-rank-${rankInfo.rank}-${formation.name}-${Date.now()}.png`;
      link.click();
    } catch (e) {
      console.error('Failed to export screenshot image:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-lg p-2 sm:p-5 flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="my-auto w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#0a0f14] border-2 border-yellow-500/50 rounded-3xl p-4 sm:p-8 shadow-2xl flex flex-col gap-6 text-white"
        id="end-game-modal"
      >
        {/* Header Banner */}
        <div className="text-center flex flex-col items-center border-b border-white/10 pb-5">
          <button
            onClick={() => {
              soundFx.playClick();
              if (onHome) onHome();
              else onPlayAgain();
            }}
            className="w-20 h-20 rounded-3xl bg-gradient-to-br from-yellow-400 via-amber-400 to-yellow-600 flex items-center justify-center text-slate-950 shadow-xl shadow-yellow-500/20 mb-3 animate-bounce hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title="Return to Start / Main Menu"
          >
            <Trophy className="w-10 h-10 text-black" />
          </button>
          <h2 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tight text-white">
            World Cup XI Complete!
          </h2>
          <p className="text-slate-300 font-semibold text-sm sm:text-base mt-1">
            You drafted a tactical masterclass in {formation.name} ({difficulty.toUpperCase()} Mode)
          </p>
        </div>

        {/* Dynamic Squad Rank Banner */}
        <div className="bg-gradient-to-r from-yellow-950/80 via-amber-900/60 to-yellow-950/80 border-2 border-yellow-500/60 p-5 sm:p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex flex-col items-center justify-center text-slate-950 shadow-lg shadow-yellow-500/30 shrink-0 font-mono">
              <span className="text-[10px] font-black uppercase tracking-wider opacity-80">RANK</span>
              <span className="text-2xl sm:text-3xl font-black italic">#{rankInfo.rank}</span>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 bg-yellow-400 text-slate-950 font-black text-xs uppercase rounded-md shadow-sm">
                  TIER {rankInfo.tier}
                </span>
                <span className="text-xs font-mono font-bold text-yellow-300 bg-black/40 px-2 py-0.5 rounded-md border border-yellow-500/30">
                  {rankInfo.percentile}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Ranked #{rankInfo.rank} out of {rankInfo.totalSquads} Legendary Squads
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 flex items-center flex-wrap gap-1.5">
                <span>Squad Score:</span>
                <strong className="text-yellow-400 font-mono text-sm">{rankInfo.scoreResult.score} pts</strong>
                {continuePenalty > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[11px] font-mono font-extrabold rounded-md">
                    <Zap className="w-3 h-3 text-rose-400 fill-rose-400" />
                    -{continuePenalty.toFixed(1)} Penalty Applied
                  </span>
                )}
                <span>• Difficulty: {difficulty.toUpperCase()}</span>
              </p>
            </div>
          </div>

          {onViewDatabase && (
            <button
              onClick={() => {
                soundFx.playClick();
                onViewDatabase();
              }}
              className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 shrink-0 transition-all"
              id="view-rank-database-btn"
            >
              <Database className="w-4 h-4" />
              <span>View Squad Leaderboard</span>
            </button>
          )}
        </div>

        {/* Continue Penalty Banner */}
        {continuePenalty > 0 && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-950/80 via-rose-950/80 to-amber-950/80 border border-rose-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-left shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/20 rounded-xl border border-rose-500/40 shrink-0">
                <Zap className="w-5 h-5 text-rose-400 fill-rose-400 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black uppercase text-rose-300 tracking-wide">
                  Draft Continue Penalty Applied
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  You continued the draft using refill skips. A rating penalty of <strong className="text-rose-400 font-mono">-{continuePenalty.toFixed(1)} pts</strong> was deducted from your final squad rating.
                </div>
              </div>
            </div>
            <div className="text-lg sm:text-xl font-black text-rose-400 font-mono shrink-0 px-3.5 py-1.5 bg-black/50 rounded-xl border border-rose-500/40">
              -{continuePenalty.toFixed(1)} Pts
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-1.5 text-xs text-yellow-400 font-bold mb-1">
              <Award className="w-4 h-4" />
              <span>TACTICAL RATING</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-yellow-300 font-mono">{avgRating}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Raw OVR: {rankInfo.scoreResult.rawAverageRating}</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-bold mb-1">
              <Trophy className="w-4 h-4" />
              <span>WC WINNERS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">{rankInfo.scoreResult.worldCupWinnerCount}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">+{rankInfo.scoreResult.worldCupWinnerBonus} pts (+0.1/ea)</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-bold mb-1">
              <Calendar className="w-4 h-4" />
              <span>WORLD CUPS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{uniqueYears.size}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Editions Represented</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center gap-1.5 text-xs text-blue-400 font-bold mb-1">
              <Clock className="w-4 h-4" />
              <span>TIME TAKEN</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{formatTime(elapsedSeconds)}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Draft Complete</div>
          </div>
        </div>

        {/* Tactical Pitch View (Exportable Card) */}
        <div
          ref={pitchRef}
          className="w-full max-w-md mx-auto my-2 p-3.5 bg-[#070c10] border-2 border-yellow-500/40 rounded-3xl shadow-2xl flex flex-col gap-2 text-white overflow-hidden"
          style={{ boxSizing: 'border-box' }}
        >
          {/* Card Header for Screenshot */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
            <div>
              <div className="text-[10px] font-black uppercase text-yellow-400 tracking-wider">
                World Cup XI • {formation.name} ({difficulty.toUpperCase()})
              </div>
              <div className="text-base font-black italic tracking-tight text-white flex items-center gap-2">
                <span>Rank #{rankInfo.rank}</span>
                <span className="text-xs font-normal font-mono text-yellow-300">({rankInfo.scoreResult.score} pts)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Avg Rating</div>
              <div className="text-base font-black font-mono text-yellow-400">{avgRating}</div>
            </div>
          </div>

          <FootballPitch
            slots={formation.slots}
            filledPlayersMap={filledMap}
            difficulty={difficulty}
            isGameComplete={true}
            pitchTheme={pitchTheme}
            onSlotClick={() => {}}
          />

          {/* Card Footer for Screenshot */}
          <div className="flex items-center justify-between text-[9px] text-slate-400 font-mono pt-1 px-1 border-t border-white/10">
            <span>{uniqueCountries.size} Countries • {uniqueYears.size} Tournaments</span>
            <span className="text-yellow-400/80 font-bold">FIFA World Cup Builder</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
          {onHome && (
            <button
              onClick={() => {
                soundFx.playClick();
                onHome();
              }}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
              id="end-game-home-btn"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Main Menu</span>
            </button>
          )}

          <button
            onClick={handleShareScreenshot}
            disabled={isExporting}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-yellow-400 font-bold rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
            id="download-screenshot-btn"
          >
            <Share2 className="w-4 h-4" />
            <span>{isExporting ? 'Generating Image...' : 'Download Pitch Card'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 text-slate-200 font-bold rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all shadow-lg text-sm"
            id="copy-squad-btn"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Squad Text'}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              onPlayAgain();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-yellow-500/20 text-sm uppercase tracking-wide"
            id="play-again-btn"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </button>
        </div>
      </div>
    </div>
  );
};
