import React, { useEffect } from 'react';
import { Clock, BookOpen, Sparkles, Pause, Play } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { DAYS_CONFIG } from '../../data/daysConfig';

export const GameHeader: React.FC = () => {
  const { currentDay, dayCoins, timeLeft, tickTimer, toggleRecipeBook, status, isPaused, togglePause } = useGameStore();
  const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];

  useEffect(() => {
    if (status !== 'PLAYING') return;
    const interval = setInterval(() => {
      tickTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [status, tickTimer]);

  const progressPercent = Math.min(100, Math.round((dayCoins / config.targetCoins) * 100));

  return (
    <div className="w-full bg-white/85 backdrop-blur-md px-4 py-2.5 border-b-2 border-cozy-blush/60 shadow-soft flex items-center justify-between">
      {/* Day Badge & Recipe Book */}
      <div className="flex items-center gap-2">
        <div className="bg-gradient-to-r from-cozy-babyPink to-cozy-blush text-cozy-espresso px-2.5 py-1 rounded-xl text-xs font-black shadow-xs flex items-center gap-1 border border-white">
          <Sparkles size={12} className="text-cozy-choco" />
          <span>Hari {currentDay}</span>
        </div>

        <button
          onClick={toggleRecipeBook}
          className="p-1.5 rounded-xl bg-cozy-cream hover:bg-cozy-babyPink/60 text-cozy-choco transition-all active:scale-95 border border-cozy-blush/50"
          title="Buku Resep"
        >
          <BookOpen size={14} />
        </button>
      </div>

      {/* Target Coins Progress */}
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-1 text-xs font-black text-cozy-espresso">
          <span className="text-amber-500">🪙</span>
          <span>{dayCoins}</span>
          <span className="text-cozy-choco/50 font-normal">/ {config.targetCoins}</span>
        </div>
        {/* Cute pastel progress bar */}
        <div className="w-20 h-1.5 bg-cozy-cream rounded-full overflow-hidden border border-cozy-blush/40 mt-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Timer & Pause Button */}
      <div className="flex items-center gap-1.5">
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-black transition-colors ${
            timeLeft <= 10
              ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
              : 'bg-cozy-cream text-cozy-espresso border border-cozy-babyPink/60'
          }`}
        >
          <Clock size={13} />
          <span>{timeLeft}s</span>
        </div>

        {status === 'PLAYING' && (
          <button
            onClick={togglePause}
            className={`p-1.5 rounded-xl border transition-all active:scale-90 cursor-pointer shadow-xs ${
              isPaused
                ? 'bg-amber-400 text-white border-amber-500'
                : 'bg-cozy-cream hover:bg-cozy-babyPink/60 text-cozy-choco border-cozy-blush/60'
            }`}
            title={isPaused ? "Lanjut (Resume)" : "Jeda (Pause)"}
          >
            {isPaused ? <Play size={13} className="fill-current" /> : <Pause size={13} />}
          </button>
        )}
      </div>
    </div>
  );
};
