import { create } from 'zustand';
import { DrinkBase, DrinkRecipe, FoamOption, GameStatus, IceOption, SnackOption, ToppingOption, CustomerOrder } from '../types/game';
import { DAYS_CONFIG, CUSTOMER_PRESETS } from '../data/daysConfig';

interface GameState {
  status: GameStatus;
  currentDay: number;
  totalCoins: number;
  dayCoins: number;
  timeLeft: number;
  activeOrder: CustomerOrder | null;
  servedSuccessCount: number;
  servedWrongCount: number;
  showRecipeBook: boolean;
  isPaused: boolean;
  feedbackMessage: { text: string; type: 'success' | 'error' } | null;

  // Active Tray (Perakitan)
  currentCup: DrinkRecipe;
  currentSnack: SnackOption;

  // Actions
  returnToTitle: () => void;
  resetDaySession: () => void;
  goToTitle: () => void;
  goToBriefing: (day?: number) => void;
  startPlayingDay: () => void;
  togglePause: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  tickTimer: () => void;
  setBase: (base: DrinkBase) => void;
  setIce: (ice: IceOption) => void;
  setTopping: (topping: ToppingOption) => void;
  setFoam: (foam: FoamOption) => void;
  setSnack: (snack: SnackOption) => void;
  clearTray: () => void;
  serveOrder: () => { success: boolean; coins: number };
  nextDay: () => void;
  retryDay: () => void;
  toggleRecipeBook: () => void;
  clearFeedback: () => void;
}

const initialCup: DrinkRecipe = {
  base: null,
  ice: null,
  topping: 'NONE',
  foam: 'NONE',
};

// Helper: Generate Random Order based on currently unlocked ingredients in the day
export function generateRandomOrder(dayNumber: number): CustomerOrder {
  const config = DAYS_CONFIG.find(d => d.dayNumber === dayNumber) || DAYS_CONFIG[0];
  const customer = CUSTOMER_PRESETS[Math.floor(Math.random() * CUSTOMER_PRESETS.length)];

  // Decide if customer wants Drink, Snack, or Both!
  const hasDrink = Math.random() < 0.85 || config.dayNumber === 1; // High probability of drink
  const hasSnack = config.unlockedSnacks.length > 0 && (Math.random() < 0.6 || !hasDrink);

  let drinkOrder: CustomerOrder['drink'] = null;
  let snackOrder: SnackOption = 'NONE';
  let totalReward = 0;

  if (hasDrink) {
    const base = config.unlockedBases[Math.floor(Math.random() * config.unlockedBases.length)];
    const ice: IceOption = Math.random() > 0.3 ? 'NORMAL_ICE' : 'NO_ICE';
    let topping: ToppingOption = 'NONE';
    let foam: FoamOption = 'NONE';

    if (base === 'MILK_TEA') {
      // Milk tea can have Boba/Jelly
      if (config.unlockedToppings.length > 0 && Math.random() > 0.25) {
        topping = config.unlockedToppings[Math.floor(Math.random() * config.unlockedToppings.length)];
      }
    } else if (base === 'MATCHA') {
      // Matcha gets cold foam options
      if (config.unlockedFoams.length > 0) {
        foam = config.unlockedFoams[Math.floor(Math.random() * config.unlockedFoams.length)];
      } else {
        foam = 'ORIGINAL_FOAM';
      }
    }

    drinkOrder = { base, ice, topping, foam };
    totalReward += 25 + (topping !== 'NONE' ? 5 : 0) + (foam !== 'NONE' ? 5 : 0);
  }

  if (hasSnack) {
    snackOrder = config.unlockedSnacks[Math.floor(Math.random() * config.unlockedSnacks.length)];
    totalReward += 20;
  }

  // Fallback: If both randomly ended up null, guarantee at least a simple milk tea
  if (!drinkOrder && snackOrder === 'NONE') {
    drinkOrder = { base: 'MILK_TEA', ice: 'NORMAL_ICE', topping: 'BOBA', foam: 'NONE' };
    totalReward = 30;
  }

  return {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    customerName: customer.name,
    customerAvatar: customer.avatar,
    customerVisual: customer.visual,
    dialogue: customer.quote,
    drink: drinkOrder,
    snack: snackOrder,
    rewardCoins: totalReward
  };
}

