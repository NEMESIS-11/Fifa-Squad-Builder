import React from 'react';
import { GameSettings } from '../types';
import { X, Volume2, VolumeX, Sparkles, Smartphone, Palette } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-4 flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="relative my-auto w-full max-w-md max-h-[90dvh] overflow-y-auto bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-5 text-white"
        id="settings-modal"
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
        <div className="border-b border-slate-800 pb-3">
          <h2 className="text-2xl font-black text-white">Settings & Customization</h2>
          <p className="text-xs text-slate-400 font-semibold">Adjust stadium atmosphere & feedback</p>
        </div>

        {/* Sound FX Toggle */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {settings.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
            <div>
              <div className="text-sm font-bold text-white">Stadium Whistles & Audio</div>
              <div className="text-xs text-slate-400">Synthesized match sound effects</div>
            </div>
          </div>

          <button
            onClick={() => {
              const val = !settings.soundEnabled;
              soundFx.playClick();
              onUpdateSettings({ soundEnabled: val });
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              settings.soundEnabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Pitch Theme Selector */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Palette className="w-4 h-4 text-amber-400" />
            <span>Stadium Pitch Theme</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            {(['classic', 'night', 'vintage', 'neon'] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  soundFx.playClick();
                  onUpdateSettings({ pitchTheme: t });
                }}
                className={`p-3 rounded-xl border text-center capitalize transition-all ${
                  settings.pitchTheme === t
                    ? 'bg-emerald-950 border-amber-400 text-amber-300 shadow-md'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {t} Stadium
              </button>
            ))}
          </div>
        </div>

        {/* Haptics Toggle */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-sm font-bold text-white">Haptic Vibration</div>
              <div className="text-xs text-slate-400">Tactile feel on card selection</div>
            </div>
          </div>

          <button
            onClick={() => {
              const val = !settings.hapticsEnabled;
              soundFx.playClick();
              onUpdateSettings({ hapticsEnabled: val });
            }}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              settings.hapticsEnabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                settings.hapticsEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold rounded-2xl text-sm shadow-lg hover:from-emerald-500 hover:to-teal-500 transition-all"
        >
          Done
        </button>
      </div>
    </div>
  );
};
