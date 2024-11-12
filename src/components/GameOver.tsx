import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import type { Country, GameStats } from '../types/country';
import ShareButton from './ShareButton';
import ScoreDisplay from './ScoreDisplay';

interface GameOverProps {
  won: boolean;
  country: Country;
  stats: GameStats;
  onRestart: () => void;
  onClose: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ won, country, stats, onRestart, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
    >
      <div className="bg-gray-800 rounded-lg p-6 max-w-6xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-4 text-center lg:text-left">
              {won ? '🎉 Congratulations!' : '😔 Game Over'}
            </h2>
            
            <div className="text-3xl font-bold mb-6 text-center lg:text-left text-blue-400">
              {country.name}
            </div>

            <ScoreDisplay score={stats.score} className="justify-center lg:justify-start mb-6" />
            
            <div className="space-y-2 mb-6">
              <p className="text-gray-300 text-lg">Country details:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-400">
                <li className="text-lg">Capital: {country.capital}</li>
                <li className="text-lg">Population: {new Intl.NumberFormat().format(country.population)}</li>
                <li className="text-lg">Main Export: {country.mainExport}</li>
                <li className="text-lg">Fun Fact: {country.funFact}</li>
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <img 
                src={country.flag} 
                alt={`${country.name} flag`}
                className="w-32 h-auto rounded-md shadow-lg"
              />
              <img 
                src={`https://vemaps.com/uploads/img/large/${country.code.toLowerCase()}-01.jpg`}
                alt={`${country.name} map`}
                className="w-32 h-auto rounded-md shadow-lg"
              />
            </div>
          </div>

          <div className="lg:w-64 space-y-4">
            <button
              onClick={onRestart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Play Again
            </button>

            <ShareButton stats={stats} countryName={country.name} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GameOver;