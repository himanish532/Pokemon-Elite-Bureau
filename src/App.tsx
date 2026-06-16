/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import SelectionScreen from './components/SelectionScreen';
import MatchupReveal from './components/MatchupReveal';
import WinnerCelebration from './components/WinnerCelebration';
import GoodbyeScreen from './components/GoodbyeScreen';
import { GameRoundState, ElementType } from './types';
import { determineWinner, getRandomPokemonForType, ELEMENT_TYPES, ELEMENTS_DATA } from './data/pokemon';
import { Scale, Lock, ShieldAlert } from 'lucide-react';
import HistoryDashboard, { RoundRecord } from './components/HistoryDashboard';

export default function App() {
  const [gameState, setGameState] = useState<GameRoundState>({
    phase: 'selection',
    userType: null,
    systemType: null,
    userPokemon: null,
    systemPokemon: null,
    winner: null,
  });

  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('normal');
  const [userWins, setUserWins] = useState<number>(0);
  const [systemWins, setSystemWins] = useState<number>(0);
  const [roundHistory, setRoundHistory] = useState<RoundRecord[]>([]);

  // Execute full turn computation once element is chose
  const handleSelectElementType = (selectedType: ElementType) => {
    // Determine strengths of selected type (which are weaknesses for the system)
    const userStrengths = ELEMENTS_DATA[selectedType].strengths; // e.g. If user selects Fire, userStrengths = ['Ground', 'Electric']
    const possibleOpponents = ELEMENT_TYPES.filter((t) => t !== selectedType);
    
    // Of these possible opponents, which ones win against the user (user weaknesses)?
    const userWeaknesses = possibleOpponents.filter((t) => !userStrengths.includes(t)); // e.g. If user selects Fire, userWeaknesses = ['Water', 'Ghost']

    let systemSelectedType: ElementType;

    // Apply difficulty weights to the automated selection
    if (difficulty === 'easy') {
      // 75% chance system picks a type user beats (Easy Mode)
      const fitsStrength = Math.random() < 0.75;
      const targetPool = fitsStrength ? userStrengths : userWeaknesses;
      systemSelectedType = targetPool[Math.floor(Math.random() * targetPool.length)];
    } else if (difficulty === 'hard') {
      // 75% chance system picks a type that beats the user (Hard Mode)
      const fitsWeakness = Math.random() < 0.75;
      const targetPool = fitsWeakness ? userWeaknesses : userStrengths;
      systemSelectedType = targetPool[Math.floor(Math.random() * targetPool.length)];
    } else {
      // Normal Mode: standard 50/50 fair choice
      systemSelectedType = possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)];
    }

    // 2. Select automatic Pokemon champions based on designated type
    const userChampion = getRandomPokemonForType(selectedType);
    const systemChampion = getRandomPokemonForType(systemSelectedType);

    // 3. Determine winner
    const roundWinner = determineWinner(selectedType, systemSelectedType);

    // Increment stats synchronously
    if (roundWinner === 'user') {
      setUserWins((prev) => prev + 1);
    } else if (roundWinner === 'system') {
      setSystemWins((prev) => prev + 1);
    }
    setRoundHistory((prev) => [
      ...prev,
      { winner: roundWinner, userType: selectedType, systemType: systemSelectedType },
    ]);

    // 4. Update state to trigger 5-second validation showdown
    setGameState({
      phase: 'matchup_reveal',
      userType: selectedType,
      systemType: systemSelectedType,
      userPokemon: userChampion,
      systemPokemon: systemChampion,
      winner: roundWinner,
    });
  };

  const handleRevealComplete = () => {
    setGameState((prev) => ({
      ...prev,
      phase: 'winner_celebration',
    }));
  };

  const handlePlayAgain = () => {
    setGameState({
      phase: 'selection',
      userType: null,
      systemType: null,
      userPokemon: null,
      systemPokemon: null,
      winner: null,
    });
  };

  const handleResetHistory = () => {
    setUserWins(0);
    setSystemWins(0);
    setRoundHistory([]);
  };

  const handleExit = () => {
    setGameState((prev) => ({
      ...prev,
      phase: 'goodbye',
    }));
  };

  const handleRestart = () => {
    handleResetHistory();
    handlePlayAgain();
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-zinc-300 flex flex-col font-sans select-none selection:bg-white selection:text-black">
      {/* Top Formal Authority Bar */}
      <Header />

      {/* Main Core Content Interface Stage */}
      <main className="flex-1 flex flex-col justify-center py-6">
        {gameState.phase === 'selection' && (
          <SelectionScreen
            onSelect={handleSelectElementType}
            difficulty={difficulty}
            onChangeDifficulty={setDifficulty}
          />
        )}

        {gameState.phase === 'matchup_reveal' && (
          <MatchupReveal
            userType={gameState.userType!}
            systemType={gameState.systemType!}
            userPokemon={gameState.userPokemon!}
            systemPokemon={gameState.systemPokemon!}
            onComplete={handleRevealComplete}
          />
        )}

        {gameState.phase === 'winner_celebration' && (
          <WinnerCelebration
            userType={gameState.userType!}
            systemType={gameState.systemType!}
            userPokemon={gameState.userPokemon!}
            systemPokemon={gameState.systemPokemon!}
            winner={gameState.winner!}
            onPlayAgain={handlePlayAgain}
            onExit={handleExit}
          />
        )}

        {gameState.phase === 'goodbye' && (
          <GoodbyeScreen onRestart={handleRestart} />
        )}

        {gameState.phase !== 'goodbye' && (
          <HistoryDashboard
            userWins={userWins}
            systemWins={systemWins}
            history={roundHistory}
            onReset={handleResetHistory}
          />
        )}
      </main>

      {/* Corporate Compliance footer */}
      <footer className="w-full bg-[#0A0C10] border-t border-zinc-800/80 py-4 px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[9px] text-zinc-500 font-mono uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <Scale className="w-3.5 h-3.5 text-zinc-600" />
          <span>© 2026 Pokémon League Arbitration Authority. All Rights Reserved.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-zinc-650" /> SECURE SSL CHANNEL
          </span>
          <span>STAMP ID: REG-88402</span>
        </div>
      </footer>
    </div>
  );
}
