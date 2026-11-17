import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { DAYS_CONFIG } from '../../data/daysConfig';
import { DrinkBase, FoamOption, SnackOption, ToppingOption } from '../../types/game';

type ActiveTab = 'DRINK' | 'FOAM_TOPPING' | 'SNACK';

export const IngredientRack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('DRINK');
  const { currentDay, setBase, setIce, setTopping, setFoam, setSnack, currentCup } = useGameStore();

  const currentConfig = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];

  const isUnlockedBase = (b: DrinkBase) => currentConfig.unlockedBases.includes(b);
  const isUnlockedFoam = (f: FoamOption) => currentConfig.unlockedFoams.includes(f);
  const isUnlockedTopping = (t: ToppingOption) => currentConfig.unlockedToppings.includes(t);
  const isUnlockedSnack = (s: SnackOption) => currentConfig.unlockedSnacks.includes(s);

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-t-3xl border-t-2 border-cozy-blush/60 shadow-cozy p-3 pb-5 flex flex-col gap-2.5">
      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1 bg-cozy-cream rounded-2xl border border-cozy-babyPink/60">
        <button
          onClick={() => setActiveTab('DRINK')}
          className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
            activeTab === 'DRINK'
              ? 'bg-white text-cozy-espresso shadow-xs'
              : 'text-cozy-choco/60 hover:text-cozy-choco'
          }`}
        >
          🧋 Minuman & Es
        </button>

        <button
          onClick={() => setActiveTab('FOAM_TOPPING')}
          className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
            activeTab === 'FOAM_TOPPING'
              ? 'bg-white text-cozy-espresso shadow-xs'
              : 'text-cozy-choco/60 hover:text-cozy-choco'
          }`}
        >
          🍓 Foam & Boba
        </button>

        <button
          onClick={() => setActiveTab('SNACK')}
          className={`flex-1 py-1.5 text-xs font-black rounded-xl transition-all ${
            activeTab === 'SNACK'
              ? 'bg-white text-cozy-espresso shadow-xs'
              : 'text-cozy-choco/60 hover:text-cozy-choco'
          }`}
        >
          🍰 Snack Kafe
        </button>
      </div>

      {/* Button Content per Tab */}
      <div className="min-h-[105px] flex items-center justify-center">
        {/* TAB 1: DRINK & ICE */}
        {activeTab === 'DRINK' && (
          <div className="w-full grid grid-cols-2 gap-2">
            {/* Milk Tea */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlockedBase('MILK_TEA')}
              onClick={() => setBase('MILK_TEA')}
              className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                currentCup.base === 'MILK_TEA'
                  ? 'border-cozy-choco bg-amber-50 ring-2 ring-cozy-choco/30'
                  : 'border-cozy-babyPink bg-white hover:bg-amber-50/50'
              } ${!isUnlockedBase('MILK_TEA') ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#D4A373] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                🧋
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-cozy-espresso">Milk Tea</div>
                <div className="text-[10px] text-cozy-choco/60 font-semibold">Teh Susu Creamy</div>
              </div>
            </motion.button>

            {/* Matcha */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlockedBase('MATCHA')}
              onClick={() => setBase('MATCHA')}
              className={`p-2.5 rounded-2xl border-2 flex items-center gap-2 transition-all ${
                currentCup.base === 'MATCHA'
                  ? 'border-cozy-matcha bg-emerald-50 ring-2 ring-cozy-matcha/40'
                  : 'border-cozy-babyPink bg-white hover:bg-emerald-50/50'
              } ${!isUnlockedBase('MATCHA') ? 'opacity-40 cursor-not-allowed' : ''}`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#9BB59A] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                🍵
              </div>
              <div className="text-left">
                <div className="text-xs font-extrabold text-cozy-espresso">Matcha Tea</div>
                <div className="text-[10px] text-cozy-choco/60 font-semibold">
                  {isUnlockedBase('MATCHA') ? 'Teh Hijau Asli' : '🔒 Hari 2'}
                </div>
              </div>
            </motion.button>

            {/* Normal Ice */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIce('NORMAL_ICE')}
              className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                currentCup.ice === 'NORMAL_ICE'
                  ? 'border-blue-300 bg-blue-50 ring-1 ring-blue-300 font-black'
                  : 'border-cozy-babyPink bg-white hover:bg-blue-50/40 text-cozy-espresso'
              }`}
            >
              <span className="text-sm">🧊</span>
              <span className="text-xs font-bold">Es Batu (Ice)</span>
            </motion.button>

            {/* No Ice */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIce('NO_ICE')}
              className={`p-2 rounded-xl border flex items-center justify-center gap-1.5 transition-all ${
                currentCup.ice === 'NO_ICE'
                  ? 'border-amber-300 bg-amber-50 ring-1 ring-amber-300 font-black'
                  : 'border-cozy-babyPink bg-white hover:bg-amber-50/40 text-cozy-espresso'
              }`}
            >
              <span className="text-sm">🚫🧊</span>
              <span className="text-xs font-bold">Tanpa Es (No Ice)</span>
            </motion.button>
          </div>
        )}

        {/* TAB 2: FOAMS & TOPPINGS */}
        {activeTab === 'FOAM_TOPPING' && (
          <div className="w-full flex flex-col gap-2">
            <div className="grid grid-cols-3 gap-1.5">
              {/* Ori Foam */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={!isUnlockedFoam('ORIGINAL_FOAM')}
                onClick={() => setFoam('ORIGINAL_FOAM')}
                className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  currentCup.foam === 'ORIGINAL_FOAM'
                    ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                    : 'border-cozy-cream bg-white hover:bg-amber-50/40'
                } ${!isUnlockedFoam('ORIGINAL_FOAM') ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <span className="text-base">🥛</span>
                <span className="text-[10px] font-extrabold text-cozy-espresso mt-0.5">Ori Foam</span>
                <span className="text-[8px] text-cozy-choco/60">
                  {isUnlockedFoam('ORIGINAL_FOAM') ? 'Susu Gurih' : '🔒 Hari 2'}
                </span>
              </motion.button>

              {/* Ube Foam */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={!isUnlockedFoam('UBE_FOAM')}
                onClick={() => setFoam('UBE_FOAM')}
                className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  currentCup.foam === 'UBE_FOAM'
                    ? 'border-purple-400 bg-purple-50 ring-2 ring-purple-200'
                    : 'border-cozy-ube/40 bg-white hover:bg-purple-50/40'
                } ${!isUnlockedFoam('UBE_FOAM') ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <span className="text-base">🍠</span>
                <span className="text-[10px] font-extrabold text-purple-900 mt-0.5">Ube Foam</span>
                <span className="text-[8px] text-purple-700/60">
                  {isUnlockedFoam('UBE_FOAM') ? 'Taro Ungu' : '🔒 Hari 3'}
                </span>
              </motion.button>

              {/* Strawberry Foam */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={!isUnlockedFoam('STRAWBERRY_FOAM')}
                onClick={() => setFoam('STRAWBERRY_FOAM')}
                className={`p-2 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  currentCup.foam === 'STRAWBERRY_FOAM'
                    ? 'border-pink-400 bg-pink-50 ring-2 ring-pink-200'
                    : 'border-cozy-blush/60 bg-white hover:bg-pink-50/40'
                } ${!isUnlockedFoam('STRAWBERRY_FOAM') ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <span className="text-base">🍓</span>
                <span className="text-[10px] font-extrabold text-pink-900 mt-0.5">Strawb. Foam</span>
                <span className="text-[8px] text-pink-700/60">
                  {isUnlockedFoam('STRAWBERRY_FOAM') ? 'Pink Manis' : '🔒 Hari 3'}
                </span>
              </motion.button>
            </div>

            {/* Boba Pearl Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlockedTopping('BOBA')}
              onClick={() => setTopping('BOBA')}
              className={`w-full py-1.5 px-3 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                currentCup.topping === 'BOBA'
                  ? 'border-cozy-choco bg-amber-100 ring-2 ring-cozy-choco/30'
                  : 'border-cozy-babyPink bg-white hover:bg-amber-50'
              }`}
            >
              <span className="text-sm">🧋⚫</span>
              <span className="text-xs font-black text-cozy-espresso">Tambah Boba Pearls (Untuk Milk Tea)</span>
            </motion.button>
          </div>
        )}

        {/* TAB 3: SNACKS */}
        {activeTab === 'SNACK' && (
          <div className="w-full grid grid-cols-3 gap-2">
            {/* Choco Cookie */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlockedSnack('CHOCO_COOKIE')}
              onClick={() => setSnack('CHOCO_COOKIE')}
              className="p-2 rounded-2xl border-2 border-cozy-babyPink bg-white hover:bg-amber-50 flex flex-col items-center justify-center text-center shadow-xs"
            >
              <span className="text-2xl">🍪</span>
              <span className="text-[10px] font-extrabold text-cozy-espresso mt-1">Choco Cookie</span>
              <span className="text-[8px] text-cozy-choco/60">Kukis Cokelat</span>
            </motion.button>

            {/* Cheesecake */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlockedSnack('CHEESECAKE')}
              onClick={() => setSnack('CHEESECAKE')}
              className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                isUnlockedSnack('CHEESECAKE')
                  ? 'border-cozy-vanilla bg-white hover:bg-yellow-50 shadow-xs'
                  : 'border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed'
              }`}
            >
              <span className="text-2xl">🍰</span>
              <span className="text-[10px] font-extrabold text-cozy-espresso mt-1">Cheesecake</span>
              <span className="text-[8px] text-cozy-choco/60">
                {isUnlockedSnack('CHEESECAKE') ? 'Kue Keju Lembut' : '🔒 Hari 2'}
              </span>
            </motion.button>

            {/* Matcha Cookie */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              disabled={!isUnlockedSnack('MATCHA_COOKIE')}
              onClick={() => setSnack('MATCHA_COOKIE')}
              className={`p-2 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                isUnlockedSnack('MATCHA_COOKIE')
                  ? 'border-cozy-matcha bg-white hover:bg-emerald-50 shadow-xs'
                  : 'border-gray-200 bg-gray-50 opacity-40 cursor-not-allowed'
              }`}
            >
              <span className="text-2xl">🍵🍪</span>
              <span className="text-[10px] font-extrabold text-cozy-espresso mt-1">Matcha Cookie</span>
              <span className="text-[8px] text-cozy-choco/60">
                {isUnlockedSnack('MATCHA_COOKIE') ? 'Kukis Teh Hijau' : '🔒 Hari 3'}
              </span>
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};
