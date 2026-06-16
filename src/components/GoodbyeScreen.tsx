/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, LogIn } from 'lucide-react';
import { audioSynth } from '../utils/audio';

interface GoodbyeScreenProps {
  onRestart: () => void;
}

export default function GoodbyeScreen({ onRestart }: GoodbyeScreenProps) {
  const exitTime = new Date().toLocaleTimeString();

  useEffect(() => {
    // Play power down exit sweep tone
    audioSynth.cueExit();
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bento-card p-8 sm:p-12 relative overflow-hidden"
      >
        {/* Visual corner accents for high end legal look */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-zinc-700" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-zinc-700" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-zinc-700" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-zinc-700" />

        <div className="mb-6 inline-flex items-center justify-center p-3.5 bg-zinc-900 border border-zinc-800 rounded-full text-emerald-400">
          <ShieldCheck className="w-10 h-10 stroke-[1.25]" />
        </div>

        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-500 block mb-2">
          De-Registration Form Subscribed
        </span>
        
        <h1 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
          Session Terminated Successfully
        </h1>

        <div className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed max-w-md mx-auto">
          The matchup assessment pipeline has been safely disconnected. All temporary credentials, active arenas, and diagnostic matchup registers are now archived under Section XI. Thank you for utilizing the official Pokémon League Arbitration Platform.
        </div>

        {/* Mock Audit Signature Details */}
        <div className="my-8 border-t border-b border-zinc-800/80 py-4 text-left font-mono text-[10px] text-zinc-500 space-y-1">
          <div className="flex justify-between">
            <span>AUDIT STAMP:</span>
            <span className="text-zinc-400 font-bold">SECURE_CLOSE_OK</span>
          </div>
          <div className="flex justify-between">
            <span>DE-AUTHORIZATION TIME:</span>
            <span className="text-zinc-400 font-bold">{exitTime}</span>
          </div>
          <div className="flex justify-between">
            <span>PANEL COORDINATES:</span>
            <span className="text-zinc-400 font-bold">REGISTRY-ID-0937</span>
          </div>
        </div>

        <p className="text-xs text-zinc-650 italic mb-8">
          "Pristine regulations foster champion generation."
        </p>

        {/* Clean Re-login Trigger */}
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-2.5 border border-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 cursor-pointer transition-all duration-300 rounded-lg flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4 stroke-[2]" />
            <span>Re-Authorize Protocol Channel</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

