/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ElementType, Pokemon } from '../types';
import { ELEMENTS_DATA } from '../data/pokemon';
import { Flame, Droplet, Mountain, Zap, Ghost, Loader2 } from 'lucide-react';
import { audioSynth } from '../utils/audio';

const TYPE_ICONS: Record<ElementType, React.ComponentType<{ className?: string }>> = {
  Fire: Flame,
  Water: Droplet,
  Ground: Mountain,
  Electric: Zap,
  Ghost: Ghost,
};

interface MatchupRevealProps {
  userType: ElementType;
  systemType: ElementType;
  userPokemon: Pokemon;
  systemPokemon: Pokemon;
  onComplete: () => void;
}

const STATUS_TEXTS = [
  'Establishing secure battle matrix channel...',
  'Resolving thermodynamic temperature parameters...',
  'Executing standard elemental boundary validations...',
  'Summoning certified Pokemon league models...',
  'Evaluating competitive dominance parameters...',
];

export default function MatchupReveal({
  userType,
  systemType,
  userPokemon,
  systemPokemon,
  onComplete,
}: MatchupRevealProps) {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [statusMessage, setStatusMessage] = useState(STATUS_TEXTS[0]);

  useEffect(() => {
    // Progress messages based on the timer countdown
    const textIndex = Math.max(0, 5 - secondsLeft);
    if (STATUS_TEXTS[textIndex]) {
      setStatusMessage(STATUS_TEXTS[textIndex]);
    }
    // Play a mechanical sound on progress tick
    audioSynth.cueMatchupProgress();
  }, [secondsLeft]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  const userRecord = ELEMENTS_DATA[userType];
  const systemRecord = ELEMENTS_DATA[systemType];

  const UserIcon = TYPE_ICONS[userType];
  const SystemIcon = TYPE_ICONS[systemType];

  // Percentage of progress completed
  const progressPercent = ((5 - secondsLeft) / 5) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Simulation Header */}
      <div className="text-center mb-8">
        <span className="text-[10px] font-mono font-bold tracking-widest text-[#eab308] bg-[#eab308]/10 border border-[#eab308]/20 px-3 py-1 rounded uppercase">
          Matchup Verification Underway
        </span>
        <h2 className="text-lg font-bold text-white mt-3 tracking-wider">
          ARBITRATION SESSION CODE #G-200
        </h2>
        <p className="text-xs text-zinc-500 mt-1">
          Authorized match assessment in progress. Verification complete in {secondsLeft} seconds.
        </p>
      </div>

      {/* Main Duel Showdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-6 items-center my-8">
        {/* User Representative */}
        <div className="md:col-span-5 bento-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase">
              REPRESENTATIVE 01 (YOU)
            </span>
          </div>

          <div 
            className="flex items-center gap-3 p-3 rounded-lg mb-6 border"
            style={{ 
              backgroundColor: `${userRecord.color}10`, 
              borderColor: `${userRecord.color}33` 
            }}
          >
            <div 
              className="p-2 rounded-md text-white flex items-center justify-center shadow-md bg-zinc-900 border border-zinc-800"
              style={{ color: userRecord.color }}
            >
              <UserIcon className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wide">
                {userType} Type
              </h4>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                {userRecord.label}
              </span>
            </div>
          </div>

          {/* Autoselected Pokemon Preview */}
          <div className="flex flex-col items-center py-4 bg-zinc-950/40 border border-zinc-850 rounded-lg relative overflow-hidden">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              src={userPokemon.imageUrl} 
              alt={userPokemon.name} 
              className="w-36 h-36 object-contain z-10 filter drop-shadow-md"
              referrerPolicy="no-referrer"
            />
            
            <span className="text-[9px] font-mono text-zinc-500 mt-2 z-10 uppercase tracking-widest">
              NATIONAL DEX #{userPokemon.dexId}
            </span>
            <h3 className="text-white font-extrabold uppercase tracking-wider text-base z-10-mt-0.5">
              {userPokemon.name}
            </h3>
          </div>
        </div>

        {/* VERSUS Divider */}
        <div className="md:col-span-1 flex flex-col items-center justify-center my-4 md:my-0">
          <div className="relative flex items-center justify-center">
            {/* Elegant Ring Loader */}
            <div className="w-14 h-14 rounded-full border-4 border-zinc-800 border-t-white animate-spin flex items-center justify-center" />
            <span className="absolute text-[11px] font-bold font-mono text-white">
              VS
            </span>
          </div>
        </div>

        {/* System Representative */}
        <div className="md:col-span-5 bento-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[9px] font-bold font-mono tracking-widest text-zinc-500 uppercase">
              REPRESENTATIVE 02 (SYSTEM)
            </span>
          </div>

          <div 
            className="flex items-center gap-3 p-3 rounded-lg mb-6 border"
            style={{ 
              backgroundColor: `${systemRecord.color}10`, 
              borderColor: `${systemRecord.color}33` 
            }}
          >
            <div 
              className="p-2 rounded-md text-white flex items-center justify-center shadow-md bg-zinc-900 border border-zinc-800"
              style={{ color: systemRecord.color }}
            >
              <SystemIcon className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white uppercase tracking-wide">
                {systemType} Type
              </h4>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                {systemRecord.label}
              </span>
            </div>
          </div>

          {/* Autoselected Pokemon Preview */}
          <div className="flex flex-col items-center py-4 bg-zinc-950/40 border border-zinc-850 rounded-lg relative overflow-hidden">
            <motion.img 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              src={systemPokemon.imageUrl} 
              alt={systemPokemon.name} 
              className="w-36 h-36 object-contain z-10 filter drop-shadow-md"
              referrerPolicy="no-referrer"
            />
            
            <span className="text-[9px] font-mono text-zinc-500 mt-2 z-10 uppercase tracking-widest">
              NATIONAL DEX #{systemPokemon.dexId}
            </span>
            <h3 className="text-white font-extrabold uppercase tracking-wider text-base z-10 mt-0.5">
              {systemPokemon.name}
            </h3>
          </div>
        </div>
      </div>

      {/* Progress Calibration Board */}
      <div className="bento-card p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] font-mono font-medium text-zinc-400 flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
            {statusMessage}
          </span>
          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
            {Math.floor(progressPercent)}% RESOLVED
          </span>
        </div>

        {/* broad progress bar background */}
        <div className="w-full bg-zinc-900 h-1 rounded-full overflow-hidden border border-zinc-800/60">
          <motion.div 
            className="bg-emerald-500 h-full rounded-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>

        {/* Footer legalities */}
        <p className="text-[9px] text-zinc-600 text-center mt-3 font-mono uppercase tracking-widest">
          Secured with PokeArbitrage Verification standards v2.0
        </p>
      </div>
    </div>
  );
}

