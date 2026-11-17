import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const TitleScreen: React.FC = () => {
  const { goToBriefing, toggleRecipeBook } = useGameStore();

  return (
    <div className="min-h-screen w-full bg-[#3B2F2F] bg-gradient-to-br from-[#2E2424] via-[#3B2F2F] to-[#251D1D] flex items-center justify-center p-2 sm:p-4">
      {/* 9:16 Mobile Frame */}
      <div className="relative w-full max-w-[410px] h-[92vh] max-h-[850px] min-h-[660px] bg-cozy-cream rounded-[40px] shadow-2xl border-8 border-[#524136] overflow-hidden flex flex-col justify-between items-center text-center p-6 select-none">
        
        {/* Soft Awning Top */}
        <div className="w-full absolute top-0 left-0 right-0 h-6 flex overflow-hidden">
          <div className="flex-1 bg-cozy-babyPink"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-cozy-babyPink"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-cozy-babyPink"></div>
          <div className="flex-1 bg-white"></div>
        </div>

        {/* Decorative Top Space */}
        <div className="mt-8 flex items-center gap-1.5 text-xs font-black text-cozy-choco/70 uppercase tracking-widest">
          <Sparkles size={14} className="text-cozy-choco" />
          <span>Cozy Tea & Bakery Sim</span>
          <Sparkles size={14} className="text-cozy-choco" />
        </div>

        {/* Main Title & Logo Artwork */}
        <div className="flex flex-col items-center my-auto">
          {/* Animated Mascot Items */}
          <motion.div
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1, rotate: [ -5, 5, -5 ] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="flex items-center justify-center gap-3 my-4"
          >
            <div className="w-16 h-20 rounded-2xl bg-amber-100 border-3 border-cozy-choco flex items-center justify-center text-4xl shadow-soft">
              🧋
            </div>
            <div className="w-16 h-20 rounded-2xl bg-emerald-100 border-3 border-cozy-matcha flex items-center justify-center text-4xl shadow-soft">
              🍵
            </div>
            <div className="w-16 h-20 rounded-2xl bg-pink-100 border-3 border-cozy-blush flex items-center justify-center text-4xl shadow-soft">
              🍰
            </div>
          </motion.div>

          <h1 className="text-3xl font-black text-cozy-espresso tracking-tight leading-tight mt-2">
            Boba & Bakery
            <br />
            <span className="text-cozy-choco text-2xl font-extrabold font-serif italic">
              Cozy Cafe ✨
            </span>
          </h1>

          <p className="text-xs text-cozy-choco/80 mt-3 max-w-[260px] leading-relaxed">
            Seduh milk tea boba, racik matcha dengan ube & strawberry cold foam, serta hidangkan cheesecake lembut untuk pelanggan setiamu! 🌸
          </p>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-2.5 mb-4">
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => goToBriefing(1)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cozy-choco to-[#8B5A3C] text-white font-black text-sm shadow-cozy hover:brightness-110 flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles size={16} />
            <span>Mulai Petualangan Kafe ☀️</span>
          </motion.button>

          <button
            onClick={toggleRecipeBook}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-cozy-cream text-cozy-espresso font-bold text-xs border-2 border-cozy-babyPink/80 shadow-xs flex items-center justify-center gap-1.5 transition-all"
          >
            <BookOpen size={14} className="text-cozy-choco" />
            <span>Lihat Buku Resep Kafe</span>
          </button>
        </div>

        {/* Subtle Footer credit */}
        <div className="text-[10px] text-cozy-choco/50 font-semibold">
          Created with 💖 for Tea & Boba Lovers
        </div>
      </div>
    </div>
  );
};
