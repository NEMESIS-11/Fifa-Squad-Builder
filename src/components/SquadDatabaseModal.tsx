import React, { useState } from 'react';
import { BenchmarkSquad, SquadTier } from '../types';
import { getCombinedSquadDatabase } from '../utils/squadRanking';
import { X, Trophy, Search, Filter, Shield, Star, Award, ChevronDown, ChevronUp, User, Globe, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SquadDatabaseModalProps {
  onClose: () => void;
  highlightSquadId?: string;
}

export const SquadDatabaseModal: React.FC<SquadDatabaseModalProps> = ({
  onClose,
  highlightSquadId,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<string>('ALL');
  const [expandedSquadId, setExpandedSquadId] = useState<string | null>(highlightSquadId || null);

  const allSquads = getCombinedSquadDatabase();

  // Filter squads based on search & tier
  const filteredSquads = allSquads.filter((squad) => {
    const matchesSearch =
      squad.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.formation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      squad.keyPlayers.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    if (selectedTier === 'ALL') return matchesSearch;
    if (selectedTier === 'USER') return matchesSearch && squad.isUserSquad;
    return matchesSearch && squad.tier === selectedTier;
  });

  const getRankBadgeStyle = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 text-slate-950 font-black shadow-lg shadow-yellow-500/30';
    if (rank === 2) return 'bg-slate-300 text-slate-950 font-black border border-white/50';
    if (rank === 3) return 'bg-amber-700 text-amber-100 font-black border border-amber-500/40';
    return 'bg-white/10 text-slate-300 font-bold';
  };

  const getTierColor = (tier: SquadTier) => {
    switch (tier) {
      case 'S+':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50 shadow-sm shadow-yellow-500/20';
      case 'S':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'A+':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'A':
        return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'B':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-5 flex flex-col items-center justify-start sm:justify-center animate-fadeIn">
      <div
        className="relative my-auto w-full max-w-4xl max-h-[92dvh] overflow-y-auto bg-[#0a0f14] border-2 border-yellow-500/40 rounded-3xl p-4 sm:p-7 shadow-2xl flex flex-col gap-5 text-white"
        id="squad-database-modal"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-slate-300 rounded-full transition-colors z-10"
          id="close-database-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 border-b border-white/10 pb-4 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-yellow-500/20 shrink-0">
            <Trophy className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black italic uppercase tracking-wide text-white">
                World Cup Best Squads Database
              </h2>
              <span className="px-2.5 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-mono font-bold rounded-lg border border-yellow-500/40">
                1 to {allSquads.length} Ranked
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Explore the database of top historical squads and theoretical maximum drafts. See where your squad ranks!
            </p>
          </div>
        </div>

        {/* Search Bar & Tier Filter Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by team, player (e.g. Pelé, Messi), or country..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 transition-colors"
              id="squad-database-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tier Filters */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0" id="squad-tier-filters">
            {['ALL', 'S+', 'S', 'A+', 'A', 'B', 'USER'].map((tier) => (
              <button
                key={tier}
                onClick={() => {
                  soundFx.playClick();
                  setSelectedTier(tier);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all shrink-0 ${
                  selectedTier === tier
                    ? 'bg-yellow-500 text-slate-950 font-black shadow-md shadow-yellow-500/20'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tier === 'USER' ? 'My Drafts' : tier}
              </button>
            ))}
          </div>
        </div>

        {/* Database Squads List */}
        <div className="max-h-[50vh] overflow-y-auto flex flex-col gap-2.5 pr-1" id="squad-database-list">
          {filteredSquads.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center flex flex-col items-center gap-2 text-slate-400">
              <Search className="w-8 h-8 text-slate-500" />
              <p className="text-sm font-semibold">No squads found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTier('ALL');
                }}
                className="text-xs text-yellow-400 underline font-bold mt-1"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredSquads.map((squad) => {
              const isHighlighted = squad.id === highlightSquadId || squad.isUserSquad;
              const isExpanded = expandedSquadId === squad.id;

              return (
                <div
                  key={squad.id}
                  className={`rounded-2xl border transition-all ${
                    isHighlighted
                      ? 'bg-gradient-to-r from-yellow-950/40 via-[#0a0f14] to-yellow-950/40 border-yellow-500 shadow-lg shadow-yellow-500/10'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  id={`squad-db-item-${squad.id}`}
                >
                  {/* Main Row */}
                  <div
                    onClick={() => {
                      soundFx.playClick();
                      setExpandedSquadId(isExpanded ? null : squad.id);
                    }}
                    className="p-3.5 sm:p-4 flex items-center justify-between gap-3 cursor-pointer select-none"
                  >
                    {/* Left: Rank Badge & Team Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Rank Badge */}
                      <div
                        className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 text-sm font-mono ${getRankBadgeStyle(
                          squad.rank || 0
                        )}`}
                      >
                        #{squad.rank}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-base sm:text-lg">{squad.flagEmoji}</span>
                          <h3 className="text-sm sm:text-base font-bold text-white truncate">
                            {squad.name}
                          </h3>

                          {squad.isUserSquad && (
                            <span className="px-2 py-0.5 bg-yellow-500 text-slate-950 text-[10px] font-black uppercase rounded-md shadow-sm">
                              YOUR SQUAD
                            </span>
                          )}

                          <span
                            className={`px-2 py-0.5 text-[10px] font-black font-mono uppercase rounded-md border ${getTierColor(
                              squad.tier
                            )}`}
                          >
                            TIER {squad.tier}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 truncate font-mono">
                          <span>{squad.era}</span>
                          <span>•</span>
                          <span className="text-yellow-400 font-bold">{squad.formation}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Score & Expand Icon */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Score</div>
                        <div className="text-base sm:text-xl font-black italic text-yellow-400 font-mono">
                          {squad.score}
                        </div>
                      </div>

                      <div className="text-slate-400 hover:text-white transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail View */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 border-t border-white/10 flex flex-col gap-3 text-xs bg-black/40 rounded-b-2xl animate-fadeIn">
                      <p className="text-slate-300 italic">{squad.description}</p>

                      <div className="flex items-center justify-between gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="font-semibold text-slate-300">Avg Player Rating:</span>
                          <span className="font-mono font-bold text-yellow-400 text-sm">
                            {squad.averageRating}
                          </span>
                        </div>

                        {squad.difficulty && (
                          <div className="text-slate-400 font-mono">
                            Difficulty Bonus: <span className="text-white font-bold uppercase">{squad.difficulty}</span>
                          </div>
                        )}
                      </div>

                      {/* Key Star Players */}
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 tracking-wider">
                          Key Star Players
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {squad.keyPlayers.map((player, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-white/10 text-slate-200 text-xs font-semibold rounded-lg border border-white/10"
                            >
                              ⚽ {player}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Database updated: 1970–2022 World Cup Eras</span>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-bold uppercase tracking-wider rounded-xl hover:from-yellow-300 hover:to-amber-400 transition-all shadow-md"
            id="done-database-btn"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
};
