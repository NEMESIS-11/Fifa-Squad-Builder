import React from 'react';
import { Player } from '../types';
import { X, Award, Shield, Calendar, Building } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface PlayerCardModalProps {
  player: Player | null;
  onClose: () => void;
}

export const PlayerCardModal: React.FC<PlayerCardModalProps> = ({ player, onClose }) => {
  if (!player) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-3 sm:p-4 bg-black/85 backdrop-blur-md flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="relative my-auto w-full max-w-sm max-h-[90dvh] overflow-y-auto bg-gradient-to-b from-slate-900 to-emerald-950 border-2 border-amber-500/50 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4 text-center"
        id="player-card-modal"
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Flag & Rating Header */}
        <div className="flex items-center justify-between w-full mt-2 px-2">
          <span className="text-4xl">{player.countryCode}</span>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">OVR Rating</span>
            <span className="text-3xl font-black text-amber-400 font-mono">{player.overallRating}</span>
          </div>
        </div>

        {/* Player Name & Country */}
        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-2xl font-black text-white">{player.name}</h3>
          <p className="text-sm font-bold text-emerald-400 mt-0.5">{player.country}</p>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Tournament</span>
            </div>
            <div className="text-sm font-bold text-white font-mono">{player.year} FIFA World Cup</div>
          </div>

          <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Position</span>
            </div>
            <div className="text-sm font-bold text-white font-mono uppercase">{player.primaryPosition}</div>
          </div>

          {player.club && (
            <div className="col-span-2 p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                <Building className="w-3.5 h-3.5 text-amber-400" />
                <span>Club at World Cup</span>
              </div>
              <div className="text-sm font-bold text-white">{player.club}</div>
            </div>
          )}
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold rounded-2xl text-sm transition-all shadow-lg"
        >
          Close Card
        </button>
      </div>
    </div>
  );
};
