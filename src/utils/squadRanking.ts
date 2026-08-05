import { BenchmarkSquad, FilledSlot, DifficultyMode, GameHistoryRecord, SquadTier, PositionCode } from '../types';
import { BEST_WORLD_CUP_SQUADS_DATABASE } from '../data/bestSquadsDatabase';
import { loadStats } from './storage';

export interface SquadScoreResult {
  score: number;
  averageRating: number;
  rawAverageRating: number;
  positionalPenalty: number;
  chemistryBonus: number;
  uniqueCountriesBonus: number;
  worldCupWinnerBonus: number;
  worldCupWinnerCount: number;
  uniqueYearsBonus: number;
  speedBonus: number;
  difficultyBonus: number;
  continuePenalty: number;
  tier: SquadTier;
}

/**
 * Calculates dynamic penalty rating deduction and extra skips based on current squad progress.
 * - The more players already added to the squad, the bigger the rating penalty.
 * - The more empty slots remaining, the more skips & strikes added.
 */
export const calculateContinuePenaltyInfo = (filledCount: number) => {
  const emptySlots = Math.max(1, 11 - filledCount);
  // Penalty increases with number of players added so far
  const penaltyPoints = Math.round((0.5 * filledCount + 0.5) * 10) / 10;
  // More empty slots remaining = more skips added
  const additionalSkips = Math.max(2, Math.ceil(emptySlots / 2));
  return { penaltyPoints, additionalSkips, emptySlots };
};

/**
  * Map of World Cup tournament winning teams by year
  */
export const WORLD_CUP_WINNERS_BY_YEAR: Record<number, string[]> = {
  1970: ['Brazil'],
  1974: ['West Germany', 'Germany'],
  1978: ['Argentina'],
  1982: ['Italy'],
  1986: ['Argentina'],
  1990: ['West Germany', 'Germany'],
  1994: ['Brazil'],
  1998: ['France'],
  2002: ['Brazil'],
  2006: ['Italy'],
  2010: ['Spain'],
  2014: ['Germany', 'West Germany'],
  2018: ['France'],
  2022: ['Argentina'],
};

export const isPlayerWorldCupWinner = (country: string, year: number): boolean => {
  const winners = WORLD_CUP_WINNERS_BY_YEAR[year];
  if (!winners) return false;
  return winners.includes(country);
};

export interface UserSquadRankInfo {
  rank: number;
  totalSquads: number;
  scoreResult: SquadScoreResult;
  tier: SquadTier;
  percentile: string;
  allSquadsSorted: BenchmarkSquad[];
}

/**
 * Calculates positional suitability penalty for a player placed in a specific pitch slot.
 * - Primary position match: 0 penalty
 * - Secondary position match: -2.0 rating penalty
 * - Flexible/similar position match (e.g. ST in CAM, LW in LM): -4.5 rating penalty
 * - Major position mismatch / fallback: -9.0 rating penalty
 */
export const getPositionSuitabilityPenalty = (
  primary: PositionCode,
  secondaries: PositionCode[] = [],
  slotPos: PositionCode,
  isGK: boolean
): number => {
  if (slotPos === 'GK') return isGK ? 0 : 25;
  if (isGK) return 25;
  if (primary === slotPos) return 0;
  if (secondaries.includes(slotPos)) return 3.0;

  const flexibleMap: Record<string, string[]> = {
    LB: ['LWB', 'CB', 'LM'],
    RB: ['RWB', 'CB', 'RM'],
    LWB: ['LB', 'LM'],
    RWB: ['RB', 'RM'],
    CB: ['LB', 'RB', 'CDM'],
    CDM: ['CM', 'CB'],
    CM: ['CDM', 'CAM', 'LM', 'RM'],
    CAM: ['CM', 'LW', 'RW', 'ST', 'CF'],
    LM: ['LW', 'LB', 'CM'],
    RM: ['RW', 'RB', 'CM'],
    LW: ['LM', 'RW', 'ST', 'CAM'],
    RW: ['RM', 'LW', 'ST', 'CAM'],
    ST: ['CF', 'LW', 'RW', 'CAM'],
    CF: ['ST', 'CAM', 'LW', 'RW'],
  };

  const allowed = flexibleMap[primary] || [];
  if (allowed.includes(slotPos)) return 6.0;
  return 12.0;
};

