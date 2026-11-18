import React from 'react';
import { motion } from 'framer-motion';
import { CustomerOrder } from '../../types/game';

interface ThoughtBubbleProps {
  order: CustomerOrder;
}

export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ order }) => {
  const { drink, snack } = order;

  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 10 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-white/95 backdrop-blur-sm border-2 border-cozy-blush/80 rounded-2xl p-3 shadow-cozy max-w-[280px] mx-auto text-cozy-espresso"
    >
      {/* Cute speech/thought bubble tail */}
      <div className="absolute -bottom-2.5 left-10 w-4 h-4 bg-white border-b-2 border-r-2 border-cozy-blush/80 transform rotate-45" />

      {/* Customer Speech Bubble Header */}
      <div className="text-[11px] font-bold text-cozy-espresso italic bg-cozy-cream/70 px-2 py-1 rounded-lg border border-cozy-babyPink/60 mb-1 leading-snug">
        "{order.dialogue}"
      </div>

      {/* Header thought prompt */}
      <div className="flex items-center justify-between text-[10px] font-bold text-cozy-choco/80 pb-1 mb-1 border-b border-cozy-babyPink/60">
        <span>Petunjuk Resep:</span>
        <span className="text-cozy-choco font-black">+{order.rewardCoins} 🪙</span>
      </div>

      <div className="flex items-center justify-center gap-3 py-1">
        {/* Visual Mini Cup */}
        {drink && (
          <div className="flex flex-col items-center">
            {/* Visual Mini Glass Illustration */}
            <div className="relative w-12 h-16 border-2 border-cozy-espresso/30 rounded-b-xl rounded-t-sm bg-white/50 overflow-hidden flex flex-col justify-end shadow-inner-soft">
              {/* Foam Layer (Top) */}
              {drink.base === 'MATCHA' && drink.foam && drink.foam !== 'NONE' && (
                <div
                  className={`absolute top-0 left-0 right-0 h-4 border-b border-black/10 flex items-center justify-center text-[9px] font-extrabold ${
                    drink.foam === 'STRAWBERRY_FOAM'
                      ? 'bg-cozy-blush text-rose-700'
                      : drink.foam === 'UBE_FOAM'
                      ? 'bg-cozy-ube text-purple-800'
                      : 'bg-cozy-cream text-amber-800'
                  }`}
                  title={drink.foam}
                >
                  {drink.foam === 'STRAWBERRY_FOAM' && '🍓'}
                  {drink.foam === 'UBE_FOAM' && '🍠'}
                  {drink.foam === 'ORIGINAL_FOAM' && '🥛'}
                </div>
              )}

              {/* Liquid Base */}
              <div
                className={`w-full flex-1 transition-colors duration-300 flex items-center justify-center ${
                  drink.base === 'MATCHA'
                    ? 'bg-[#9BB59A]'
                    : 'bg-[#D4A373]'
                }`}
              >
                {/* Ice Badge inside */}
                {drink.ice === 'NORMAL_ICE' ? (
                  <span className="text-[10px] select-none opacity-80">🧊</span>
                ) : (
                  <span className="text-[8px] font-bold bg-white/70 px-1 rounded text-cozy-espresso">No Ice</span>
                )}
              </div>

              {/* Topping Bottom Layer (Boba/Jelly) */}
              {drink.topping === 'BOBA' && (
                <div className="h-3.5 bg-cozy-choco/90 flex items-center justify-center gap-0.5 px-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-black/60 inline-block"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/60 inline-block"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-black/60 inline-block"></span>
                </div>
              )}
            </div>

            {/* Label Drink Description */}
            <span className="text-[10px] font-bold text-center mt-1 text-cozy-espresso leading-tight">
              {drink.base === 'MATCHA' ? (
                <>
                  Matcha
                  <br />
                  <span className={`px-1 rounded-full text-[9px] ${
                    drink.foam === 'STRAWBERRY_FOAM'
                      ? 'bg-pink-100 text-pink-700'
                      : drink.foam === 'UBE_FOAM'
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    {drink.foam === 'STRAWBERRY_FOAM' && 'Strawb. Foam'}
                    {drink.foam === 'UBE_FOAM' && 'Ube Foam'}
                    {drink.foam === 'ORIGINAL_FOAM' && 'Ori Foam'}
                  </span>
                </>
              ) : (
                <>
                  Milk Tea
                  <br />
                  <span className="text-[9px] text-cozy-choco/90">
                    {drink.topping === 'BOBA' ? '+ Boba' : '(Polos)'}
                  </span>
                </>
              )}
            </span>
          </div>
        )}

        {/* Plus separator if combo order */}
        {drink && snack !== 'NONE' && (
          <span className="text-cozy-choco/40 font-black text-sm">+</span>
        )}

        {/* Visual Mini Snack */}
        {snack !== 'NONE' && (
          <div className="flex flex-col items-center">
            {/* Visual Plate */}
            <div className="w-14 h-12 bg-cozy-cream border-2 border-cozy-espresso/20 rounded-full flex items-center justify-center shadow-inner-soft">
              <span className="text-2xl drop-shadow-sm select-none">
                {snack === 'CHEESECAKE' && '🍰'}
                {snack === 'CHOCO_COOKIE' && '🍪'}
                {snack === 'MATCHA_COOKIE' && '🍵🍪'}
              </span>
            </div>
            <span className="text-[10px] font-bold text-center mt-1 text-cozy-espresso leading-tight">
              {snack === 'CHEESECAKE' && 'Cheesecake'}
              {snack === 'CHOCO_COOKIE' && 'Choco Cookie'}
              {snack === 'MATCHA_COOKIE' && 'Matcha Cookie'}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
