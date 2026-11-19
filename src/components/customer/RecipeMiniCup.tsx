import React from 'react';
import { DrinkBase, FoamOption, IceOption, ToppingOption } from '../../types/game';

interface RecipeMiniCupProps {
  drink: {
    base: DrinkBase;
    ice: IceOption;
    topping?: ToppingOption;
    foam?: FoamOption;
  };
}

export const RecipeMiniCup: React.FC<RecipeMiniCupProps> = ({ drink }) => {
  const { base, ice, topping, foam } = drink;

  // Base liquid color
  const baseColor = base === 'MATCHA' ? '#9BB59A' : '#D4A373';
  const baseLabel = base === 'MATCHA' ? 'Matcha' : 'Milk Tea';

  // Foam details
  const hasFoam = foam && foam !== 'NONE';
  const foamColor =
    foam === 'STRAWBERRY_FOAM'
      ? '#FFD0CD'
      : foam === 'UBE_FOAM'
      ? '#C5B3D9'
      : '#FFF8E7';

  const foamLabel =
    foam === 'STRAWBERRY_FOAM'
      ? '🍓 Strawberry'
      : foam === 'UBE_FOAM'
      ? '🍠 Ube'
      : foam === 'ORIGINAL_FOAM'
      ? '🥛 Ori Cream'
      : null;

  return (
    <div className="flex flex-col items-center select-none">
      {/* Visual Glass Container */}
      <div className="relative w-12 h-16 flex flex-col justify-end">
        {/* Striped Pastel Straw */}
        <div className="absolute -top-3.5 right-2 w-2 h-7 bg-white rounded-t-sm rotate-12 overflow-hidden border border-cozy-choco/50 z-20 shadow-xs">
          <div className="w-full h-1 bg-cozy-blush" />
          <div className="w-full h-1 bg-white mt-1" />
          <div className="w-full h-1 bg-cozy-blush mt-1" />
          <div className="w-full h-1 bg-white mt-1" />
        </div>

        {/* Glass Cup Body */}
        <div className="relative w-full h-14 bg-white/40 border-2 border-cozy-choco/70 rounded-b-xl rounded-t-xs overflow-hidden flex flex-col justify-end shadow-inner-soft">
          {/* Glass Specular Reflection Highlight (Left) */}
          <div className="absolute top-1 left-1 bottom-1 w-1 bg-white/60 rounded-full z-15 pointer-events-none" />

          {/* Top Foam Layer */}
          {hasFoam && (
            <div
              style={{ backgroundColor: foamColor }}
              className="absolute top-0 left-0 right-0 h-4 border-b border-black/10 z-10 flex items-center justify-center shadow-xs"
            >
              {/* Foam micro bubbles texture */}
              <div className="w-full h-full flex items-center justify-around px-0.5 opacity-60">
                <span className="w-1 h-1 rounded-full bg-white/80" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                <span className="w-1 h-1 rounded-full bg-white/70" />
              </div>
            </div>
          )}

          {/* Liquid Base */}
          <div
            style={{ backgroundColor: baseColor }}
            className="w-full flex-1 relative flex flex-col justify-end overflow-hidden"
          >
            {/* Floating Ice Cubes */}
            {ice === 'NORMAL_ICE' && (
              <div className="absolute inset-0 flex items-center justify-around px-1 z-5">
                <div className="w-2.5 h-2.5 bg-white/50 border border-white/70 rounded-xs rotate-12 shadow-xs" />
                <div className="w-2.5 h-2.5 bg-white/60 border border-white/80 rounded-xs -rotate-6 shadow-xs" />
              </div>
            )}

            {/* Boba Pearls at the bottom */}
            {topping === 'BOBA' && (
              <div className="w-full h-3 bg-black/10 flex items-center justify-center gap-0.5 px-0.5 z-10">
                <div className="w-2 h-2 rounded-full bg-[#3B2219] border border-[#22130E] relative shadow-xs">
                  <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white/80" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#3B2219] border border-[#22130E] relative shadow-xs -mt-1">
                  <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white/80" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#3B2219] border border-[#22130E] relative shadow-xs">
                  <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white/80" />
                </div>
                <div className="w-2 h-2 rounded-full bg-[#3B2219] border border-[#22130E] relative shadow-xs -mt-0.5">
                  <span className="absolute top-0.5 left-0.5 w-0.5 h-0.5 rounded-full bg-white/80" />
                </div>
              </div>
            )}

            {/* Jelly Cubes at the bottom */}
            {topping === 'JELLY' && (
              <div className="w-full h-3 bg-black/10 flex items-center justify-center gap-0.5 px-0.5 z-10">
                <div className="w-2 h-2 bg-amber-400/80 border border-amber-600 rounded-xs" />
                <div className="w-2 h-2 bg-amber-400/80 border border-amber-600 rounded-xs" />
                <div className="w-2 h-2 bg-amber-400/80 border border-amber-600 rounded-xs" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description Badges below cup */}
      <div className="flex flex-col items-center mt-1">
        <span className="text-[10px] font-black text-cozy-espresso leading-tight">
          {baseLabel}
        </span>
        <div className="flex flex-wrap items-center justify-center gap-0.5 mt-0.5">
          {foamLabel && (
            <span
              style={{ backgroundColor: foamColor }}
              className="px-1 py-0.2 rounded-md text-[8px] font-bold text-cozy-espresso border border-cozy-choco/20 shadow-2xs"
            >
              {foamLabel}
            </span>
          )}
          {topping === 'BOBA' && (
            <span className="px-1 py-0.2 rounded-md bg-[#3B2219] text-white text-[8px] font-bold shadow-2xs">
              +Boba
            </span>
          )}
          <span className="px-1 py-0.2 rounded-md bg-white/80 text-[8px] font-bold text-cozy-choco/80 border border-cozy-blush/60 shadow-2xs">
            {ice === 'NORMAL_ICE' ? '🧊 Es' : '🚫 No Ice'}
          </span>
        </div>
      </div>
    </div>
  );
};
