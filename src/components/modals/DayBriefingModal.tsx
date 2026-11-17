import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, Clock, Unlock, ArrowLeft } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { DAYS_CONFIG } from '../../data/daysConfig';

export const DayBriefingModal: React.FC = () => {
  const { currentDay, startPlayingDay, returnToTitle } = useGameStore();
  const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[320px] bg-[#FFF8E7] rounded-3xl p-5 border-4 border-cozy-babyPink shadow-cozy text-cozy-espresso flex flex-col items-center text-center"
      >
        {/* Morning Sun Icon */}
        <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-soft -mt-9 mb-2">
          ☀️
        </div>

        <div className="text-xs font-black uppercase tracking-wider text-cozy-choco/60">
          Persiapan Buka Toko
        </div>
        <h2 className="text-xl font-black text-cozy-espresso mt-0.5">
          Hari {currentDay}: {config.title}
        </h2>

        {/* Story note */}
        <p className="text-xs text-cozy-choco/80 mt-2 bg-white/70 p-2.5 rounded-xl border border-cozy-blush/40 leading-relaxed italic">
          "{config.storyNote}"
        </p>

        {/* Target Info */}
        <div className="w-full grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="bg-white/80 p-2 rounded-xl border border-cozy-babyPink flex flex-col items-center">
            <span className="flex items-center gap-1 font-bold text-amber-600">
              <Target size={13} /> Target Koin
            </span>
            <span className="text-base font-black text-cozy-espresso mt-0.5">
              {config.targetCoins} 🪙
            </span>
          </div>

          <div className="bg-white/80 p-2 rounded-xl border border-cozy-babyPink flex flex-col items-center">
            <span className="flex items-center gap-1 font-bold text-blue-600">
              <Clock size={13} /> Waktu
            </span>
            <span className="text-base font-black text-cozy-espresso mt-0.5">
              {config.timeLimitSeconds} Detik
            </span>
          </div>
        </div>

        {/* Unlocked Highlights */}
        <div className="w-full mt-3 bg-white/60 p-2 rounded-xl border border-cozy-blush/40 text-left">
          <div className="text-[10px] font-bold text-cozy-choco/70 flex items-center gap-1 mb-1">
            <Unlock size={11} /> Menu Tersedia Hari Ini:
          </div>
          <div className="flex flex-wrap gap-1 text-[11px] font-bold">
            {config.unlockedBases.map(b => (
              <span key={b} className="px-1.5 py-0.5 bg-amber-100 text-amber-900 rounded-md">
                {b === 'MILK_TEA' ? '🧋 Milk Tea' : '🍵 Matcha'}
              </span>
            ))}
            {config.unlockedFoams.map(f => (
              <span key={f} className="px-1.5 py-0.5 bg-pink-100 text-pink-900 rounded-md">
                {f === 'ORIGINAL_FOAM' ? '🥛 Ori Foam' : f === 'UBE_FOAM' ? '🍠 Ube Foam' : '🍓 Strawb. Foam'}
              </span>
            ))}
            {config.unlockedSnacks.map(s => (
              <span key={s} className="px-1.5 py-0.5 bg-yellow-100 text-yellow-900 rounded-md">
                {s === 'CHEESECAKE' ? '🍰 Cheesecake' : s === 'CHOCO_COOKIE' ? '🍪 Choco Cookie' : '🍵🍪 Matcha Cookie'}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full mt-4 flex flex-col gap-2">
          <button
            onClick={startPlayingDay}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cozy-choco to-[#8B5A3C] text-white font-extrabold text-sm shadow-md hover:brightness-110 active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Sparkles size={16} />
            <span>Buka Kafe Sekarang! ✨</span>
          </button>

          <button
            onClick={returnToTitle}
            className="w-full py-2.5 rounded-2xl bg-white/70 hover:bg-white text-cozy-choco/80 hover:text-cozy-espresso font-bold text-xs border border-cozy-blush/60 shadow-xs active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Kembali ke Menu Utama</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