/**
 * Calculates a player's effective position-adjusted rating in a specific pitch slot.
 */
export const getEffectivePlayerRating = (
  primary: PositionCode,
  secondaries: PositionCode[] = [],
  baseRating: number,
  slotPos: PositionCode,
  isGK: boolean
): number => {
  const penalty = getPositionSuitabilityPenalty(primary, secondaries, slotPos, isGK);
  return Math.max(40, baseRating - penalty);
};

/**
 * Calculates total squad score and rating metrics for a completed draft XI.
 */
export const calculateSquadScore = (
  filledSlots: FilledSlot[],
  difficulty: DifficultyMode,
  elapsedSeconds: number,
  continuePenalty: number = 0
): SquadScoreResult => {
  if (filledSlots.length === 0) {
    return {
      score: 0,
      averageRating: 0,
      rawAverageRating: 0,
      positionalPenalty: 0,
      chemistryBonus: 0,
      uniqueCountriesBonus: 0,
      worldCupWinnerBonus: 0,
      worldCupWinnerCount: 0,
      uniqueYearsBonus: 0,
      speedBonus: 0,
      difficultyBonus: 0,
      continuePenalty: 0,
      tier: 'C',
    };
  }

  const totalRawRating = filledSlots.reduce((acc, curr) => acc + curr.player.overallRating, 0);
  const rawAverageRating = Math.round((totalRawRating / filledSlots.length) * 10) / 10;

  // 1. Calculate each player's individual effective rating after positional penalty
  let totalAdjustedRating = 0;
  let totalPositionPenalty = 0;

  filledSlots.forEach((s) => {
    const penalty = getPositionSuitabilityPenalty(
      s.player.primaryPosition,
      s.player.secondaryPositions || [],
      s.position,
      s.player.isGoalkeeper
    );
    const adjustedRating = Math.max(40, s.player.overallRating - penalty);
    totalAdjustedRating += adjustedRating;
    totalPositionPenalty += penalty;
  });

  const adjustedAverageRating = Math.round((totalAdjustedRating / filledSlots.length) * 10) / 10;
  const positionalPenalty = Math.round((totalPositionPenalty / filledSlots.length) * 10) / 10;

  // 2. Chemistry & Synergy calculation (same country / era links)
  const countryCounts: Record<string, number> = {};
  const yearCounts: Record<number, number> = {};
  filledSlots.forEach((s) => {
    countryCounts[s.player.country] = (countryCounts[s.player.country] || 0) + 1;
    yearCounts[s.player.year] = (yearCounts[s.player.year] || 0) + 1;
  });

  let countryChem = 0;
  Object.values(countryCounts).forEach((cnt) => {
    if (cnt >= 2) countryChem += (cnt - 1) * 0.25;
  });

  let yearChem = 0;
  Object.values(yearCounts).forEach((cnt) => {
    if (cnt >= 2) yearChem += (cnt - 1) * 0.20;
  });

  const chemistryBonus = Math.min(1.5, Math.round((countryChem + yearChem) * 10) / 10);

  // Effective Squad Average Rating (average of position-adjusted player ratings + chemistry bonus - continue penalty)
  const effectiveRating = Math.max(
    40,
    adjustedAverageRating + chemistryBonus - continuePenalty
  );
  const averageRating = Math.round(effectiveRating * 10) / 10;

  // World Cup Winners bonus: +0.1 for each player in the squad who won the World Cup
  let worldCupWinnerCount = 0;
  filledSlots.forEach((s) => {
    if (isPlayerWorldCupWinner(s.player.country, s.player.year)) {
      worldCupWinnerCount++;
    }
  });
  const worldCupWinnerBonus = Math.round(worldCupWinnerCount * 0.1 * 10) / 10;

  // Country bonus removed
  const uniqueCountriesBonus = 0;

  // Speed / time bonus removed
  const speedBonus = 0;

  // World Cup editions bonus removed
  const uniqueYearsCount = new Set(filledSlots.map((s) => s.player.year)).size;
  const uniqueYearsBonus = 0;

  // Difficulty bonus
  const difficultyBonus = difficulty === 'hard' ? 2.0 : difficulty === 'medium' ? 1.0 : 0;

  // Total Score (capped logically at 99.9)
  const rawScore = averageRating + worldCupWinnerBonus + difficultyBonus;
  const score = Math.min(99.9, Math.max(40, Math.round(rawScore * 10) / 10));

  const tier = getTierForScore(score);

  return {
    score,
    averageRating,
    rawAverageRating,
    positionalPenalty,
    chemistryBonus,
    uniqueCountriesBonus: 0,
    worldCupWinnerBonus,
    worldCupWinnerCount,
    uniqueYearsBonus: 0,
    speedBonus: 0,
    difficultyBonus,
    continuePenalty,
    tier,
  };
};

