import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { CustomerOrder } from '../../types/game';
import { RecipeMiniCup } from './RecipeMiniCup';
import { RecipeMiniPlate } from './RecipeMiniPlate';

interface ThoughtBubbleProps {
  order: CustomerOrder;
}

export function getOrderTitle(order: CustomerOrder): string {
  const parts: string[] = [];

  if (order.drink) {
    if (order.drink.base === 'MATCHA') {
      if (order.drink.foam === 'STRAWBERRY_FOAM') parts.push('Strawberry Matcha');
      else if (order.drink.foam === 'UBE_FOAM') parts.push('Ube Matcha');
      else if (order.drink.foam === 'ORIGINAL_FOAM') parts.push('Creamy Matcha');
      else parts.push('Matcha Latte');
    } else {
      if (order.drink.topping === 'BOBA') parts.push('Boba Milk Tea');
      else if (order.drink.topping === 'JELLY') parts.push('Jelly Milk Tea');
      else parts.push('Classic Milk Tea');
    }
  }

  if (order.snack !== 'NONE') {
    if (order.snack === 'CHEESECAKE') parts.push('Cheesecake');
    else if (order.snack === 'CHOCO_COOKIE') parts.push('Choco Cookie');
    else if (order.snack === 'MATCHA_COOKIE') parts.push('Matcha Cookie');
  }

  return parts.length > 0 ? parts.join(' + ') : 'Pesanan Spesial';
}

export const ThoughtBubble: React.FC<ThoughtBubbleProps> = ({ order }) => {
  const { drink, snack } = order;
  const orderTitle = getOrderTitle(order);

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: -8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="relative bg-white/95 backdrop-blur-md border-[2.5px] border-cozy-blush/90 rounded-2xl p-2.5 shadow-cozy max-w-[310px] mx-auto text-cozy-espresso select-none"
    >
      {/* Speech Pointer Tail pointing downwards to customer */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-[2.5px] border-r-[2.5px] border-cozy-blush/90 rotate-45" />

      {/* 1. Customer Dialogue Quote Balloon (GPGP Style) */}
      <div className="text-[11px] font-bold text-cozy-espresso italic bg-[#FFF8E7]/90 px-2.5 py-1.5 rounded-xl border border-cozy-babyPink/70 mb-2 leading-relaxed text-center">
        "{order.dialogue}"
      </div>

      {/* 2. Order Header & Reward Coin */}
      <div className="flex items-center justify-between text-[10px] font-extrabold text-cozy-choco/80 pb-1 mb-1.5 border-b border-cozy-babyPink/60">
        <div className="flex items-center gap-1">
          <Sparkles size={11} className="text-cozy-choco" />
          <span className="text-cozy-espresso tracking-tight">{orderTitle}</span>
        </div>
        <span className="text-amber-800 font-black px-1.5 py-0.5 rounded-md bg-amber-100 border border-amber-300">
          +{order.rewardCoins} 🪙
        </span>
      </div>

      {/* 3. Visual Recipe Miniature Display Tray */}
      <div className="flex items-center justify-center gap-4 py-0.5 bg-cozy-cream/40 rounded-xl p-1.5 border border-cozy-babyPink/40">
        {/* Dynamic Miniature Cup */}
        {drink && <RecipeMiniCup drink={drink} />}

        {/* Plus Divider if combo drink & snack */}
        {drink && snack !== 'NONE' && (
          <span className="text-cozy-choco/50 font-black text-xs">+</span>
        )}

        {/* Dynamic Miniature Snack Plate */}
        {snack !== 'NONE' && <RecipeMiniPlate snack={snack} />}
      </div>
    </motion.div>
  );
};
