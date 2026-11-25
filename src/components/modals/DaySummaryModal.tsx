import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowRight, Star, Home } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { DAYS_CONFIG } from '../../data/daysConfig';

export const DaySummaryModal: React.FC = () => {
  const { status, currentDay, dayCoins, dayTipCoins, servedSuccessCount, servedWrongCount, nextDay, resetDaySession, returnToTitle } = useGameStore();
  const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];

  const isSuccess = status === 'DAY_SUMMARY';
  const hasNextDay = currentDay < DAYS_CONFIG.length;

  useEffect(() => {
    if (isSuccess) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback if canvas not ready
      }
    }
  }, [isSuccess]);

  return (
    <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-[320px] bg-[#FFF8E7] rounded-3xl p-5 border-4 border-cozy-babyPink shadow-cozy text-cozy-espresso flex flex-col items-center text-center"
      >
        {/* Emoticon Header */}
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-soft -mt-9 mb-2 border-2 ${
          isSuccess ? 'bg-amber-100 border-amber-300' : 'bg-rose-100 border-rose-300'
        }`}>
          {isSuccess ? '🎉' : '😿'}
        </div>

        <h2 className="text-xl font-black text-cozy-espresso">
          {isSuccess ? `Hari ${currentDay} Selesai!` : `Target Hari ${currentDay} Meleset!`}
        </h2>
        <p className="text-xs text-cozy-choco/70 mt-0.5">
          {isSuccess
            ? 'Kerja bagus! Pelanggan sangat puas dengan racikanmu.'
            : 'Jangan menyerah! Pelanggan masih menunggu racikan sempurnamu.'}
        </p>

        {/* Rating Stars for Success */}
        {isSuccess && (
          <div className="flex items-center gap-1 my-2">
            <Star className="text-amber-400 fill-amber-400" size={24} />
            <Star className="text-amber-400 fill-amber-400" size={28} />
            <Star className={dayCoins >= config.targetCoins * 1.3 ? "text-amber-400 fill-amber-400" : "text-gray-300"} size={24} />
          </div>
        )}

        {/* Score Card */}
        <div className="w-full bg-white/80 rounded-2xl p-3 border border-cozy-babyPink mt-2 space-y-2 text-xs">
          <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
            <span className="font-bold text-cozy-choco/80">Koin Didapat</span>
            <span className="font-black text-sm text-amber-600">
              🪙 {dayCoins} / {config.targetCoins}
            </span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
            <span className="font-bold text-cozy-choco/80">Tip Kasir</span>
            <span className="font-black text-amber-700">
              🫙 +{dayTipCoins} koin
            </span>
          </div>

          <div className="flex items-center justify-between pb-1.5 border-b border-black/5">
            <span className="font-bold text-cozy-choco/80">Pelanggan Puas</span>
            <span className="font-black text-emerald-600">
              🌸 {servedSuccessCount} orang
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-cozy-choco/80">Racikan Salah</span>
            <span className="font-bold text-rose-500">
              {servedWrongCount} kali
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full mt-4 flex flex-col gap-2">
          {isSuccess ? (
            hasNextDay ? (
              <button
                onClick={nextDay}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Lanjut Hari {currentDay + 1}</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 font-bold text-xs">
                🏆 Selamat! Kamu telah menamatkan semua Hari Kafe!
              </div>
            )
          ) : (
            <button
              onClick={resetDaySession}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-400 to-cozy-choco text-white font-black text-sm shadow-md hover:brightness-105 active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>Coba Hari {currentDay} Lagi</span>
            </button>
          )}

          {isSuccess && (
            <button
              onClick={resetDaySession}
              className="w-full py-1.5 text-xs font-bold text-cozy-choco/60 hover:text-cozy-choco cursor-pointer"
            >
              Ulangi Hari Ini Lagi 🔄
            </button>
          )}

          {/* Keluar ke Menu Utama */}
          <button
            onClick={returnToTitle}
            className="w-full py-2.5 rounded-2xl bg-white/70 hover:bg-white text-cozy-choco/80 hover:text-cozy-espresso font-bold text-xs border border-cozy-blush/60 shadow-xs active:scale-95 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Home size={14} />
            <span>Keluar ke Menu Utama</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
