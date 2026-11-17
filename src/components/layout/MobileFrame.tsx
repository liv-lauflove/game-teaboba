import React from 'react';
import { GameHeader } from '../header/GameHeader';
import { CustomerArea } from '../customer/CustomerArea';
import { TrayArea } from '../tray/TrayArea';
import { IngredientRack } from '../controls/IngredientRack';
import { DayBriefingModal } from '../modals/DayBriefingModal';
import { DaySummaryModal } from '../modals/DaySummaryModal';
import { PauseModal } from '../modals/PauseModal';
import { RecipeBookModal } from '../modals/RecipeBookModal';
import { useGameStore } from '../../store/gameStore';

export const MobileFrame: React.FC = () => {
  const { status } = useGameStore();

  return (
    <div className="min-h-screen w-full bg-[#3B2F2F] bg-gradient-to-br from-[#2E2424] via-[#3B2F2F] to-[#251D1D] flex items-center justify-center p-2 sm:p-4">
      {/* 9:16 Mobile Aspect Screen Frame */}
      <div className="relative w-full max-w-[410px] h-[92vh] max-h-[850px] min-h-[660px] bg-cozy-cream rounded-[40px] shadow-2xl border-8 border-[#524136] overflow-hidden flex flex-col justify-between select-none">
        
        {/* Cute Scalloped Awning / Kanopi Kafe (Pink & Cream Stripes) */}
        <div className="w-full relative z-20">
          <div className="h-6 w-full flex overflow-hidden shadow-xs">
            <div className="flex-1 bg-cozy-babyPink"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-cozy-babyPink"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-cozy-babyPink"></div>
            <div className="flex-1 bg-white"></div>
            <div className="flex-1 bg-cozy-babyPink"></div>
            <div className="flex-1 bg-white"></div>
          </div>
          {/* Awning Scallop Curves */}
          <div className="w-full flex -mt-0.5">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-3 rounded-b-full ${
                  i % 2 === 0 ? 'bg-cozy-babyPink' : 'bg-white'
                } shadow-xs`}
              />
            ))}
          </div>

          {/* Game Stats Header */}
          <GameHeader />
        </div>

        {/* Cafe Background (Soft Wall + Mint Counter Table) */}
        <div className="flex-1 relative flex flex-col justify-between overflow-hidden bg-gradient-to-b from-cozy-babyPink/30 via-cozy-cream to-[#D6E9ED]/50">
          {/* Subtle Cafe Wall Decorative Elements */}
          <div className="absolute top-4 left-4 text-2xl opacity-40 select-none">🖼️</div>
          <div className="absolute top-6 right-5 text-2xl opacity-40 select-none">🪴</div>
          <div className="absolute top-24 left-6 text-xl opacity-20 select-none">🪟</div>

          {/* Customer & Thought Bubble Area */}
          <div className="w-full z-10 pt-1">
            <CustomerArea />
          </div>

          {/* Counter Table Top Surface & Tray Assembly Area */}
          <div className="w-full relative z-10 mt-auto bg-gradient-to-t from-cozy-mint via-cozy-mint/80 to-transparent pt-2">
            <TrayArea />
          </div>
        </div>

        {/* Bottom Ingredient Rack Controls */}
        <div className="w-full z-20">
          <IngredientRack />
        </div>

        {/* Modals & Overlays */}
        {status === 'DAY_BRIEFING' && <DayBriefingModal />}
        {(status === 'DAY_SUMMARY' || status === 'GAME_OVER') && <DaySummaryModal />}
        <PauseModal />
        <RecipeBookModal />
      </div>
    </div>
  );
};
