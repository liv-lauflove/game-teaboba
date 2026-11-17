import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const TrayArea: React.FC = () => {
  const { currentCup, currentSnack, clearTray, serveOrder, feedbackMessage } = useGameStore();

  const handleServe = () => {
    serveOrder();
  };

  const isCupEmpty = !currentCup.base && !currentCup.ice && currentCup.topping === 'NONE' && currentCup.foam === 'NONE';
  const isPlateEmpty = currentSnack === 'NONE';
  const isTrayEmpty = isCupEmpty && isPlateEmpty;

  return (
    <div className="relative px-3 py-2 flex flex-col items-center">
      {/* Toast Feedback Message */}
      <div className="h-6 mb-1 flex items-center justify-center">
        <AnimatePresence>
          {feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.9 }}
              className={`px-3 py-0.5 rounded-full text-xs font-bold shadow-soft flex items-center gap-1.5 ${
                feedbackMessage.type === 'success'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}
            >
              {feedbackMessage.type === 'success' ? <Sparkles size={13} /> : <AlertCircle size={13} />}
              {feedbackMessage.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Aesthetic Cafe Wooden Tray */}
      <div className="w-full max-w-[340px] bg-[#EADA7C]/30 border-4 border-[#C8B6A6] rounded-3xl p-3 shadow-cozy relative flex flex-col items-center backdrop-blur-xs">
        {/* Tray Handles */}
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#A68A78] rounded-l-md" />
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-10 bg-[#A68A78] rounded-r-md" />

        {/* Assembly Stage: Cup + Plate */}
        <div className="w-full flex items-center justify-around py-1">
          {/* 1. Gelas Minuman (Drink Assembly Glass) */}
          <div className="flex flex-col items-center">
            <div className="relative w-20 h-28 border-3 border-white/90 rounded-b-2xl rounded-t-sm bg-white/30 backdrop-blur-xs shadow-inner-soft overflow-hidden flex flex-col justify-end">
              {/* Glass Rim shine */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/70" />

              {/* Straw */}
              {currentCup.base && (
                <div className="absolute -top-3 right-5 w-2 h-16 bg-cozy-blush/90 rounded-full transform rotate-12 z-20 border border-white/60" />
              )}

              {/* Top Layer: Cold Foam */}
              {currentCup.foam !== 'NONE' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 26 }}
                  className={`absolute top-0 left-0 right-0 z-10 border-b border-black/10 flex items-center justify-center font-bold text-[10px] shadow-xs ${
                    currentCup.foam === 'STRAWBERRY_FOAM'
                      ? 'bg-cozy-blush text-rose-800'
                      : currentCup.foam === 'UBE_FOAM'
                      ? 'bg-cozy-ube text-purple-800'
                      : 'bg-cozy-cream text-amber-900'
                  }`}
                >
                  {currentCup.foam === 'STRAWBERRY_FOAM' && '🍓 Foam'}
                  {currentCup.foam === 'UBE_FOAM' && '🍠 Ube Foam'}
                  {currentCup.foam === 'ORIGINAL_FOAM' && '🥛 Milk Foam'}
                </motion.div>
              )}

              {/* Middle Layer: Base Liquid (Matcha or Milk Tea) */}
              {currentCup.base && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '70%' }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`w-full relative flex items-center justify-center ${
                    currentCup.base === 'MATCHA' ? 'bg-[#9BB59A]' : 'bg-[#D4A373]'
                  }`}
                >
                  {/* Floating Ice Cubes */}
                  {currentCup.ice === 'NORMAL_ICE' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-around px-1 pointer-events-none"
                    >
                      <span className="text-sm select-none opacity-85 animate-pulse">🧊</span>
                      <span className="text-xs select-none opacity-85">🧊</span>
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Bottom Layer: Topping (Boba / Jelly) */}
              {currentCup.topping === 'BOBA' && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 22 }}
                  className="w-full bg-cozy-choco z-10 flex items-center justify-around px-1"
                >
                  <span className="w-2 h-2 rounded-full bg-black/70 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-black/70 inline-block"></span>
                  <span className="w-2 h-2 rounded-full bg-black/70 inline-block"></span>
                  <span className="w-2 h-2 rounded-full bg-black/70 inline-block"></span>
                </motion.div>
              )}

              {/* Empty Glass Placeholder Hint */}
              {isCupEmpty && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-cozy-choco/40 text-[10px] text-center p-1 font-semibold">
                  <span>Gelas Kosong</span>
                  <span className="text-[9px] opacity-75">(Pilih bahan)</span>
                </div>
              )}
            </div>
            <span className="text-[11px] font-bold text-cozy-espresso mt-1">
              {currentCup.base ? (currentCup.base === 'MATCHA' ? 'Matcha Cup' : 'Milk Tea Cup') : 'Gelas Barista'}
            </span>
          </div>

          {/* 2. Piring Camilan (Snack Plate) */}
          <div className="flex flex-col items-center">
            <div className="relative w-22 h-22 rounded-full bg-cozy-cream border-4 border-cozy-roseLilac/70 shadow-soft flex items-center justify-center">
              {/* Plate decorative inner groove */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-cozy-blush/60 pointer-events-none" />

              <AnimatePresence mode="wait">
                {currentSnack !== 'NONE' ? (
                  <motion.div
                    key={currentSnack}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 20 }}
                    className="text-4xl drop-shadow-md select-none"
                  >
                    {currentSnack === 'CHEESECAKE' && '🍰'}
                    {currentSnack === 'CHOCO_COOKIE' && '🍪'}
                    {currentSnack === 'MATCHA_COOKIE' && '🍪'}
                  </motion.div>
                ) : (
                  <span className="text-[10px] font-semibold text-cozy-choco/40 text-center px-1">
                    Piring Kosong
                  </span>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[11px] font-bold text-cozy-espresso mt-1">
              {currentSnack !== 'NONE'
                ? currentSnack === 'CHEESECAKE'
                  ? 'Cheesecake'
                  : currentSnack === 'CHOCO_COOKIE'
                  ? 'Choco Cookie'
                  : 'Matcha Cookie'
                : 'Piring Saji'}
            </span>
          </div>
        </div>

        {/* Action Buttons: Buang & Sajikan */}
        <div className="w-full flex items-center justify-between gap-3 mt-2 pt-2 border-t border-black/10">
          <button
            onClick={clearTray}
            disabled={isTrayEmpty}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
              isTrayEmpty
                ? 'opacity-40 cursor-not-allowed bg-black/5 text-cozy-espresso/50'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100 active:scale-95 border border-rose-200'
            }`}
          >
            <Trash2 size={13} />
            <span>Reset</span>
          </button>

          <button
            onClick={handleServe}
            disabled={isTrayEmpty}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl font-extrabold text-xs shadow-soft transition-all ${
              isTrayEmpty
                ? 'opacity-50 cursor-not-allowed bg-black/10 text-cozy-espresso/50'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:brightness-105 active:scale-95 shadow-md'
            }`}
          >
            <Sparkles size={14} />
            <span>Sajikan ke Meja 🛎️</span>
          </button>
        </div>
      </div>
    </div>
  );
};
