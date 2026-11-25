import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { ThoughtBubble } from './ThoughtBubble';
import { CustomerBust } from './CustomerBust';

export const CustomerArea: React.FC = () => {
  const { activeOrder, customerPatience, customerExpression, patiencePenaltyTrigger } = useGameStore();

  if (!activeOrder) {
    return (
      <div className="h-48 flex flex-col items-center justify-center text-cozy-choco/60">
        <span className="text-4xl animate-bounce">🚪✨</span>
        <span className="text-xs font-bold mt-2 bg-white/70 px-3 py-1 rounded-full border border-cozy-blush/60">
          Menunggu pelanggan berikutnya...
        </span>
      </div>
    );
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-between min-h-[225px] select-none">
      {/* Floating Broken Heart Penalty Feedback */}
      <AnimatePresence>
        {patiencePenaltyTrigger > 0 && (
          <motion.div
            key={`penalty-${patiencePenaltyTrigger}`}
            initial={{ opacity: 0, y: 0, scale: 0.6 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [-5, -25, -45, -60],
              scale: [0.7, 1.15, 1.05, 0.9]
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none flex items-center gap-1.5 bg-rose-600/90 text-white px-3 py-1 rounded-full shadow-lg border-2 border-white text-xs font-black backdrop-blur-xs"
          >
            <motion.span
              animate={{ scale: [1, 1.35, 1, 1.25, 1] }}
              transition={{ duration: 0.6, repeat: 1 }}
            >
              💔
            </motion.span>
            <span>-8% Kesabaran</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Speech / Thought Bubble (Top Layer) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeOrder.id}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-full z-30 px-3 pt-1"
        >
          <ThoughtBubble order={activeOrder} />
        </motion.div>
      </AnimatePresence>

      {/* 2. Customer Behind Counter Stage (Good Pizza, Great Pizza View) */}
      <div className="relative w-full flex flex-col items-center mt-1">
        {/* Back Layer: Half-Body Customer Bust Standing Behind Counter */}
        <div className="relative z-10 -mb-3 flex justify-center">
          <CustomerBust
            visual={activeOrder.customerVisual}
            name={activeOrder.customerName}
            expression={customerExpression}
          />

          {/* Reactive sweat drop when asked to repeat */}
          <AnimatePresence>
            {patiencePenaltyTrigger > 0 && (
              <motion.div
                key={`sweat-${patiencePenaltyTrigger}`}
                initial={{ opacity: 0, scale: 0, y: 5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.25, 1, 0.8],
                  y: [0, -12, -8, 2]
                }}
                transition={{ duration: 1.4 }}
                className="absolute top-3 right-1/4 z-30 pointer-events-none text-xl"
                title="Pelanggan cemas"
              >
                💧
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Front Layer: Counter Top Divider with Register & Tip Jar */}
        <div className="relative z-20 w-full h-8 bg-gradient-to-b from-[#E8F4F6] via-[#D6E9ED] to-[#BDDCE1] border-t-[2.5px] border-b-2 border-cozy-choco/75 shadow-sm flex items-center justify-between px-3">
          {/* Left: Cash Register & Tip Jar Props */}
          <div className="flex items-center gap-1.5">
            {/* Retro Cash Register */}
            <div
              className="flex items-center gap-1 bg-[#4A3B32] text-amber-200 px-1.5 py-0.5 rounded-md border border-[#30231C] shadow-xs cursor-default"
              title="Mesin Kasir Kafe"
            >
              <span className="text-xs">📟</span>
              <span className="text-[9px] font-black tracking-wider">KASIR</span>
            </div>

            {/* Glass Tip Jar */}
            <div
              className="flex items-center gap-0.5 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded-md border border-cozy-choco/40 shadow-xs cursor-default"
              title="Toples Tip Kasir"
            >
              <span className="text-xs">🫙</span>
              <span className="text-[9px] text-amber-700 font-black">TIP</span>
            </div>
          </div>

          {/* Center: Patience Heart Indicator */}
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black border shadow-xs transition-colors ${
              customerPatience >= 85
                ? 'bg-rose-50/95 text-rose-700 border-rose-300'
                : customerPatience >= 60
                ? 'bg-amber-50/95 text-amber-700 border-amber-300'
                : 'bg-red-50/95 text-red-700 border-red-300'
            }`}
            title="Tingkat Kesabaran Pelanggan"
          >
            <Heart
              size={11}
              className={`fill-current ${
                customerPatience >= 85
                  ? 'text-rose-500'
                  : 'text-amber-500 animate-pulse'
              }`}
            />
            <span>{customerPatience}%</span>
          </div>

          {/* Right: Customer Name Tag Badge */}
          <motion.div
            key={`nametag-${activeOrder.id}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-cozy-blush/80 shadow-xs flex items-center gap-1"
          >
            <span className="text-xs">{activeOrder.customerAvatar}</span>
            <span className="text-[11px] font-extrabold text-cozy-espresso">
              {activeOrder.customerName}
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
