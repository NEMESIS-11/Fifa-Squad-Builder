import React from 'react';
import { DifficultyMode } from '../types';
import { Sparkles, EyeOff, Search } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface DifficultySelectorProps {
  selectedDifficulty: DifficultyMode;
  onSelectDifficulty: (diff: DifficultyMode) => void;
}

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelectDifficulty,
}) => {
  const difficulties: {
    id: DifficultyMode;
    label: string;
    desc: string;
    icon: React.ReactNode;
    color: string;
  }[] = [
    {
      id: 'easy',
      label: 'Easy Mode',
      desc: '4 Options • Ratings Displayed',
      icon: <Sparkles className="w-4 h-4 text-emerald-400" />,
      color: 'border-emerald-500 text-emerald-300',
    },
    {
      id: 'medium',
      label: 'Medium Mode',
      desc: '4 Options • Hidden Ratings',
      icon: <EyeOff className="w-4 h-4 text-amber-400" />,
      color: 'border-amber-500 text-amber-300',
    },
    {
      id: 'hard',
      label: 'Hard Mode',
      desc: 'Name Search • 5 Strikes Max',
      icon: <Search className="w-4 h-4 text-red-400" />,
      color: 'border-red-500 text-red-300',
    },
  ];

  return (
    <div className="w-full flex flex-col gap-2.5" id="difficulty-selector">
      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
        Difficulty Level
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {difficulties.map((d) => {
          const isSelected = selectedDifficulty === d.id;
          return (
            <button
              key={d.id}
              onClick={() => {
                soundFx.playClick();
                onSelectDifficulty(d.id);
              }}
              className={`p-3.5 rounded-2xl border text-left flex items-center sm:flex-col sm:items-start justify-between sm:justify-start gap-2.5 transition-all duration-200 active:scale-95 ${
                isSelected
                  ? `bg-slate-900 border-2 ${d.color} shadow-lg ring-1 ring-emerald-500/30`
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
              id={`difficulty-option-${d.id}`}
            >
              <div className="flex items-center gap-2">
                {d.icon}
                <span className="text-sm font-black text-white">{d.label}</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {d.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
