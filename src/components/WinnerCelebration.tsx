/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ElementType, Pokemon } from '../types';
import { ELEMENTS_DATA } from '../data/pokemon';
import { Award, ShieldAlert, RotateCcw, LogOut, Flame, Droplet, Mountain, Zap, Ghost, Scale } from 'lucide-react';
import { audioSynth } from '../utils/audio';

const TYPE_ICONS: Record<ElementType, React.ComponentType<{ className?: string }>> = {
  Fire: Flame,
  Water: Droplet,
  Ground: Mountain,
  Electric: Zap,
  Ghost: Ghost,
};

interface WinnerCelebrationProps {
  userType: ElementType;
  systemType: ElementType;
  userPokemon: Pokemon;
  systemPokemon: Pokemon;
  winner: 'user' | 'system';
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function WinnerCelebration({
  userType,
  systemType,
  userPokemon,
  systemPokemon,
  winner,
  onPlayAgain,
  onExit,
}: WinnerCelebrationProps) {
  const isUserWinner = winner === 'user';
  const winningPokemon = isUserWinner ? userPokemon : systemPokemon;
  const losingPokemon = isUserWinner ? systemPokemon : userPokemon;

  const winnerType = isUserWinner ? userType : systemType;
  const loserType = isUserWinner ? systemType : userType;

  const winnerRecord = ELEMENTS_DATA[winnerType];
  const loserRecord = ELEMENTS_DATA[loserType];

  const WinnerIcon = TYPE_ICONS[winnerType];
  const LoserIcon = TYPE_ICONS[loserType];

  // Play corresponding audio results when entering evaluation result state page
  useEffect(() => {
    if (isUserWinner) {
      audioSynth.cueVictory();
    } else {
      audioSynth.cueDefeat();
    }
  }, [isUserWinner]);

  // Particle tracking parameters for celebration floating animation
  const floatImageVariants = {
    initial: {
      y: '105vh',
      x: '0vw',
      scale: 0.65,
      opacity: 0,
      rotate: -15,
    },
    animate: {
      y: '-115vh',
      x: ['0vw', '-8vw', '8vw', '-4vw', '4vw', '0vw'],
      scale: 1.3,
      opacity: [0, 1, 1, 1, 1, 0.7, 0],
      rotate: [-15, 12, -10, 8, -5, 0],
      transition: {
        duration: 5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 relative">
      
      {/* FLOAT ANIMATION CONTAINER */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          <motion.div
            variants={floatImageVariants}
            initial="initial"
            animate="animate"
            className="absolute left-[38%] sm:left-[45%] flex flex-col items-center justify-center p-4 bg-[#161B22]/95 border border-[#30363D] backdrop-blur-md rounded-2xl shadow-2xl w-48 h-48"
            style={{
              boxShadow: isUserWinner 
                ? '0 0 50px rgba(16,185,129,0.3)' 
                : '0 0 50px rgba(239,68,68,0.3)'
            }}
          >
            {/* Visual shine ring */}
            <div className={`absolute inset-2 rounded-xl border border-dashed pointer-events-none opacity-20`} style={{ borderColor: winnerRecord.color }} />
            
            <img
              src={winningPokemon.imageUrl}
              alt={winningPokemon.name}
              className="w-36 h-36 object-contain filter drop-shadow-xl z-10"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-3 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300 font-bold px-3 py-1 rounded-full uppercase tracking-widest z-20">
              {winningPokemon.name} • VICTOR
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Board Certificate */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bento-card border border-zinc-800 rounded-xl overflow-hidden shadow-xl"
      >
        {/* Certificate Frame Header */}
        <div className="bg-zinc-950 border-b border-zinc-850 py-5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-zinc-500" />
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase font-bold">
              Official Bureau Verdict
            </span>
          </div>
          <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-450 font-mono px-2.5 py-1 rounded uppercase tracking-wider">
            Case Ref: #PL-7301
          </span>
        </div>

        {/* Certificate Inner Body */}
        <div className="p-8 sm:p-12 text-center flex flex-col items-center">
          {/* Main Badge */}
          <div className="mb-6 animate-pulse">
            {isUserWinner ? (
              <div className="relative inline-flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg">
                  <Award className="w-8 h-8 stroke-[1.5]" />
                </div>
                {/* Micro sparks */}
                <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg">
                <ShieldAlert className="w-8 h-8 stroke-[1.5]" />
              </div>
            )}
          </div>

          {/* Outcome Declarative Statement */}
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#eab308]">
            Arbitrage Phase Verdict Realized
          </span>
          
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2 uppercase">
            {isUserWinner ? 'User Won The Round' : 'System Won The Round'}
          </h1>

          <div className="my-6 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            The tribunal declares the {isUserWinner ? 'User (Representative 01)' : 'System (Representative 02)'} victorious. 
            The designated champion <strong className="text-white font-bold">{winningPokemon.name} ({winnerType})</strong> has demonstrated categorical dominance 
            over the defender <strong className="text-zinc-350 font-semibold">{losingPokemon.name} ({loserType})</strong> under type matchup parameters.
          </div>

          {/* Dynamic Matchup Duel Visualizers */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 w-full my-6 max-w-lg">
            
            {/* Winner Badge Mini */}
            <div className="flex-1 w-full bg-zinc-950/40 border border-zinc-800/80 p-4 rounded-xl flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-lg text-white flex items-center justify-center bg-zinc-900 border border-zinc-800"
                style={{ color: winnerRecord.color }}
              >
                <WinnerIcon className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono tracking-wider font-bold text-emerald-400 uppercase block">
                  Dominant Victor
                </span>
                <span className="text-sm font-extrabold text-white">
                  {winningPokemon.name}
                </span>
                <span className="text-[10px] text-zinc-500 block font-mono">
                  {winnerType} Type
                </span>
              </div>
            </div>

            {/* Battle Connector */}
            <div className="text-zinc-500 text-[10px] font-mono uppercase font-bold tracking-widest py-1.5 px-3 border border-zinc-800/85 rounded-lg bg-zinc-900/60">
              defeated
            </div>

            {/* Loser Badge Mini */}
            <div className="flex-1 w-full bg-zinc-950/45 border border-zinc-800/85 p-4 rounded-xl flex items-center gap-3 opacity-60">
              <div 
                className="w-10 h-10 rounded-lg text-white flex items-center justify-center bg-zinc-900 border border-zinc-800"
                style={{ color: loserRecord.color }}
              >
                <LoserIcon className="w-5 h-5 stroke-[2]" />
              </div>
              <div className="text-left">
                <span className="text-[9px] font-mono tracking-wider font-bold text-red-400 uppercase block">
                  Defeated Party
                </span>
                <span className="text-sm font-bold text-zinc-300">
                  {losingPokemon.name}
                </span>
                <span className="text-[10px] text-zinc-500 block font-mono">
                  {loserType} Type
                </span>
              </div>
            </div>

          </div>

          {/* Core Matchup Matrix Legal Index Footnotes */}
          <div className="mt-4 pt-5 border-t border-zinc-800/80 w-full max-w-lg text-left">
            <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mb-2 font-mono">
              Validating Statute: MATCHUP RULEBOOK INDEX
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] text-zinc-400 font-mono">
              <div>• Fire beats Ground & Electric</div>
              <div>• Water beats Fire & Ground</div>
              <div>• Electric beats Water & Ghost</div>
              <div>• Ground beats Electric & Ghost</div>
              <div className="col-span-2">• Ghost beats Water & Fire</div>
            </div>
          </div>

        </div>

        {/* Action Prompt Segment */}
        <div className="bg-zinc-950/80 border-t border-zinc-805 py-6 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Initiate Sequential Matchup?
            </h4>
            <p className="text-[10px] text-zinc-500 uppercase tracking-wide font-mono mt-0.5">
              Authorize an immediate secondary round or retire.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onPlayAgain}
              className="px-6 py-2.5 border border-emerald-500/80 text-emerald-400 text-xs font-bold uppercase tracking-wider hover:bg-emerald-500/10 cursor-pointer transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Yes, New Round</span>
            </button>
            <button
              onClick={onExit}
              className="px-6 py-2.5 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 cursor-pointer transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>No, Exit Arena</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

