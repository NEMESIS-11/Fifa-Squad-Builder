import React from 'react';
import { PitchPositionSlot, Player, DifficultyMode, PositionCode } from '../types';
import { soundFx } from '../utils/audio';
import { getPositionSuitabilityPenalty } from '../utils/squadRanking';

interface PositionSlotProps {
  slot: PitchPositionSlot;
  filledPlayer: Player | null;
  difficulty: DifficultyMode;
  isGameComplete: boolean;
  onSlotClick: (slot: PitchPositionSlot, player: Player | null) => void;
}

export const PositionSlot: React.FC<PositionSlotProps> = ({
  slot,
  filledPlayer,
  difficulty,
  isGameComplete,
  onSlotClick,
}) => {
  const handleClick = () => {
    soundFx.playClick();
    onSlotClick(slot, filledPlayer);
  };

  const showRating = difficulty === 'easy' || isGameComplete;

  const penalty = filledPlayer
    ? getPositionSuitabilityPenalty(
        filledPlayer.primaryPosition,
        filledPlayer.secondaryPositions || [],
        slot.position as PositionCode,
        filledPlayer.isGoalkeeper
      )
    : 0;

  const effectiveRating = filledPlayer
    ? Math.max(40, filledPlayer.overallRating - penalty)
    : 0;

  // Helper for jersey name formatting (e.g. Maradona, Beckenbauer, Van Dijk)
  const getJerseyName = (fullName: string) => {
    if (!fullName) return '';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      const lastPart = parts[parts.length - 1];
      const secondLast = parts[parts.length - 2];
      if (['van', 'de', 'der', 'di', 'da', 'dos', 'del', 'san', 'st.', 'von'].includes(secondLast.toLowerCase())) {
        return `${secondLast} ${lastPart}`;
      }
      return lastPart;
    }
    return fullName;
  };

  const jerseyName = filledPlayer ? getJerseyName(filledPlayer.name) : '';
  const jerseyNameLen = jerseyName.length;

  let jerseyFontSize = 'text-[9px] sm:text-[11px]';
  if (jerseyNameLen > 12) {
    jerseyFontSize = 'text-[7px] sm:text-[8px] tracking-tighter';
  } else if (jerseyNameLen > 9) {
    jerseyFontSize = 'text-[7.5px] sm:text-[9.5px] tracking-tighter';
  }

  return (
    <div
      onClick={handleClick}
      style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10 focus:outline-none pointer-events-auto"
      id={`position-slot-${slot.id}`}
    >
      {filledPlayer ? (
        /* Filled Player Card on Pitch */
        <div className="group relative flex flex-col items-center">
          <div className="w-[3.85rem] h-[4.5rem] sm:w-[5.25rem] sm:h-[5.75rem] bg-[#0a0f14]/95 border-2 border-yellow-500/80 rounded-xl p-0.5 sm:p-1 shadow-lg shadow-yellow-500/10 backdrop-blur-md flex flex-col justify-between items-center text-center overflow-hidden transition-all hover:scale-110 active:scale-95 hover:border-yellow-400 hover:shadow-yellow-500/30">
            {/* Top Row: Year & Flag */}
            <div className="w-full flex items-center justify-between text-[8px] sm:text-xs font-bold text-yellow-400 px-0.5">
              <span>{filledPlayer.countryCode}</span>
              <span className="text-[8px] sm:text-[9px] text-slate-300 font-mono">'{String(filledPlayer.year).slice(2)}</span>
            </div>

            {/* Position Code & Rating Badge */}
            <div className="flex items-center justify-center gap-0.5 my-0.5 w-full px-0.5">
              <span className="px-1 py-0.5 bg-yellow-500/20 rounded text-[8px] sm:text-[10px] font-black text-yellow-400 uppercase leading-none">
                {slot.position}
              </span>
              {showRating && (
                <div className="flex items-center gap-0.5">
                  <span
                    className={`text-[9.5px] sm:text-xs font-black font-mono italic leading-none ${
                      penalty > 0 ? 'text-amber-300' : 'text-yellow-400'
                    }`}
                  >
                    {effectiveRating}
                  </span>
                  {penalty > 0 && (
                    <span className="text-[7px] sm:text-[8.5px] text-red-400 font-bold font-mono leading-none" title={`-${penalty} out of position penalty`}>
                      -{penalty}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Player Name */}
            <div
              className={`w-full bg-black/90 py-0.5 px-0.5 rounded text-white font-black uppercase text-center overflow-hidden whitespace-nowrap leading-tight ${jerseyFontSize}`}
              title={filledPlayer.name}
            >
              {jerseyName}
            </div>
          </div>
        </div>
      ) : (
        /* Unfilled Slot Badge */
        <div className="flex flex-col items-center group">
          <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-full border-2 border-dashed border-white/40 bg-white/10 backdrop-blur-sm flex items-center justify-center shadow-md transition-all group-hover:border-yellow-500/80 group-hover:bg-yellow-500/20 group-hover:scale-110 group-active:scale-95">
            <span className="text-[11px] sm:text-sm font-black text-white group-hover:text-yellow-400 font-mono tracking-wider">
              {slot.position}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
