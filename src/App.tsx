import React from 'react';
import { useGameStore } from './store/gameStore';
import { TitleScreen } from './components/title/TitleScreen';
import { MobileFrame } from './components/layout/MobileFrame';
import { RecipeBookModal } from './components/modals/RecipeBookModal';

export const App: React.FC = () => {
  const { status } = useGameStore();

  return (
    <div className="w-full min-h-screen">
      {status === 'TITLE' ? (
        <>
          <TitleScreen />
          <RecipeBookModal />
        </>
      ) : (
        <MobileFrame />
      )}
    </div>
  );
};

export default App;
