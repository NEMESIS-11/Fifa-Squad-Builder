import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, AlertCircle, XCircle } from 'lucide-react';
import { Player } from '../types';
import { WORLD_CUP_SQUADS } from '../data/worldCupSquads';
import { soundFx } from '../utils/audio';

interface HardSearchProps {
  country: string;
  year: number;
  squad?: Player[];
  strikes: number;
  onSubmitSearch: (query: string) => void;
}

export const HardSearch: React.FC<HardSearchProps> = ({
  country,
  year,
  squad = [],
  strikes,
  onSubmitSearch,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close suggestions list on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if query meets >= 3 chars criterion
  const cleanQuery = useMemo(() => {
    return query.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }, [query]);

  const queryWords = useMemo(() => {
    return cleanQuery.split(/\s+/).filter(Boolean);
  }, [cleanQuery]);

  const isSearchable = cleanQuery.length >= 3 || queryWords.some((w) => w.length >= 3);

  // Filter matching players when query >= 3 letters, deduplicated by name
  const matchingPlayers = useMemo(() => {
    if (!isSearchable) return [];

    const matchesPlayer = (p: Player) => {
      const normName = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      const nameWords = normName.split(/\s+/).filter(Boolean);

      if (normName.includes(cleanQuery)) return true;
      return queryWords.every((qw) =>
        nameWords.some((nw) => nw.includes(qw) || nw.startsWith(qw))
      );
    };

    // Gather all matching players (current squad first, then global)
    const allMatches: Player[] = [];
    const currentSquadMatches = squad.filter(matchesPlayer);
    allMatches.push(...currentSquadMatches);

    for (const sq of WORLD_CUP_SQUADS) {
      for (const p of sq.players) {
        if (matchesPlayer(p)) {
          allMatches.push(p);
        }
      }
    }

    // Deduplicate by normalized player name
    const playerByName = new Map<string, Player>();

    for (const p of allMatches) {
      const normName = p.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (!playerByName.has(normName)) {
        playerByName.set(normName, p);
      } else {
        // Prefer the card corresponding to the current challenge squad if available
        const existing = playerByName.get(normName)!;
        const isCurrent = p.country.toLowerCase() === country.toLowerCase() && p.year === year;
        const existingIsCurrent = existing.country.toLowerCase() === country.toLowerCase() && existing.year === year;

        if (isCurrent && !existingIsCurrent) {
          playerByName.set(normName, p);
        }
      }
    }

    return Array.from(playerByName.values()).slice(0, 10);
  }, [cleanQuery, queryWords, isSearchable, squad, country, year]);

  const handleSelectPlayer = (playerName: string) => {
    soundFx.playClick();
    onSubmitSearch(playerName);
    setQuery('');
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    soundFx.playClick();
    onSubmitSearch(query);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-3 my-2" id="hard-search-container" ref={containerRef}>
      {/* Search Input Bar */}
      <form onSubmit={handleSubmit} className="relative w-full flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={`Type a player from ${country} ${year}...`}
          className="w-full py-3.5 pl-11 pr-28 rounded-2xl bg-slate-900/90 border-2 border-emerald-500/40 text-white placeholder-slate-400 font-medium text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 shadow-lg transition-all"
          id="hard-search-input"
          autoComplete="off"
        />
        <Search className="absolute left-3.5 w-5 h-5 text-emerald-400" />

        <button
          type="submit"
          disabled={!query.trim()}
          className="absolute right-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          id="hard-search-submit-btn"
        >
          Submit
        </button>

        {/* Autocomplete Dropdown Panel */}
        {isOpen && isSearchable && (
          <div className="absolute top-full left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-slate-950/95 border-2 border-emerald-500/60 rounded-2xl shadow-2xl z-50 divide-y divide-slate-800/80 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-4 py-2 text-[11px] font-bold tracking-wider uppercase text-emerald-400 bg-slate-900/90 sticky top-0 backdrop-blur-md flex justify-between items-center z-10 border-b border-slate-800">
              <span>Matching Players ({matchingPlayers.length})</span>
              <span className="text-[10px] text-slate-400 normal-case">Click name to select</span>
            </div>

            {matchingPlayers.length > 0 ? (
              matchingPlayers.map((p, idx) => (
                <button
                  key={`${p.id}-${idx}`}
                  type="button"
                  onClick={() => handleSelectPlayer(p.name)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-emerald-950/60 transition-all group border-b border-slate-800/40 last:border-0"
                >
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                    {p.name}
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-800 text-amber-400 border border-slate-700">
                      {p.primaryPosition}
                    </span>
                  </div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-xs font-medium text-slate-400">
                No players found matching "{query}".
              </div>
            )}
          </div>
        )}
      </form>

      {/* Strikes HUD Indicator */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-300">
            Strikes (5 Max = Game Over):
          </span>
        </div>

        <div className="flex items-center gap-1.5" id="strikes-counter">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                i < strikes
                  ? 'bg-red-600 border-red-400 text-white shadow-sm shadow-red-500/50 scale-110'
                  : 'bg-slate-800 border-slate-700 text-slate-600'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