export const useGameStore = create<GameState>((set, get) => ({
  status: 'TITLE',
  currentDay: 1,
  totalCoins: 0,
  dayCoins: 0,
  timeLeft: 60,
  activeOrder: null,
  servedSuccessCount: 0,
  servedWrongCount: 0,
  showRecipeBook: false,
  isPaused: false,
  feedbackMessage: null,

  currentCup: { ...initialCup },
  currentSnack: 'NONE',

  returnToTitle: () => {
    set({
      status: 'TITLE',
      isPaused: false,
      activeOrder: null,
      currentCup: { ...initialCup },
      currentSnack: 'NONE',
      feedbackMessage: null,
      showRecipeBook: false,
    });
  },

  resetDaySession: () => {
    const { currentDay } = get();
    const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];
    set({
      status: 'PLAYING',
      isPaused: false,
      timeLeft: config.timeLimitSeconds,
      dayCoins: 0,
      servedSuccessCount: 0,
      servedWrongCount: 0,
      currentCup: { ...initialCup },
      currentSnack: 'NONE',
      feedbackMessage: null,
      showRecipeBook: false,
      activeOrder: generateRandomOrder(currentDay),
    });
  },

  goToTitle: () => {
    get().returnToTitle();
  },

  goToBriefing: (day?: number) => {
    const targetDay = day || get().currentDay;
    const config = DAYS_CONFIG.find(d => d.dayNumber === targetDay) || DAYS_CONFIG[0];
    set({
      status: 'DAY_BRIEFING',
      isPaused: false,
      currentDay: targetDay,
      dayCoins: 0,
      timeLeft: config.timeLimitSeconds,
      servedSuccessCount: 0,
      servedWrongCount: 0,
      currentCup: { ...initialCup },
      currentSnack: 'NONE',
      feedbackMessage: null,
    });
  },

  startPlayingDay: () => {
    const { currentDay } = get();
    const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];
    set({
      status: 'PLAYING',
      isPaused: false,
      timeLeft: config.timeLimitSeconds,
      dayCoins: 0,
      servedSuccessCount: 0,
      servedWrongCount: 0,
      currentCup: { ...initialCup },
      currentSnack: 'NONE',
      activeOrder: generateRandomOrder(currentDay)
    });
  },

  togglePause: () => {
    const { status, isPaused } = get();
    if (status !== 'PLAYING') return;
    set({ isPaused: !isPaused });
  },

  pauseGame: () => {
    const { status } = get();
    if (status !== 'PLAYING') return;
    set({ isPaused: true });
  },

  resumeGame: () => {
    set({ isPaused: false });
  },

  tickTimer: () => {
    const { timeLeft, status, dayCoins, currentDay, isPaused } = get();
    if (status !== 'PLAYING' || isPaused) return;

    if (timeLeft <= 1) {
      // Day is over! Check if target reached
      const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];
      const isSuccess = dayCoins >= config.targetCoins;
      set({
        timeLeft: 0,
        status: isSuccess ? 'DAY_SUMMARY' : 'GAME_OVER'
      });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  setBase: (base: DrinkBase) => {
    set(state => ({
      currentCup: {
        ...state.currentCup,
        base,
        // Reset toppings/foams if conflicting
        foam: base === 'MILK_TEA' ? 'NONE' : state.currentCup.foam,
        topping: base === 'MATCHA' ? 'NONE' : state.currentCup.topping
      }
    }));
  },

  setIce: (ice: IceOption) => {
    set(state => ({
      currentCup: {
        ...state.currentCup,
        ice
      }
    }));
  },

  setTopping: (topping: ToppingOption) => {
    set(state => ({
      currentCup: {
        ...state.currentCup,
        topping
      }
    }));
  },

  setFoam: (foam: FoamOption) => {
    set(state => ({
      currentCup: {
        ...state.currentCup,
        foam
      }
    }));
  },

  setSnack: (snack: SnackOption) => {
    set({ currentSnack: snack });
  },

  clearTray: () => {
    set({
      currentCup: { ...initialCup },
      currentSnack: 'NONE',
      feedbackMessage: { text: "Nampan dibersihkan! 🫧", type: 'error' }
    });
  },

  serveOrder: () => {
    const { activeOrder, currentCup, currentSnack, currentDay, dayCoins, totalCoins, servedSuccessCount, servedWrongCount } = get();
    if (!activeOrder) return { success: false, coins: 0 };

    let isDrinkValid = true;
    let isSnackValid = true;

    // Validate Drink
    if (activeOrder.drink) {
      if (!currentCup.base || currentCup.base !== activeOrder.drink.base) isDrinkValid = false;
      if (currentCup.ice !== activeOrder.drink.ice) isDrinkValid = false;
      if (activeOrder.drink.base === 'MILK_TEA') {
        const expectedTopping = activeOrder.drink.topping || 'NONE';
        if (currentCup.topping !== expectedTopping) isDrinkValid = false;
      }
      if (activeOrder.drink.base === 'MATCHA') {
        const expectedFoam = activeOrder.drink.foam || 'NONE';
        if (currentCup.foam !== expectedFoam) isDrinkValid = false;
      }
    } else {
      // Order had no drink, cup should be empty
      if (currentCup.base !== null) isDrinkValid = false;
    }

    // Validate Snack
    if (currentSnack !== activeOrder.snack) {
      isSnackValid = false;
    }

    const isFullMatch = isDrinkValid && isSnackValid;

    if (isFullMatch) {
      const reward = activeOrder.rewardCoins;
      set({
        dayCoins: dayCoins + reward,
        totalCoins: totalCoins + reward,
        servedSuccessCount: servedSuccessCount + 1,
        currentCup: { ...initialCup },
        currentSnack: 'NONE',
        feedbackMessage: { text: `Sempurna! +${reward} Koin 🌸`, type: 'success' },
        activeOrder: generateRandomOrder(currentDay)
      });
      return { success: true, coins: reward };
    } else {
      set({
        servedWrongCount: servedWrongCount + 1,
        feedbackMessage: { text: "Pesanan kurang tepat! Cek lagi yaa 😿", type: 'error' }
      });
      return { success: false, coins: 0 };
    }
  },

  nextDay: () => {
    const { currentDay } = get();
    const nextDayNum = currentDay + 1;
    get().goToBriefing(nextDayNum);
  },

  retryDay: () => {
    const { currentDay } = get();
    get().goToBriefing(currentDay);
  },

  toggleRecipeBook: () => {
    set(state => ({ showRecipeBook: !state.showRecipeBook }));
  },

  clearFeedback: () => {
    set({ feedbackMessage: null });
  }
}));
