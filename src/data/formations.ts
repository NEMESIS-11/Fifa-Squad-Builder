import { Formation } from '../types';

export const FORMATIONS: Formation[] = [
  {
    id: '4-3-3',
    name: '4-3-3',
    category: 'Balanced',
    description: 'Classic attacking formation with wingers and a single striker.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lb', position: 'LB', label: 'LB', x: 15, y: 70, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 38, y: 74, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 62, y: 74, category: 'DEF' },
      { id: 'rb', position: 'RB', label: 'RB', x: 85, y: 70, category: 'DEF' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 30, y: 48, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 70, y: 48, category: 'MID' },
      { id: 'cam', position: 'CAM', label: 'CAM', x: 50, y: 38, category: 'MID' },
      { id: 'lw', position: 'LW', label: 'LW', x: 20, y: 20, category: 'FWD' },
      { id: 'st', position: 'ST', label: 'ST', x: 50, y: 15, category: 'FWD' },
      { id: 'rw', position: 'RW', label: 'RW', x: 80, y: 20, category: 'FWD' },
    ]
  },
  {
    id: '4-2-3-1',
    name: '4-2-3-1',
    category: 'Control',
    description: 'Double pivot midfielders shielding defense with 3 attacking midfielders.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lb', position: 'LB', label: 'LB', x: 15, y: 72, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 38, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 62, y: 75, category: 'DEF' },
      { id: 'rb', position: 'RB', label: 'RB', x: 85, y: 72, category: 'DEF' },
      { id: 'cdm1', position: 'CDM', label: 'CDM', x: 36, y: 56, category: 'MID' },
      { id: 'cdm2', position: 'CDM', label: 'CDM', x: 64, y: 56, category: 'MID' },
      { id: 'lm', position: 'LM', label: 'LM', x: 20, y: 34, category: 'MID' },
      { id: 'cam', position: 'CAM', label: 'CAM', x: 50, y: 32, category: 'MID' },
      { id: 'rm', position: 'RM', label: 'RM', x: 80, y: 34, category: 'MID' },
      { id: 'st', position: 'ST', label: 'ST', x: 50, y: 14, category: 'FWD' },
    ]
  },
  {
    id: '4-4-2',
    name: '4-4-2',
    category: 'Classic',
    description: 'Traditional solid two banks of four with two strikers up front.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lb', position: 'LB', label: 'LB', x: 15, y: 72, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 38, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 62, y: 75, category: 'DEF' },
      { id: 'rb', position: 'RB', label: 'RB', x: 85, y: 72, category: 'DEF' },
      { id: 'lm', position: 'LM', label: 'LM', x: 18, y: 46, category: 'MID' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 38, y: 48, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 62, y: 48, category: 'MID' },
      { id: 'rm', position: 'RM', label: 'RM', x: 82, y: 46, category: 'MID' },
      { id: 'st1', position: 'ST', label: 'ST', x: 36, y: 18, category: 'FWD' },
      { id: 'st2', position: 'ST', label: 'ST', x: 64, y: 18, category: 'FWD' },
    ]
  },
  {
    id: '3-5-2',
    name: '3-5-2',
    category: 'Dynamic',
    description: '3 central defenders with active wing-backs supplying width.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 25, y: 74, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 50, y: 76, category: 'DEF' },
      { id: 'cb3', position: 'CB', label: 'CB', x: 75, y: 74, category: 'DEF' },
      { id: 'lwb', position: 'LWB', label: 'LWB', x: 12, y: 52, category: 'DEF' },
      { id: 'rwb', position: 'RWB', label: 'RWB', x: 88, y: 52, category: 'DEF' },
      { id: 'cdm', position: 'CDM', label: 'CDM', x: 50, y: 58, category: 'MID' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 34, y: 42, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 66, y: 42, category: 'MID' },
      { id: 'st1', position: 'ST', label: 'ST', x: 36, y: 18, category: 'FWD' },
      { id: 'st2', position: 'ST', label: 'ST', x: 64, y: 18, category: 'FWD' },
    ]
  },
  {
    id: '5-3-2',
    name: '5-3-2',
    category: 'Defensive',
    description: 'Impenetrable 5-man backline with strong counter-attacking capability.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lwb', position: 'LWB', label: 'LWB', x: 12, y: 68, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 30, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 50, y: 77, category: 'DEF' },
      { id: 'cb3', position: 'CB', label: 'CB', x: 70, y: 75, category: 'DEF' },
      { id: 'rwb', position: 'RWB', label: 'RWB', x: 88, y: 68, category: 'DEF' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 32, y: 48, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 68, y: 48, category: 'MID' },
      { id: 'cam', position: 'CAM', label: 'CAM', x: 50, y: 38, category: 'MID' },
      { id: 'st1', position: 'ST', label: 'ST', x: 36, y: 18, category: 'FWD' },
      { id: 'st2', position: 'ST', label: 'ST', x: 64, y: 18, category: 'FWD' },
    ]
  },
  {
    id: '4-1-2-1-2',
    name: '4-1-2-1-2',
    category: 'Diamond',
    description: 'Diamond midfield providing intense central dominance.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lb', position: 'LB', label: 'LB', x: 15, y: 72, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 38, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 62, y: 75, category: 'DEF' },
      { id: 'rb', position: 'RB', label: 'RB', x: 85, y: 72, category: 'DEF' },
      { id: 'cdm', position: 'CDM', label: 'CDM', x: 50, y: 60, category: 'MID' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 30, y: 45, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 70, y: 45, category: 'MID' },
      { id: 'cam', position: 'CAM', label: 'CAM', x: 50, y: 32, category: 'MID' },
      { id: 'st1', position: 'ST', label: 'ST', x: 36, y: 16, category: 'FWD' },
      { id: 'st2', position: 'ST', label: 'ST', x: 64, y: 16, category: 'FWD' },
    ]
  },
  {
    id: '3-4-3',
    name: '3-4-3',
    category: 'Attacking',
    description: 'High pressure formation overload across flanks and frontline.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 25, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 50, y: 77, category: 'DEF' },
      { id: 'cb3', position: 'CB', label: 'CB', x: 75, y: 75, category: 'DEF' },
      { id: 'lm', position: 'LM', label: 'LM', x: 15, y: 48, category: 'MID' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 38, y: 50, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 62, y: 50, category: 'MID' },
      { id: 'rm', position: 'RM', label: 'RM', x: 85, y: 48, category: 'MID' },
      { id: 'lw', position: 'LW', label: 'LW', x: 20, y: 20, category: 'FWD' },
      { id: 'st', position: 'ST', label: 'ST', x: 50, y: 15, category: 'FWD' },
      { id: 'rw', position: 'RW', label: 'RW', x: 80, y: 20, category: 'FWD' },
    ]
  },
  {
    id: '5-4-1',
    name: '5-4-1',
    category: 'Defensive',
    description: 'Ultra defensive wall designed to absorb relentless pressure.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lwb', position: 'LWB', label: 'LWB', x: 12, y: 68, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 30, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 50, y: 77, category: 'DEF' },
      { id: 'cb3', position: 'CB', label: 'CB', x: 70, y: 75, category: 'DEF' },
      { id: 'rwb', position: 'RWB', label: 'RWB', x: 88, y: 68, category: 'DEF' },
      { id: 'lm', position: 'LM', label: 'LM', x: 18, y: 46, category: 'MID' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 38, y: 48, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 62, y: 48, category: 'MID' },
      { id: 'rm', position: 'RM', label: 'RM', x: 82, y: 46, category: 'MID' },
      { id: 'st', position: 'ST', label: 'ST', x: 50, y: 18, category: 'FWD' },
    ]
  },
  {
    id: '4-5-1',
    name: '4-5-1',
    category: 'Midfield Heavy',
    description: 'Midfield density to dominate possession and frustrate opposition.',
    slots: [
      { id: 'gk', position: 'GK', label: 'GK', x: 50, y: 88, category: 'GK' },
      { id: 'lb', position: 'LB', label: 'LB', x: 15, y: 72, category: 'DEF' },
      { id: 'cb1', position: 'CB', label: 'CB', x: 38, y: 75, category: 'DEF' },
      { id: 'cb2', position: 'CB', label: 'CB', x: 62, y: 75, category: 'DEF' },
      { id: 'rb', position: 'RB', label: 'RB', x: 85, y: 72, category: 'DEF' },
      { id: 'lm', position: 'LM', label: 'LM', x: 15, y: 44, category: 'MID' },
      { id: 'cm1', position: 'CM', label: 'CM', x: 34, y: 48, category: 'MID' },
      { id: 'cm2', position: 'CM', label: 'CM', x: 50, y: 52, category: 'MID' },
      { id: 'cm3', position: 'CM', label: 'CM', x: 66, y: 48, category: 'MID' },
      { id: 'rm', position: 'RM', label: 'RM', x: 85, y: 44, category: 'MID' },
      { id: 'st', position: 'ST', label: 'ST', x: 50, y: 18, category: 'FWD' },
    ]
  }
];

export const getFormationById = (id: string): Formation => {
  return FORMATIONS.find((f) => f.id === id) || FORMATIONS[0];
};

/**
 * Checks if a player can play in a specific target position.
 * Returns true if target matches primary or secondary positions.
 */
export const canPlayerPlayPosition = (
  primary: string,
  secondaries: string[] = [],
  targetPos: string,
  isGK: boolean
): boolean => {
  if (targetPos === 'GK') return isGK;
  if (isGK && targetPos !== 'GK') return false;

  if (primary === targetPos) return true;
  if (secondaries.includes(targetPos as any)) return true;

  // Flexible secondary mappings for general position similarity (e.g., LB <-> LWB, ST <-> CF, LW <-> LM)
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
  return allowed.includes(targetPos);
};