/**
 * Calculates exact global squad rank number (1 to N) based on effective squad average rating.
 * Top 5 is reserved for elite squads with effective rating 90.0+.
 */
export const calculateExactSquadRank = (averageRating: number): number => {
  if (averageRating >= 97.8) return 1;
  if (averageRating >= 96.5) return 2;
  if (averageRating >= 95.5) return 3;
  if (averageRating >= 94.5) return 4;
  if (averageRating >= 93.5) return 5;
  if (averageRating >= 92.5) return 6;
  if (averageRating >= 91.5) return 7;
  if (averageRating >= 90.5) return 8;
  if (averageRating >= 89.5) return 10;
  if (averageRating >= 88.0) return 15;
  if (averageRating >= 86.5) return 25;
  if (averageRating >= 85.0) return 50;

  const diff = 93.5 - averageRating;
  // Exponential scale for rank placement below top 5
  const rank = Math.max(5, Math.round(5 + Math.pow(Math.max(0, diff) / 0.12, 1.45)));
  return rank;
};

/**
 * Map a numerical squad score to its tier category.
 */
export const getTierForScore = (score: number): SquadTier => {
  if (score >= 95.0) return 'S+';
  if (score >= 91.0) return 'S';
  if (score >= 87.0) return 'A+';
  if (score >= 83.0) return 'A';
  if (score >= 79.0) return 'B';
  return 'C';
};

/**
 * Combines baseline database squads with user saved career games and ranks them from 1 to N.
 */
