/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementType, ElementTypeRecord, Pokemon } from '../types';

export const POKEMON_IMAGE_BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

export const ELEMENTS_DATA: Record<ElementType, ElementTypeRecord> = {
  Fire: {
    type: 'Fire',
    label: 'Flame Element',
    color: '#ef4444',
    borderColor: 'border-red-200 focus:border-red-500',
    bgColor: 'bg-red-50/50 hover:bg-red-50',
    textColor: 'text-red-700',
    badgeStyle: 'bg-red-100 text-red-800 border-red-200',
    strengths: ['Ground', 'Electric'],
    description: 'Incinerating style of combat. Highly effective against Ground and Electric systems.',
    pokemonList: [
      { name: 'Charizard', dexId: 6, imageUrl: `${POKEMON_IMAGE_BASE}/6.png` },
      { name: 'Moltres', dexId: 146, imageUrl: `${POKEMON_IMAGE_BASE}/146.png` },
      { name: 'Magmar', dexId: 126, imageUrl: `${POKEMON_IMAGE_BASE}/126.png` }
    ]
  },
  Water: {
    type: 'Water',
    label: 'Aquatic Element',
    color: '#3b82f6',
    borderColor: 'border-blue-200 focus:border-blue-500',
    bgColor: 'bg-blue-50/50 hover:bg-blue-50',
    textColor: 'text-blue-700',
    badgeStyle: 'bg-blue-100 text-blue-800 border-blue-200',
    strengths: ['Fire', 'Ground'],
    description: 'Adaptable fluid combat tactics. Counters Fire and Ground systems.',
    pokemonList: [
      { name: 'Blastoise', dexId: 9, imageUrl: `${POKEMON_IMAGE_BASE}/9.png` },
      { name: 'Gyarados', dexId: 130, imageUrl: `${POKEMON_IMAGE_BASE}/130.png` },
      { name: 'Articuno', dexId: 144, imageUrl: `${POKEMON_IMAGE_BASE}/144.png` }
    ]
  },
  Electric: {
    type: 'Electric',
    label: 'Voltage Element',
    color: '#eab308',
    borderColor: 'border-amber-200 focus:border-amber-500',
    bgColor: 'bg-amber-50/50 hover:bg-amber-50',
    textColor: 'text-amber-700',
    badgeStyle: 'bg-amber-100 text-amber-800 border-amber-200',
    strengths: ['Water', 'Ghost'],
    description: 'High frequency particle surges. Powers past Water and Ghost defensive screens.',
    pokemonList: [
      { name: 'Zapdos', dexId: 145, imageUrl: `${POKEMON_IMAGE_BASE}/145.png` },
      { name: 'Electabuzz', dexId: 125, imageUrl: `${POKEMON_IMAGE_BASE}/125.png` },
      { name: 'Jolteon', dexId: 135, imageUrl: `${POKEMON_IMAGE_BASE}/135.png` }
    ]
  },
  Ground: {
    type: 'Ground',
    label: 'Terrestrial Element',
    color: '#84cc16',
    borderColor: 'border-lime-200 focus:border-lime-500',
    bgColor: 'bg-lime-50/50 hover:bg-lime-50',
    textColor: 'text-lime-700',
    badgeStyle: 'bg-lime-100 text-lime-800 border-lime-200',
    strengths: ['Electric', 'Ghost'],
    description: 'Solid mineral-based stability. Dampens or grounds Electric and Ghost currents.',
    pokemonList: [
      { name: 'Venusaur', dexId: 3, imageUrl: `${POKEMON_IMAGE_BASE}/3.png` },
      { name: 'Bayleef', dexId: 153, imageUrl: `${POKEMON_IMAGE_BASE}/153.png` },
      { name: 'Sceptile', dexId: 254, imageUrl: `${POKEMON_IMAGE_BASE}/254.png` }
    ]
  },
  Ghost: {
    type: 'Ghost',
    label: 'Spectral Element',
    color: '#a855f7',
    borderColor: 'border-purple-200 focus:border-purple-500',
    bgColor: 'bg-purple-50/50 hover:bg-purple-50',
    textColor: 'text-purple-700',
    badgeStyle: 'bg-purple-100 text-purple-800 border-purple-200',
    strengths: ['Water', 'Fire'],
    description: 'Ethereal non-material combat. Bypasses Water forces and extinguishes Fire systems.',
    pokemonList: [
      { name: 'Gengar', dexId: 94, imageUrl: `${POKEMON_IMAGE_BASE}/94.png` },
      { name: 'Gastly', dexId: 92, imageUrl: `${POKEMON_IMAGE_BASE}/92.png` },
      { name: 'Haunter', dexId: 93, imageUrl: `${POKEMON_IMAGE_BASE}/93.png` }
    ]
  }
};

export const ELEMENT_TYPES: ElementType[] = ['Fire', 'Water', 'Ground', 'Electric', 'Ghost'];

/**
 * Computes the winner between user and system based on element type
 */
export function determineWinner(userType: ElementType, systemType: ElementType): 'user' | 'system' {
  const userRecord = ELEMENTS_DATA[userType];
  if (userRecord.strengths.includes(systemType)) {
    return 'user';
  }
  return 'system';
}

/**
 * Helper to select a random Pokémon for an element type
 */
export function getRandomPokemonForType(type: ElementType): Pokemon {
  const pokemonList = ELEMENTS_DATA[type].pokemonList;
  const randomIndex = Math.floor(Math.random() * pokemonList.length);
  return pokemonList[randomIndex];
}
