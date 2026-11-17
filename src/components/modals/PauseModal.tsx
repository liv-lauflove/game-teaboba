import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, BookOpen, Home, X, Coffee } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const PauseModal: React.FC = () => {
  const { isPaused, resumeGame, retryDay, toggleRecipeBook, goToTitle, currentDay } = useGameStore();

  if (!isPaused) return null;

  return (
    <AnimatePresence>
      <div className="absolute inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative w-full max-w-[310px] bg-[#FFF8E7] rounded-3xl p-5 border-4 border-cozy-babyPink shadow-cozy text-cozy-espresso flex flex-col items-center text-center select-none"
        >
          {/* Top Close Button */}
          <button
            onClick={resumeGame}
            className="absolute top-3 right-3 p-1.5 rounded-full text-cozy-choco/60 hover:text-cozy-espresso hover:bg-cozy-babyPink/40 transition-colors cursor-pointer"
            title="Tutup & Lanjut"
          >
            <X size={16} />
          </button>

          {/* Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-soft -mt-9 mb-2">
            ☕
          </div>

          <div className="text-[11px] font-black uppercase tracking-wider text-cozy-choco/60 flex items-center gap-1">
            <Coffee size={12} />
            <span>Istirahat Kafe • Hari {currentDay}</span>
          </div>

          <h2 className="text-xl font-black text-cozy-espresso mt-0.5">
            Game Dijeda ✨
          </h2>

          <p className="text-xs text-cozy-choco/75 mt-1 px-1 leading-relaxed">
            Timer dan pesanan dibekukan sementara. Tarik napas santai dulu sebelum meracik lagi ya!
          </p>

          {/* Action Buttons List */}
          <div className="w-full mt-4 flex flex-col gap-2">
            {/* 1. Resume Button (Primary) */}
            <button
              onClick={resumeGame}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-extrabold text-sm shadow-md hover:brightness-105 active:scale-95 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Play size={15} className="fill-current" />
              <span>Lanjut Bermain</span>
            </button>

            {/* 2. Restart Button */}
            <button
              onClick={retryDay}
              className="w-full py-2.5 rounded-2xl bg-amber-100/90 hover:bg-amber-200/90 text-amber-900 font-bold text-xs border border-amber-300 shadow-xs active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Ulangi Hari {currentDay}</span>
            </button>

            {/* 3. Recipe Book */}
            <button
              onClick={toggleRecipeBook}
              className="w-full py-2.5 rounded-2xl bg-white hover:bg-cozy-cream text-cozy-espresso font-bold text-xs border-2 border-cozy-babyPink/80 shadow-xs active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <BookOpen size={14} className="text-cozy-choco" />
              <span>Lihat Buku Resep</span>
            </button>

            {/* 4. Quit to Title */}
            <button
              onClick={goToTitle}
              className="w-full py-2 rounded-xl text-xs font-bold text-cozy-choco/70 hover:text-cozy-espresso flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
            >
              <Home size={13} />
              <span>Keluar ke Menu Utama</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
