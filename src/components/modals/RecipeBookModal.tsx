import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Coffee, Cookie } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

export const RecipeBookModal: React.FC = () => {
  const { showRecipeBook, toggleRecipeBook } = useGameStore();

  if (!showRecipeBook) return null;

  return (
    <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-[320px] max-h-[85vh] overflow-y-auto bg-[#FFF8E7] rounded-3xl p-4 border-4 border-cozy-babyPink shadow-cozy text-cozy-espresso flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b-2 border-cozy-blush/60">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-cozy-choco" />
            <span className="font-black text-sm text-cozy-espresso">Buku Panduan Resep 📖</span>
          </div>
          <button
            onClick={toggleRecipeBook}
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-cozy-choco hover:bg-rose-50 border border-cozy-blush/60"
          >
            <X size={15} />
          </button>
        </div>

        {/* Recipes Content */}
        <div className="mt-3 space-y-3 text-xs">
          {/* Milk Tea Guide */}
          <div className="bg-white/80 p-2.5 rounded-2xl border border-cozy-babyPink shadow-xs">
            <div className="font-extrabold text-cozy-choco flex items-center gap-1 mb-1">
              <Coffee size={13} /> 🧋 Classic Milk Tea
            </div>
            <p className="text-[11px] text-cozy-choco/80 leading-relaxed">
              1. Pilih <strong>Milk Tea</strong> + Es batu (atau tanpa es).<br />
              2. Jika ada boba di pesanan, klik tombol <strong>Tambah Boba Pearls</strong>.
            </p>
          </div>

          {/* Matcha Latte Guide */}
          <div className="bg-white/80 p-2.5 rounded-2xl border border-cozy-babyPink shadow-xs">
            <div className="font-extrabold text-cozy-matcha flex items-center gap-1 mb-1">
              <Coffee size={13} /> 🍵 Matcha Foam Special
            </div>
            <p className="text-[11px] text-cozy-choco/80 leading-relaxed mb-1.5">
              1. Pilih <strong>Matcha Tea</strong> + Es batu.<br />
              2. Pilih warna foam sesuai warna layer atas di balon pikiran:
            </p>
            <ul className="text-[10px] space-y-1 pl-1">
              <li className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cozy-cream border border-black/20" />
                <strong>Putih Cream</strong> = Ori Milk Foam (Susu)
              </li>
              <li className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cozy-ube border border-black/20" />
                <strong>Ungu Lavender</strong> = Ube Foam
              </li>
              <li className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-cozy-blush border border-black/20" />
                <strong>Pink Pastel</strong> = Strawberry Foam
              </li>
            </ul>
          </div>

          {/* Bakery Snack Guide */}
          <div className="bg-white/80 p-2.5 rounded-2xl border border-cozy-babyPink shadow-xs">
            <div className="font-extrabold text-amber-700 flex items-center gap-1 mb-1">
              <Cookie size={13} /> 🍰 Etalase Camilan
            </div>
            <p className="text-[11px] text-cozy-choco/80 leading-relaxed">
              Jika pelanggan memesan camilan, buka tab <strong>Snack Kafe</strong> dan klik kue yang diminta (Cheesecake atau Cookies). Snack akan langsung tertata di piring samping gelas.
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={toggleRecipeBook}
          className="mt-4 py-2 bg-cozy-choco text-white font-black text-xs rounded-xl shadow-xs"
        >
          Tutup Panduan ✨
        </button>
      </motion.div>
    </div>
  );
};