export const getCombinedSquadDatabase = (currentUserGame?: {
  id: string;
  squadName: string;
  formation: string;
  score: number;
  averageRating: number;
  difficulty: DifficultyMode;
  date: string;
  playersCount: number;
  countryCode?: string;
  flagEmoji?: string;
  keyPlayers?: string[];
}): BenchmarkSquad[] => {
  const stats = loadStats();
  const allSquads: BenchmarkSquad[] = [...BEST_WORLD_CUP_SQUADS_DATABASE];

  // Map user history games into database format
  if (stats && stats.history) {
    stats.history.forEach((record: GameHistoryRecord) => {
      // Calculate score if missing
      const userScore = record.squadScore || Math.round((record.averageRating + (record.difficulty === 'hard' ? 3.0 : record.difficulty === 'medium' ? 1.5 : 0)) * 10) / 10;
      const userRank = record.squadRank || calculateExactSquadRank(record.averageRating);
      
      allSquads.push({
        id: record.id,
        rank: userRank,
        name: record.squadName || `Your ${record.formation} World Cup XI`,
        era: `User Career (${record.date})`,
        formation: record.formation,
        averageRating: record.averageRating,
        score: userScore,
        tier: getTierForScore(userScore),
        country: 'Custom User XI',
        countryCode: 'UN',
        flagEmoji: '🏆',
        keyPlayers: record.players ? record.players.slice(0, 4).map((p) => p.playerName) : ['User Draft XI'],
        description: `Drafted with ${record.averageRating} Avg Rating in ${record.completedTimeSeconds ? Math.floor(record.completedTimeSeconds / 60) + 'm ' + (record.completedTimeSeconds % 60) + 's' : 'Quick Draft'} across ${record.uniqueCountriesCount || 11} nations!`,
        isUserSquad: true,
        userDate: record.date,
        difficulty: record.difficulty,
      });
    });
  }

  // Inject current active game if provided
  if (currentUserGame) {
    const exists = allSquads.some((s) => s.id === currentUserGame.id);
    if (!exists) {
      const activeRank = calculateExactSquadRank(currentUserGame.averageRating);
      allSquads.push({
        id: currentUserGame.id,
        rank: activeRank,
        name: currentUserGame.squadName,
        era: 'Just Completed!',
        formation: currentUserGame.formation,
        averageRating: currentUserGame.averageRating,
        score: currentUserGame.score,
        tier: getTierForScore(currentUserGame.score),
        country: 'Your Drafted XI',
        countryCode: currentUserGame.countryCode || 'UN',
        flagEmoji: currentUserGame.flagEmoji || '🏆',
        keyPlayers: currentUserGame.keyPlayers || ['Your Selected Squad'],
        description: `Newly completed tactical XI! Ranked #${activeRank} based on its ${currentUserGame.averageRating} average player rating.`,
        isUserSquad: true,
        userDate: currentUserGame.date,
        difficulty: currentUserGame.difficulty,
      });
    }
  }

  // Sort strictly by rank (ascending), then averageRating (descending)
  allSquads.sort((a, b) => {
    const rankA = a.rank || calculateExactSquadRank(a.averageRating);
    const rankB = b.rank || calculateExactSquadRank(b.averageRating);
    return rankA - rankB || b.averageRating - a.averageRating;
  });

  return allSquads;
};

/**
 * Evaluates the exact rank (1 to N) of a given user squad against all possible positional permutations.
 */
export const evaluateUserSquadRank = (
  filledSlots: FilledSlot[],
  difficulty: DifficultyMode,
  elapsedSeconds: number,
  formationName: string,
  continuePenalty: number = 0
): UserSquadRankInfo => {
  const scoreResult = calculateSquadScore(filledSlots, difficulty, elapsedSeconds, continuePenalty);
  const currentId = `current-game-${Date.now()}`;

  const topPlayers = filledSlots
    .slice()
    .sort((a, b) => b.player.overallRating - a.player.overallRating)
    .slice(0, 4)
    .map((s) => `${s.player.name} (${s.player.overallRating})`);

  const calculatedRank = calculateExactSquadRank(scoreResult.averageRating);

  const allSquadsSorted = getCombinedSquadDatabase({
    id: currentId,
    squadName: `Your ${formationName} World Cup XI`,
    formation: formationName,
    score: scoreResult.score,
    averageRating: scoreResult.averageRating,
    difficulty,
    date: new Date().toLocaleDateString(),
    playersCount: filledSlots.length,
    countryCode: 'UN',
    flagEmoji: '🏆',
    keyPlayers: topPlayers,
  });

  const totalSquads = Math.max(calculatedRank, 1000);

  const percentileNum = Math.max(1, Math.min(99, Math.round((calculatedRank / 1000) * 100)));
  const percentile = calculatedRank === 1 ? 'Rank #1 World Record!' : `Top ${percentileNum}% World XI`;

  return {
    rank: calculatedRank,
    totalSquads,
    scoreResult,
    tier: scoreResult.tier,
    percentile,
    allSquadsSorted,
  };
};

