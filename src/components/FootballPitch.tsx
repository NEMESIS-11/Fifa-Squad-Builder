import React from 'react';
import { PitchPositionSlot, Player, DifficultyMode } from '../types';
import { PositionSlot } from './PositionSlot';

interface FootballPitchProps {
  slots: PitchPositionSlot[];
  filledPlayersMap: Map<string, Player>;
  difficulty: DifficultyMode;
  isGameComplete: boolean;
  pitchTheme?: 'classic' | 'night' | 'vintage' | 'neon';
  onSlotClick: (slot: PitchPositionSlot, player: Player | null) => void;
}

export const FootballPitch: React.FC<FootballPitchProps> = ({
  slots,
  filledPlayersMap,
  difficulty,
  isGameComplete,
  pitchTheme = 'classic',
  onSlotClick,
}) => {
  // Theme styling configurations
  const themeStyles = {
    classic: {
      bg: 'bg-[#122b1c]',
      border: 'border-[#1a3d28]',
      line: 'border-white/30',
      circle: 'border-white/30',
      stripe: 'bg-[#163522]/40',
    },
    night: {
      bg: 'bg-gradient-to-b from-[#09150e] via-[#0f2418] to-[#09150e]',
      border: 'border-[#143221]',
      line: 'border-cyan-400/40',
      circle: 'border-cyan-400/40',
      stripe: 'bg-[#132e1f]/30',
    },
    vintage: {
      bg: 'bg-gradient-to-b from-[#142617] via-[#1b331f] to-[#142617]',
      border: 'border-[#26452c]',
      line: 'border-amber-200/35',
      circle: 'border-amber-200/35',
      stripe: 'bg-amber-900/10',
    },
    neon: {
      bg: 'bg-[#0a1810]',
      border: 'border-lime-500/40',
      line: 'border-lime-400/60 shadow-[0_0_10px_rgba(163,230,53,0.3)]',
      circle: 'border-lime-400/60',
      stripe: 'bg-lime-900/20',
    },
  }[pitchTheme];

  return (
    <div
      className={`relative w-full aspect-[3/4] max-w-lg mx-auto rounded-3xl p-2.5 sm:p-4 border-4 ${themeStyles.border} shadow-2xl ${themeStyles.bg}`}
      id="football-pitch-container"
    >
      {/* Grass Stripe Patterns */}
      <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40 rounded-2xl overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`w-full h-1/8 ${i % 2 === 0 ? themeStyles.stripe : 'bg-transparent'}`}
          />
        ))}
      </div>

      {/* Field Outer Boundary Line & Markings */}
      <div className={`relative w-full h-full border-2 ${themeStyles.line} rounded-2xl flex flex-col justify-between overflow-hidden pointer-events-none`}>
        {/* Top Penalty Area (Opponent Goal) */}
        <div className="relative w-full h-[20%] flex justify-center">
          <div className={`w-[50%] h-full border-b-2 border-x-2 ${themeStyles.line} rounded-b-lg absolute top-0 flex items-end justify-center`}>
            {/* Goal Box */}
            <div className={`w-[50%] h-[35%] border-b-2 border-x-2 ${themeStyles.line} absolute top-0`} />
            {/* Penalty Spot */}
            <div className={`w-2 h-2 rounded-full ${themeStyles.line} bg-emerald-200/80 mb-3`} />
          </div>
        </div>

        {/* Center Line & Center Circle */}
        <div className={`absolute top-1/2 left-0 right-0 h-0.5 ${themeStyles.line} border-t-2 border-dashed flex items-center justify-center -translate-y-1/2`}>
          <div className={`w-28 h-28 rounded-full border-2 ${themeStyles.circle} absolute flex items-center justify-center`}>
            <div className="w-2 h-2 rounded-full bg-emerald-200/80" />
          </div>
        </div>

        {/* Bottom Penalty Area (Home Goal) */}
        <div className="relative w-full h-[20%] flex justify-center">
          <div className={`w-[50%] h-full border-t-2 border-x-2 ${themeStyles.line} rounded-t-lg absolute bottom-0 flex items-start justify-center`}>
            {/* Goal Box */}
            <div className={`w-[50%] h-[35%] border-t-2 border-x-2 ${themeStyles.line} absolute bottom-0`} />
            {/* Penalty Spot */}
            <div className={`w-2 h-2 rounded-full ${themeStyles.line} bg-emerald-200/80 mt-3`} />
          </div>
        </div>
      </div>

      {/* Render Position Slots Overlay */}
      <div className="absolute inset-0 p-2.5 sm:p-4 pointer-events-none">
        <div className="relative w-full h-full">
          {slots.map((slot) => {
            const filledPlayer = filledPlayersMap.get(slot.id) || null;
            return (
              <PositionSlot
                key={slot.id}
                slot={slot}
                filledPlayer={filledPlayer}
                difficulty={difficulty}
                isGameComplete={isGameComplete}
                onSlotClick={onSlotClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
