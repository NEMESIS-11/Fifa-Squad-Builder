import React from 'react';
import { Player, DifficultyMode } from '../types';
import { soundFx } from '../utils/audio';

interface EasyMediumOptionsProps {
  options: Player[];
  difficulty: DifficultyMode;
  onSelectPlayer: (player: Player) => void;
}

export const EasyMediumOptions: React.FC<EasyMediumOptionsProps> = ({
  options,
  difficulty,
  onSelectPlayer,
}) => {
  const showRating = difficulty === 'easy';

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 my-1" id="draft-options-grid">
      {options.map((player) => (
        <button
          key={player.id}
          onClick={() => {
            soundFx.playClick();
            onSelectPlayer(player);
          }}
          className="group relative flex items-center justify-between p-4 sm:p-3.5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-yellow-500/50 active:scale-[0.98] active:bg-yellow-500/15 transition-all text-left focus:outline-none min-h-[56px]"
          id={`player-option-${player.id}`}
        >
          {/* Left: Position & Flag */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 bg-white/10 rounded-xl flex flex-col items-center justify-center border border-white/10 shrink-0">
              <span className="text-xs font-black text-yellow-400 uppercase">
                {player.primaryPosition}
              </span>
              <span className="text-[9px] text-slate-400 font-mono">{player.year}</span>
            </div>

            <div className="min-w-0">
              <div className="text-sm font-bold text-white group-hover:text-yellow-400 transition-colors truncate">
                {player.name}
              </div>
              <div className="text-xs text-slate-400 flex items-center gap-1.5 truncate">
                <span>{player.countryCode}</span>
                {player.club && <span>• {player.club}</span>}
              </div>
            </div>
          </div>

          {/* Right: Rating */}
          {showRating && (
            <div className="text-right shrink-0 pl-2">
              <div className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">OVR</div>
              <div className="text-xl font-black italic text-yellow-400 group-hover:scale-110 transition-transform font-mono">
                {player.overallRating}
              </div>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
