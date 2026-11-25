import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, CircleHelp, MessageSquareQuote, ChevronDown, ChevronUp } from 'lucide-react';
import { CustomerOrder } from '../../types/game';
import { useGameStore } from '../../store/gameStore';
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

  const {
    isOrderConfirmed,
    isClarified,
    confirmOrder,
    askClarification
  } = useGameStore();

  // Local state to toggle expansion if player wants to re-read dialog after confirming
  const [isExpanded, setIsExpanded] = useState<boolean>(!isOrderConfirmed);

  // When a new order arrives, ensure expansion matches confirmation state
  useEffect(() => {
    setIsExpanded(!isOrderConfirmed);
  }, [order.id, isOrderConfirmed]);

  const activeDialogueText = isClarified && order.clarificationText
    ? order.clarificationText
    : order.dialogue;

  return (
    <motion.div
      layout
      initial={{ scale: 0.85, opacity: 0, y: -8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="relative bg-white/95 backdrop-blur-md border-[2.5px] border-cozy-blush/90 rounded-2xl p-2.5 shadow-cozy max-w-[325px] mx-auto text-cozy-espresso select-none"
    >
      {/* Speech Pointer Tail pointing downwards to customer */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-[2.5px] border-r-[2.5px] border-cozy-blush/90 rotate-45 z-0" />

      {/* 1. Customer Dialogue Section (Expandable or Full View) */}
      <AnimatePresence initial={false}>
        {(!isOrderConfirmed || isExpanded) && (
          <motion.div
            key="dialogue-box"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {/* Dialogue Quote Balloon */}
            <div
              className={`text-[11px] font-bold px-2.5 py-1.5 rounded-xl border mb-2 leading-relaxed text-center transition-all ${
                isClarified
                  ? 'bg-amber-50/95 border-amber-300 text-amber-950 shadow-inner'
                  : 'bg-[#FFF8E7]/90 border-cozy-babyPink/70 text-cozy-espresso'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <MessageSquareQuote size={12} className={isClarified ? 'text-amber-600' : 'text-cozy-choco/60'} />
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-cozy-choco/70">
                  {isClarified ? 'Formula Resep Jelas' : 'Permintaan Pelanggan'}
                </span>
              </div>
              <p className="italic">"{activeDialogueText}"</p>
            </div>

            {/* GPGP Response Decision Buttons: [What?] & [Okay] */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              {/* Tombol [Bisa Diulang? / What?] */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={askClarification}
                disabled={isClarified}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[11px] font-extrabold border shadow-xs transition-all ${
                  isClarified
                    ? 'bg-amber-50 text-amber-600/70 border-amber-200 cursor-default opacity-85'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border-amber-300 active:bg-amber-300 cursor-pointer'
                }`}
                title={isClarified ? 'Resep sudah dijelaskan secara lengkap' : 'Minta penjelasan detail (-8% kesabaran)'}
              >
                <CircleHelp size={13} className={isClarified ? 'text-amber-500' : 'text-amber-700 animate-pulse'} />
                <span>{isClarified ? 'Sudah Jelas 👌' : 'Bisa Diulang?'}</span>
              </motion.button>

              {/* Tombol [Siap! / Okay] */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={confirmOrder}
                className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-[11px] font-black bg-[#E8F8EE] hover:bg-[#D5F2DF] text-emerald-900 border border-emerald-300 shadow-xs active:bg-emerald-200 cursor-pointer transition-all"
                title="Tutup dialog & mulai meracik di dapur"
              >
                <CheckCircle2 size={13} className="text-emerald-700" />
                <span>Siap! (Okay)</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Order Header & Reward Coin (Plus Expand/Collapse Toggle when Confirmed) */}
      <div className="flex items-center justify-between text-[10px] font-extrabold text-cozy-choco/80 pb-1 mb-1.5 border-b border-cozy-babyPink/60">
        <div className="flex items-center gap-1">
          <Sparkles size={11} className="text-cozy-choco" />
          <span className="text-cozy-espresso tracking-tight">{orderTitle}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {isOrderConfirmed && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[9px] font-bold text-cozy-choco hover:text-cozy-espresso bg-cozy-babyPink/30 hover:bg-cozy-babyPink/60 px-1.5 py-0.5 rounded flex items-center gap-0.5 transition-all"
              title={isExpanded ? 'Sembunyikan dialog' : 'Lihat dialog pelanggan'}
            >
              <span>{isExpanded ? 'Tutup' : 'Dialog'}</span>
              {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
            </button>
          )}
          <span className="text-amber-800 font-black px-1.5 py-0.5 rounded-md bg-amber-100 border border-amber-300">
            +{order.rewardCoins} 🪙
          </span>
        </div>
      </div>

      {/* 3. Visual Recipe Miniature Display Tray */}
      <div
        className={`flex items-center justify-center gap-4 py-1 bg-cozy-cream/40 rounded-xl p-1.5 border transition-all ${
          isClarified
            ? 'border-amber-300 bg-amber-50/40 ring-1 ring-amber-200 shadow-inner'
            : 'border-cozy-babyPink/40'
        }`}
      >
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
