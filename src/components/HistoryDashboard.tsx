/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ElementType } from '../types';
import { ELEMENTS_DATA } from '../data/pokemon';
import { Trophy, Activity, RefreshCw, BarChart3, AlertCircle, Flame, Droplet, Mountain, Zap, Ghost } from 'lucide-react';

const TYPE_MINI_ICONS: Record<ElementType, React.ComponentType<{ className?: string }>> = {
  Fire: Flame,
  Water: Droplet,
  Ground: Mountain,
  Electric: Zap,
  Ghost: Ghost,
};

export interface RoundRecord {
  winner: 'user' | 'system';
  userType: ElementType;
  systemType: ElementType;
}

interface HistoryDashboardProps {
  userWins: number;
  systemWins: number;
  history: RoundRecord[];
  onReset: () => void;
}

export default function HistoryDashboard({
  userWins,
  systemWins,
  history,
  onReset,
}: HistoryDashboardProps) {
  const totalRounds = userWins + systemWins;
  const userWinRate = totalRounds > 0 ? Math.round((userWins / totalRounds) * 100) : 0;
  const sysWinRate = totalRounds > 0 ? Math.round((systemWins / totalRounds) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 mt-8 w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        
        {/* Left Bento: Session Stats Counter & Win Rate Meter (7 cols) */}
        <div className="md:col-span-7 bento-card p-5 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle decoration line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-emerald-500/0 via-emerald-500/30 to-emerald-500/0" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-zinc-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  SESSION METRIC INTELLIGENCE
                </span>
              </div>
              <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-mono">
                LIVE TELEMETRY
              </span>
            </div>

            {/* Wins Split Counter columns */}
            <div className="grid grid-cols-2 gap-4 border-b border-zinc-800/60 pb-5">
              {/* User Side */}
              <div className="bg-zinc-950/30 p-3.5 rounded-lg border border-zinc-850 text-center">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block mb-1">
                  Agent (You) Wins
                </span>
                <span className="text-3xl font-extrabold font-mono text-emerald-400">
                  {userWins}
                </span>
                <span className="text-[9px] font-mono text-zinc-650 block mt-0.5">
                  RATE: {userWinRate}%
                </span>
              </div>

              {/* System Side */}
              <div className="bg-zinc-950/30 p-3.5 rounded-lg border border-zinc-850 text-center">
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase block mb-1">
                  System Wins
                </span>
                <span className="text-3xl font-extrabold font-mono text-red-400">
                  {systemWins}
                </span>
                <span className="text-[9px] font-mono text-zinc-650 block mt-0.5">
                  RATE: {sysWinRate}%
                </span>
              </div>
            </div>
          </div>

          {/* Win Rate Ratio Bar & Summary footer */}
          <div className="mt-5 space-y-3">
            <div className="flex justify-between items-center text-[10px] text-zinc-400 font-mono">
              <span className="flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-emerald-400" />
                AGENT RATIO: {userWinRate}%
              </span>
              <span>TOTAL ARBITRATIONS: {totalRounds}</span>
            </div>

            {/* Progress Ratio Track bar */}
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden flex border border-zinc-850">
              {totalRounds === 0 ? (
                <div className="w-full bg-zinc-800 h-full flex items-center justify-center font-mono text-[8px] text-zinc-600 uppercase tracking-widest">
                  No rounds registered
                </div>
              ) : (
                <>
                  <div
                    className="bg-emerald-500 h-full transition-all duration-500"
                    style={{ width: `${userWinRate}%` }}
                    title={`Agent wins: ${userWinRate}%`}
                  />
                  <div
                    className="bg-red-500 h-full transition-all duration-500"
                    style={{ width: `${sysWinRate}%` }}
                    title={`System wins: ${sysWinRate}%`}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Bento: Arbitration Log Sequence (5 cols) */}
        <div className="md:col-span-5 bento-card p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-zinc-400" />
                <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                  ARBITRATION SEQUENCER
                </span>
              </div>
              <button
                onClick={onReset}
                disabled={totalRounds === 0}
                className="text-[10px] flex items-center gap-1.5 font-mono uppercase bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 px-2 py-1 rounded transition-colors"
                title="Reset session history statistics"
              >
                <RefreshCw className="w-3 h-3 hover:rotate-180 transition-transform duration-500" />
                <span>Reset</span>
              </button>
            </div>

            {/* Timeline or log listing container */}
            <div className="mt-3 overflow-y-auto max-h-[140px] pr-1 space-y-2">
              {history.length === 0 ? (
                <div className="h-28 flex flex-col items-center justify-center border border-dashed border-zinc-850 rounded-lg text-center p-4">
                  <AlertCircle className="w-5 h-5 text-zinc-600 mb-2" />
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Registry Sequence Empty
                  </p>
                  <p className="text-[9px] text-zinc-600 font-mono mt-0.5">
                    Select types of battle to queue audit logs
                  </p>
                </div>
              ) : (
                [...history].reverse().map((round, idx) => {
                  const sequenceId = history.length - idx;
                  const isUser = round.winner === 'user';
                  const userColor = ELEMENTS_DATA[round.userType].color;
                  const systemColor = ELEMENTS_DATA[round.systemType].color;
                  const UserMiniIcon = TYPE_MINI_ICONS[round.userType];
                  const SystemMiniIcon = TYPE_MINI_ICONS[round.systemType];

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded bg-zinc-950/20 border border-zinc-850 text-[10px] font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] text-zinc-600 font-bold">
                          #{String(sequenceId).padStart(2, '0')}
                        </span>
                        
                        {/* Battle micro matchups representation */}
                        <span className="flex items-center gap-1 px-1.5 py-0.5 bg-zinc-900 rounded border border-zinc-800 text-zinc-400">
                          <UserMiniIcon className="w-3 h-3" style={{ color: userColor }} />
                          <span>v</span>
                          <SystemMiniIcon className="w-3 h-3" style={{ color: systemColor }} />
                        </span>
                      </div>

                      {/* Winner Stamp */}
                      <span
                        className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                          isUser
                            ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/10 border border-red-500/20 text-red-400'
                        }`}
                      >
                        {isUser ? 'Agent Win' : 'Sys Win'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="text-[9px] font-mono text-zinc-600 border-t border-zinc-850 pt-3 mt-4 flex justify-between">
            <span>SEQUENCE PIPELINE: STABLE</span>
            <span>OK</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
