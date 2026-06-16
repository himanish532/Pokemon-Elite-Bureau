/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Shield, Flame, Droplet, Mountain, Zap, Ghost, Volume2, VolumeX } from 'lucide-react';
import { audioSynth } from '../utils/audio';

export default function Header() {
  const [muted, setMuted] = useState(audioSynth.getMuteStatus());

  const handleToggleMute = () => {
    const nextState = !muted;
    audioSynth.setMute(nextState);
    setMuted(nextState);
    if (!nextState) {
      // play a quick pleasant confirmation tone upon unmuting
      audioSynth.cueSelection();
    }
  };

  return (
    <header className="w-full border-b border-zinc-800/80 py-5 px-6 sm:px-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 bg-[#0A0C10]">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-zinc-900 border border-zinc-800 text-white rounded-lg flex items-center justify-center shadow-lg">
          <Shield className="w-6 h-6 stroke-[1.25] text-zinc-300" />
        </div>
        <div>
          <span className="text-[10px] tracking-widest text-zinc-500 uppercase font-bold block">
            CHAMPIONSHIP SERIES • ARBITRATION PANEL
          </span>
          <h1 className="text-2xl font-light tracking-tight text-zinc-300">
            POKÉMON <span className="font-extrabold text-white">ELITE BUREAU</span>
          </h1>
        </div>
      </div>

      {/* Control Segment: Jurisdictions & Mute option */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 hidden md:inline mr-2">
            Jurisdictions:
          </span>
          <div className="flex gap-1.5">
            <span className="p-1.5 bg-red-950/20 border border-red-900/40 rounded-lg text-red-400" title="Fire">
              <Flame className="w-4 h-4" />
            </span>
            <span className="p-1.5 bg-blue-950/20 border border-blue-900/40 rounded-lg text-blue-400" title="Water">
              <Droplet className="w-4 h-4" />
            </span>
            <span className="p-1.5 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-emerald-400" title="Ground">
              <Mountain className="w-4 h-4" />
            </span>
            <span className="p-1.5 bg-amber-950/20 border border-amber-900/40 rounded-lg text-amber-400" title="Electric">
              <Zap className="w-4 h-4" />
            </span>
            <span className="p-1.5 bg-purple-950/20 border border-purple-900/40 rounded-lg text-purple-400" title="Ghost">
              <Ghost className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Audio Synth Activator/Mute switch Button */}
        <button
          onClick={handleToggleMute}
          className={`p-1.5 rounded-lg border transition-all flex items-center justify-center cursor-pointer ${
            muted
              ? 'bg-red-950/20 border-red-900/40 text-red-400 hover:bg-red-900/20'
              : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
          }`}
          title={muted ? 'Unmute system synthesized sound effects' : 'Mute system synthesized sound effects'}
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}

