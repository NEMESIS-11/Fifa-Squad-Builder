export type PositionCategory = 'GK' | 'DEF' | 'MID' | 'FWD';

export type PositionCode = 
  | 'GK' 
  | 'LB' | 'CB' | 'RB' | 'LWB' | 'RWB' 
  | 'CDM' | 'CM' | 'CAM' | 'LM' | 'RM' 
  | 'LW' | 'RW' | 'ST' | 'CF';

export type DifficultyMode = 'easy' | 'medium' | 'hard';

export type WorldCupYear = 
  | 1970 | 1974 | 1978 | 1982 | 1986 | 1990 
  | 1994 | 1998 | 2002 | 2006 | 2010 | 2014 | 2018 | 2022;

export interface Player {
  id: string;
  name: string;
  country: string;
  countryCode: string; // ISO 2-letter for flag or custom SVG
  year: WorldCupYear;
  squadNumber?: number;
  primaryPosition: PositionCode;
  secondaryPositions?: PositionCode[];
  club?: string;
  dateOfBirth?: string;
  overallRating: number;
  isGoalkeeper: boolean;
  photoUrl?: string;
}

export interface WorldCupSquad {
  year: WorldCupYear;
  country: string;
  countryCode: string;
  flagEmoji: string;
  hostCountry: string;
  players: Player[];
}

export interface PitchPositionSlot {
  id: string; // Unique slot ID in formation e.g., 'cb-1', 'cm-2'
  position: PositionCode;
  label: string; // Display label
  x: number; // Pitch percentage X (0 - 100)
  y: number; // Pitch percentage Y (0 - 100)
  category: PositionCategory;
}

export interface Formation {
  id: string;
  name: string; // e.g., '4-3-3'
  description: string;
  category: string; // e.g., 'Balanced', 'Attacking', 'Defensive'
  slots: PitchPositionSlot[];
}

export interface FilledSlot {
  slotId: string;
  position: PositionCode;
  player: Player;
  assignedAt: number; // Timestamp
}

export interface GameChallenge {
  id: string;
  year: WorldCupYear;
  country: string;
  countryCode: string;
  flagEmoji: string;
  squad: Player[];
  options?: Player[]; // 4 players for Easy/Medium
}

export interface GameSettings {
  soundEnabled: boolean;
  soundVolume: number;
  pitchTheme: 'classic' | 'night' | 'vintage' | 'neon';
  hapticsEnabled: boolean;
}

export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  bestAverageRating: number;
  fastestTimeSeconds: number | null;
  favoriteFormation: string;
  easyWins: number;
  mediumWins: number;
  hardWins: number;
  totalSkipsUsed: number;
  totalStrikesTaken: number;
  history: GameHistoryRecord[];
}

export type SquadTier = 'S+' | 'S' | 'A+' | 'A' | 'B' | 'C';

export interface BenchmarkSquad {
  id: string;
  rank?: number;
  name: string;
  era: string;
  formation: string;
  averageRating: number;
  score: number;
  tier: SquadTier;
  country: string;
  countryCode: string;
  flagEmoji: string;
  keyPlayers: string[];
  description: string;
  isUserSquad?: boolean;
  userDate?: string;
  difficulty?: DifficultyMode;
}

export interface GameHistoryRecord {
  id: string;
  date: string;
  difficulty: DifficultyMode;
  formation: string;
  squadName: string;
  averageRating: number;
  squadScore?: number;
  squadRank?: number;
  completedTimeSeconds: number;
  uniqueCountriesCount: number;
  uniqueYearsCount: number;
  players: {
    slotPosition: PositionCode;
    playerName: string;
    country: string;
    year: WorldCupYear;
    rating: number;
  }[];
}

export type GameStatus = 'idle' | 'playing' | 'completed' | 'gameover';
