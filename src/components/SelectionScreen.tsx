/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ElementType, ElementTypeRecord } from '../types';
import { ELEMENTS_DATA, ELEMENT_TYPES } from '../data/pokemon';
import { Flame, Droplet, Mountain, Zap, Ghost, Swords, Check } from 'lucide-react';
import { audioSynth } from '../utils/audio';

const TYPE_ICONS: Record<ElementType, React.ComponentType<{ className?: string }>> = {
  Fire: Flame,
  Water: Droplet,
  Ground: Mountain,
  Electric: Zap,
  Ghost: Ghost,
};

interface SelectionScreenProps {
  onSelect: (type: ElementType) => void;
  difficulty: 'easy' | 'normal' | 'hard';
  onChangeDifficulty: (lvl: 'easy' | 'normal' | 'hard') => void;
}

export default function SelectionScreen({
  onSelect,
  difficulty,
  onChangeDifficulty,
}: SelectionScreenProps) {
  const [hoveredType, setHoveredType] = useState<ElementType | null>(null);
  const [selectedType, setSelectedType] = useState<ElementType | null>(null);

  const handleCardClick = (type: ElementType) => {
    setSelectedType(type);
    audioSynth.cueSelection();
  };

  const handleSubmit = () => {
    if (selectedType) {
      audioSynth.cueSelection();
      onSelect(selectedType);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-6">
      
      {/* 2-Column top bento section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Introduction Dossier Panel (Bento) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-8 p-6 bento-card flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-white rounded-lg shrink-0">
                <Swords className="w-5 h-5 stroke-[1.5] text-zinc-300" />
              </div>
              <div>
                <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-500 uppercase block">
                  MODULE STATUS: ONLINE
                </span>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  SECTION I: COMBATANT TYPE DESIGNATION
                </h2>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal mt-2">
              Select one of the five primary elemental divisions below as your combat archetype. Once your choice is finalized, the system will instantly summon an opposing archetype (excluding your choice). A random champion from your designated type pool will be authorized for combat automatically.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>READY STATE: TRUE</span>
            <span>ENCRYPTION: AES-256</span>
          </div>
        </motion.div>

        {/* Right: Tactical Rules Info Panel (Bento) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="lg:col-span-4 p-6 bento-card flex flex-col justify-between"
        >
          <div>
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-3">
              TACTICAL MATCHUP LAWS
            </h3>
            <div className="text-[11px] space-y-1.5 font-mono text-zinc-400">
              <p><strong className="text-red-400">Fire</strong> beats Ground, Electric</p>
              <p><strong className="text-blue-400">Water</strong> beats Fire, Ground</p>
              <p><strong className="text-amber-400">Electric</strong> beats Water, Ghost</p>
              <p><strong className="text-emerald-400">Ground</strong> beats Electric, Ghost</p>
              <p><strong className="text-purple-400">Ghost</strong> beats Water, Fire</p>
            </div>

            {/* Arbitration Bias / Difficulty Calibrator */}
            <div className="mt-5 pt-4 border-t border-zinc-800/80">
              <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2.5 font-mono">
                ARBITRATION BIAS (DIFFICULTY)
              </h3>
              <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-lg border border-zinc-800/60">
                {(['easy', 'normal', 'hard'] as const).map((lvl) => {
                  const isActive = difficulty === lvl;
                  const activeStyle = {
                    easy: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
                    normal: 'text-amber-400 border-amber-500/20 bg-amber-500/10',
                    hard: 'text-red-400 border-red-500/20 bg-red-500/10',
                  };
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => {
                        onChangeDifficulty(lvl);
                        audioSynth.cueSelection();
                      }}
                      className={`py-1.5 px-1.5 rounded-md text-[9px] font-mono font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                        isActive
                          ? `${activeStyle[lvl]} border`
                          : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
              <p className="text-[9px] text-zinc-500 font-mono mt-2 leading-normal">
                {difficulty === 'easy' && '★ Easy: System is biased to select a vulnerable matchup (75% success probability).'}
                {difficulty === 'normal' && '★ Normal: Automated matching is randomized with equal 50/50 probability.'}
                {difficulty === 'hard' && '★ Hard: System actively counters user choice (75% pressure probability).'}
              </p>
            </div>
          </div>

          <div className="bg-black/30 border border-zinc-800/80 rounded p-2.5 mt-4 font-mono text-[9px] text-emerald-500/80 leading-tight">
            ROOT@PKMN:~$ SYSTEM_INTEL_READY<br />
            DIFFICULTY_BIAS: {difficulty.toUpperCase()}<br />
            AWAITING_CHAMPION_SELECTION...
          </div>
        </motion.div>

      </div>

      {/* Grid of Element Types (Bento Card Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
        {ELEMENT_TYPES.map((type, index) => {
          const record = ELEMENTS_DATA[type];
          const IconComponent = TYPE_ICONS[type];
          const isSelected = selectedType === type;

          return (
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              onMouseEnter={() => setHoveredType(type)}
              onMouseLeave={() => setHoveredType(null)}
              onClick={() => handleCardClick(type)}
              className={`cursor-pointer group flex flex-col justify-between p-5 rounded-xl border transition-all relative overflow-hidden bento-card ${
                isSelected
                  ? 'border-white/85 bg-zinc-900/90 shadow-lg shadow-white/[0.02]'
                  : 'border-zinc-805 bg-zinc-950/40 hover:border-zinc-700'
              }`}
            >
              {/* Colored left bar highlight to give element feel */}
              <div 
                className="absolute left-0 top-0 bottom-0 w-1 transition-opacity" 
                style={{ backgroundColor: record.color, opacity: isSelected ? 1 : 0.4 }}
              />

              <div className="pl-1">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="p-2.5 rounded-lg flex items-center justify-center border"
                    style={{
                      borderColor: `${record.color}33`,
                      backgroundColor: `${record.color}15`,
                      color: record.color,
                    }}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-black stroke-[3.5]" />
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-white text-sm tracking-wide uppercase">
                  {type}
                </h3>
                <span className="text-[9px] text-zinc-500 font-mono tracking-widest block mb-2 uppercase">
                  {record.label}
                </span>

                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-snug">
                  {record.description}
                </p>
              </div>

              {/* Authorized Pokemon Tag */}
              <div className="mt-5 pt-3 border-t border-zinc-800/80 pl-1">
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-1">
                  Summon Candidates:
                </span>
                <div className="text-[10.5px] text-zinc-400 space-y-0.5 font-mono">
                  {record.pokemonList.map((pokemon) => (
                    <div key={pokemon.name} className="flex justify-between items-center text-zinc-400 hover:text-zinc-300">
                      <span>{pokemon.name}</span>
                      <span className="text-[9px] text-zinc-600 font-mono">#{pokemon.dexId}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Row showing selected archetype rules sheet */}
      {selectedType && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 bento-card relative overflow-hidden"
        >
          {/* Subtle neon bottom glow */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 blur-xs transition-opacity" 
            style={{ backgroundColor: ELEMENTS_DATA[selectedType].color }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[9px] uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded font-mono tracking-widest">
                  VALIDATION SPECIFICATION
                </span>
                <span className="text-xs text-zinc-500 font-semibold font-mono">
                  Type: {selectedType}
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Matchup Dominance Matrix
              </h3>
              <p className="text-xs text-zinc-400 max-w-2xl leading-relaxed">
                By selecting {selectedType}, your champion will automatically hold standard tactical superiority over opponents of type{' '}
                <strong className="text-white font-semibold">{ELEMENTS_DATA[selectedType].strengths.join(' and ')}</strong>. No other combinations grant victory.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:self-center">
              {ELEMENTS_DATA[selectedType].strengths.map((strType) => {
                const strRecord = ELEMENTS_DATA[strType];
                const StrIcon = TYPE_ICONS[strType];
                return (
                  <div
                    key={strType}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${strRecord.color}15`,
                      borderColor: `${strRecord.color}44`,
                      color: strRecord.color,
                    }}
                  >
                    <StrIcon className="w-3.5 h-3.5" />
                    <span>Superior to {strType}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Action triggers */}
      <div className="flex flex-col items-center justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedType}
          className={`px-8 py-3.5 rounded-lg text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 shadow-md ${
            selectedType
              ? 'bg-white hover:bg-zinc-200 text-black cursor-pointer'
              : 'bg-zinc-900/60 text-zinc-600 border border-zinc-800/80 cursor-not-allowed'
          }`}
        >
          {selectedType ? `Initialize Matchup Assessment (${selectedType})` : `Please select an archetype`}
        </button>
        <span className="text-[9px] text-zinc-600 uppercase font-mono tracking-widest mt-3">
          SECURE SIMULATION CHANNEL 93-B
        </span>
      </div>
    </div>
  );
}

