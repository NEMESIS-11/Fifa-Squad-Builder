import React from 'react';
import { FORMATIONS } from '../data/formations';
import { Formation } from '../types';
import { Shield, ChevronRight } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface FormationSelectorProps {
  selectedFormationId: string;
  onSelectFormation: (formationId: string) => void;
}

export const FormationSelector: React.FC<FormationSelectorProps> = ({
  selectedFormationId,
  onSelectFormation,
}) => {
  return (
    <div className="w-full flex flex-col gap-2.5" id="formation-selector">
      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
        <Shield className="w-4 h-4 text-emerald-400" />
        <span>Tactical Formation</span>
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5">
        {FORMATIONS.map((f) => {
          const isSelected = f.id === selectedFormationId;
          return (
            <button
              key={f.id}
              onClick={() => {
                soundFx.playClick();
                onSelectFormation(f.id);
              }}
              className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-950 to-emerald-900 border-amber-400 text-white shadow-lg shadow-amber-500/10 ring-2 ring-amber-400/30'
                  : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-800'
              }`}
              id={`formation-option-${f.id}`}
            >
              <div>
                <div className="text-sm sm:text-base font-black font-mono tracking-wider">
                  {f.name}
                </div>
                <div className="text-[10px] text-slate-400 font-semibold truncate">
                  {f.category}
                </div>
              </div>

              <div className="text-[9px] text-emerald-400/80 font-mono mt-1 pt-1 border-t border-slate-800/80 truncate">
                {f.slots.length} Positions
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
