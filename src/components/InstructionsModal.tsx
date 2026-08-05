import React from 'react';
import { X, Trophy, Shield, HelpCircle, FastForward, AlertTriangle, Lightbulb } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-2 sm:p-4 flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="relative my-auto w-full max-w-xl max-h-[92dvh] overflow-y-auto bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 text-white"
        id="instructions-modal"
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
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">How To Play</h2>
            <p className="text-xs text-slate-400 font-semibold">FIFA World Cup Squad Builder Rules</p>
          </div>
        </div>

        {/* Core Rules Section */}
        <div className="flex flex-col gap-4 text-xs sm:text-sm text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Objective</span>
              Build an authentic World Cup XI using randomly generated squads from 1970 to 2022! Every turn draws a random World Cup year and participating nation.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5">Difficulty Modes</span>
              <ul className="list-disc list-inside space-y-1 text-slate-400 mt-1">
                <li><strong className="text-emerald-300">Easy Mode:</strong> Choose from 4 player options with full ratings shown.</li>
                <li><strong className="text-amber-300">Medium Mode:</strong> Choose from 4 player options, but ratings are hidden!</li>
                <li><strong className="text-red-300">Hard Mode:</strong> Type player names into a search bar. Incorrect guesses trigger strikes!</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
              <FastForward className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block text-xs">Skips (3 Max)</span>
                <span className="text-[11px] text-slate-400">Skip tough country/year draws without filling a position.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block text-xs">Strikes (Hard Mode)</span>
                <span className="text-[11px] text-slate-400">5 incorrect player searches results in Game Over!</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-950/50 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-200 text-xs">
            <Lightbulb className="w-5 h-5 text-amber-300 shrink-0" />
            <span>
              <strong>Tactical Tip:</strong> Versatile players like Philipp Lahm, Javier Zanetti, or Sergio Ramos fit multiple positions. When drawn, choose their position wisely!
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold rounded-2xl text-sm shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          Got It!
        </button>
      </div>
    </div>
  );
};
