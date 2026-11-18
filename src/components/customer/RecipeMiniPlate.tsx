import React from 'react';
import { SnackOption } from '../../types/game';

interface RecipeMiniPlateProps {
  snack: SnackOption;
}

export const RecipeMiniPlate: React.FC<RecipeMiniPlateProps> = ({ snack }) => {
  if (snack === 'NONE') return null;

  const label =
    snack === 'CHEESECAKE'
      ? 'Cheesecake'
      : snack === 'CHOCO_COOKIE'
      ? 'Choco Cookie'
      : 'Matcha Cookie';

  return (
    <div className="flex flex-col items-center select-none">
      {/* Ceramic Vintage Scalloped Plate */}
      <div className="relative w-14 h-14 flex items-center justify-center">
        {/* Plate Outer Scalloped Rims */}
        <div className="absolute inset-0 bg-white rounded-full border-2 border-cozy-choco/50 shadow-soft flex items-center justify-center">
          {/* Subtle Plate Inner Rim Ring */}
          <div className="w-11 h-11 rounded-full border border-cozy-babyPink/80 bg-gradient-to-b from-white via-cozy-cream to-[#F5ECE1] flex items-center justify-center shadow-inner-soft">
            {/* 1. Classic Triangle Cheesecake */}
            {snack === 'CHEESECAKE' && (
              <svg viewBox="0 0 36 36" className="w-9 h-9 drop-shadow-sm">
                {/* Biscuit Graham Crust Bottom */}
                <path d="M 6 26 L 30 26 L 32 30 L 4 30 Z" fill="#C48E59" stroke="#5D4037" strokeWidth="1" />
                {/* Yellow Butter Cheesecake Body */}
                <path d="M 6 26 L 24 8 L 30 26 Z" fill="#FDF3B7" stroke="#5D4037" strokeWidth="1.2" />
                {/* Strawberry Glaze Drop on Top */}
                <path d="M 23 9 C 21 12 25 15 23 18 C 21 16 22 13 24 10 Z" fill="#E63946" />
                {/* Mini Strawberry Fruit on Top */}
                <circle cx="24" cy="7" r="3" fill="#E63946" stroke="#5D4037" strokeWidth="0.8" />
                <path d="M 24 4 L 25 2" stroke="#4D7C0F" strokeWidth="1" strokeLinecap="round" />
              </svg>
            )}

            {/* 2. Golden Choco Chip Cookie */}
            {snack === 'CHOCO_COOKIE' && (
              <svg viewBox="0 0 36 36" className="w-9 h-9 drop-shadow-sm">
                {/* Cookie Disc */}
                <circle cx="18" cy="18" r="14" fill="#D9A066" stroke="#5D4037" strokeWidth="1.2" />
                {/* Baked Texture Rim */}
                <circle cx="18" cy="18" r="12" fill="none" stroke="#C4884B" strokeWidth="1" strokeDasharray="3,2" />
                {/* Dark Chocolate Chips */}
                <rect x="11" y="11" width="3.5" height="3" rx="1" fill="#3B2219" />
                <rect x="21" y="12" width="3" height="3.5" rx="1" fill="#3B2219" />
                <rect x="16" y="17" width="4" height="3.5" rx="1.2" fill="#3B2219" />
                <rect x="10" y="21" width="3.5" height="3" rx="1" fill="#3B2219" />
                <rect x="22" y="21" width="3.5" height="3.5" rx="1" fill="#3B2219" />
              </svg>
            )}

            {/* 3. Soft Matcha Green Cookie */}
            {snack === 'MATCHA_COOKIE' && (
              <svg viewBox="0 0 36 36" className="w-9 h-9 drop-shadow-sm">
                {/* Matcha Cookie Disc */}
                <circle cx="18" cy="18" r="14" fill="#A8BF9E" stroke="#5D4037" strokeWidth="1.2" />
                {/* Baked Matcha Texture Rim */}
                <circle cx="18" cy="18" r="12" fill="none" stroke="#8DA882" strokeWidth="1" strokeDasharray="3,2" />
                {/* White Chocolate Chips */}
                <rect x="12" y="11" width="3.5" height="3" rx="1" fill="#FFFDF0" stroke="#8DA882" strokeWidth="0.5" />
                <rect x="21" y="13" width="3" height="3.5" rx="1" fill="#FFFDF0" stroke="#8DA882" strokeWidth="0.5" />
                <rect x="15" y="17" width="4" height="3.5" rx="1.2" fill="#FFFDF0" stroke="#8DA882" strokeWidth="0.5" />
                <rect x="10" y="20" width="3.5" height="3" rx="1" fill="#FFFDF0" stroke="#8DA882" strokeWidth="0.5" />
                <rect x="22" y="20" width="3.5" height="3" rx="1" fill="#FFFDF0" stroke="#8DA882" strokeWidth="0.5" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Description Badges below Plate */}
      <div className="flex flex-col items-center mt-1">
        <span className="text-[10px] font-black text-cozy-espresso leading-tight">
          {label}
        </span>
        <span className="mt-0.5 px-1 py-0.2 rounded-md bg-amber-100 text-[8px] font-bold text-amber-900 border border-amber-300 shadow-2xs">
          🍰 Patisserie
        </span>
      </div>
    </div>
  );
};
