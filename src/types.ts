/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ElementType = 'Fire' | 'Water' | 'Ground' | 'Electric' | 'Ghost';

export interface Pokemon {
  name: string;
  dexId: number;
  imageUrl: string;
}

export interface ElementTypeRecord {
  type: ElementType;
  label: string;
  color: string;     // Tailwind classes or hex colors for styling
  borderColor: string;
  bgColor: string;
  textColor: string;
  badgeStyle: string;
  pokemonList: Pokemon[];
  strengths: ElementType[];
  description: string;
}

export type GamePhase = 'selection' | 'matchup_reveal' | 'winner_celebration' | 'goodbye';

export interface GameRoundState {
  phase: GamePhase;
  userType: ElementType | null;
  systemType: ElementType | null;
  userPokemon: Pokemon | null;
  systemPokemon: Pokemon | null;
  winner: 'user' | 'system' | null;
}
