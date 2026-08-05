import React from 'react';
import { Player, PitchPositionSlot } from '../types';
import { Shield, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PositionSelectorModalProps {
  player: Player;
  validSlots: PitchPositionSlot[];
  onConfirm: (slotId: string) => void;
  onCancel: () => void;
}

export const PositionSelectorModal: React.FC<PositionSelectorModalProps> = ({
  player,
  validSlots,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-black/85 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="my-auto w-full max-w-md max-h-[90dvh] overflow-y-auto bg-slate-900 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 text-center"
        id="position-selector-modal"
      >
        {/* Header Icon */}
        <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow-lg">
          <Shield className="w-8 h-8" />
        </div>

        {/* Player Info */}
        <div>
          <h3 className="text-2xl font-black text-white">{player.name}</h3>
          <p className="text-sm text-emerald-400 font-semibold mt-1">
            {player.country} ({player.year}) • {player.primaryPosition}
          </p>
          <p className="text-xs text-slate-300 mt-2">
            This versatile star fits multiple open positions in your squad! Choose where to lock them in:
          </p>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-2.5 my-2">
          {validSlots.map((slot) => (
            <button
              key={slot.id}
              onClick={() => {
                soundFx.playClick();
                onConfirm(slot.id);
              }}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/90 border border-emerald-500/40 hover:border-amber-400 hover:bg-emerald-950 transition-all font-bold text-white group shadow-md"
              id={`choose-position-${slot.id}`}
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 bg-emerald-800 rounded-lg text-amber-300 font-black font-mono">
                  {slot.position}
                </span>
                <span className="text-sm text-slate-200 group-hover:text-amber-200">
                  Assign as {slot.label}
                </span>
              </div>
              <Check className="w-5 h-5 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        {/* Cancel Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onCancel();
          }}
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-2xl text-sm transition-colors border border-slate-700"
        >
          Cancel Selection
        </button>
      </div>
    </div>
  );
};
