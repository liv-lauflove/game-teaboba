import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { ThoughtBubble } from './ThoughtBubble';

export const CustomerArea: React.FC = () => {
  const { activeOrder } = useGameStore();

  if (!activeOrder) {
    return (
      <div className="h-44 flex flex-col items-center justify-center text-cozy-choco/60">
        <span className="text-3xl animate-bounce">🚪✨</span>
        <span className="text-xs font-semibold mt-1">Menunggu pelanggan masuk...</span>
      </div>
    );
  }

  return (
    <div className="relative pt-2 pb-1 px-4 flex flex-col items-center min-h-[190px] justify-between">
      {/* Thought Bubble with Order */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOrder.id}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="w-full z-10"
        >
          <ThoughtBubble order={activeOrder} />
        </motion.div>
      </AnimatePresence>

      {/* Customer Character & Name Tag */}
      <motion.div
        key={`customer-${activeOrder.id}`}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex items-center gap-2 mt-2"
      >
        <div className="relative">
          {/* Avatar Ring */}
          <div className="w-12 h-12 rounded-full bg-cozy-babyPink/80 border-2 border-white shadow-soft flex items-center justify-center text-2xl select-none">
            {activeOrder.customerAvatar}
          </div>
          {/* Heart indicator */}
          <span className="absolute -bottom-1 -right-1 text-xs">💖</span>
        </div>

        <div className="bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-full border border-cozy-blush/60 shadow-xs">
          <span className="text-xs font-bold text-cozy-espresso">
            {activeOrder.customerName}
          </span>
          <span className="text-[10px] text-cozy-choco/70 ml-1.5 italic">
            "{activeOrder.dialogue}"
          </span>
        </div>
      </motion.div>
    </div>
  );
};
