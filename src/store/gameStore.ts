import { create } from 'zustand';
import { DrinkBase, DrinkRecipe, FoamOption, GameStatus, IceOption, SnackOption, ToppingOption, CustomerOrder, CustomerExpression } from '../types/game';
import { DAYS_CONFIG, CUSTOMER_PRESETS } from '../data/daysConfig';
import { getCustomerDialogue } from '../data/dialogueDatabase';

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

  // Dialogue & GPGP Interaction
  customerPatience: number;
  customerExpression: CustomerExpression;
  isOrderConfirmed: boolean;
  isClarified: boolean;
  patiencePenaltyTrigger: number;

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
  confirmOrder: () => void;
  askClarification: () => void;
  setExpression: (expression: CustomerExpression) => void;
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

// Helper: Technical recipe explanation generator (GPGP What? response)
export function getRecipeClarification(order: { drink: CustomerOrder['drink']; snack: SnackOption }): string {
  const parts: string[] = [];

  if (order.drink) {
    const iceText = order.drink.ice === 'NO_ICE' ? 'tanpa es' : 'dingin';
    if (order.drink.base === 'MATCHA') {
      let foamText = '';
      if (order.drink.foam === 'STRAWBERRY_FOAM') foamText = ' + Strawberry Foam pink di atasnya';
      else if (order.drink.foam === 'UBE_FOAM') foamText = ' + Ube Foam ungu di atasnya';
      else if (order.drink.foam === 'ORIGINAL_FOAM') foamText = ' + Original Milk Foam lembut di atasnya';

      parts.push(`Matcha ${iceText}${foamText}`);
    } else {
      let toppingText = '';
      if (order.drink.topping === 'BOBA') toppingText = ' + topping Boba kenyal';
      else if (order.drink.topping === 'JELLY') toppingText = ' + Grass Jelly';

      parts.push(`Milk Tea ${iceText}${toppingText}`);
    }
  }

  if (order.snack !== 'NONE') {
    if (order.snack === 'CHEESECAKE') parts.push('sepotong Classic Cheesecake');
    else if (order.snack === 'CHOCO_COOKIE') parts.push('Choco Chip Cookie');
    else if (order.snack === 'MATCHA_COOKIE') parts.push('Matcha Cookie');
  }

  if (parts.length === 0) return 'Maksudku: apa saja yang manis dan lezat ya, terima kasih!';
  return `Maksudku: ${parts.join(' dan ')} ya, terima kasih!`;
}

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

  const dialogueEntry = getCustomerDialogue(customer.name, drinkOrder, snackOrder);

  return {
    id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    customerName: customer.name,
    customerAvatar: customer.avatar,
    customerVisual: customer.visual,
    dialogue: dialogueEntry.initial,
    clarificationText: dialogueEntry.clarification || getRecipeClarification({ drink: drinkOrder, snack: snackOrder }),
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

  // Dialogue & GPGP Interaction
  customerPatience: 100,
  customerExpression: 'NEUTRAL',
  isOrderConfirmed: false,
  isClarified: false,
  patiencePenaltyTrigger: 0,

  currentCup: { ...initialCup },
  currentSnack: 'NONE',

  returnToTitle: () => {
    set({
      status: 'TITLE',
      isPaused: false,
      activeOrder: null,
      customerPatience: 100,
      customerExpression: 'NEUTRAL',
      isOrderConfirmed: false,
      isClarified: false,
      patiencePenaltyTrigger: 0,
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
      customerPatience: 100,
      customerExpression: 'NEUTRAL',
      isOrderConfirmed: false,
      isClarified: false,
      patiencePenaltyTrigger: 0,
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
      customerPatience: 100,
      customerExpression: 'NEUTRAL',
      isOrderConfirmed: false,
      isClarified: false,
      patiencePenaltyTrigger: 0,
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
      customerPatience: 100,
      customerExpression: 'NEUTRAL',
      isOrderConfirmed: false,
      isClarified: false,
      patiencePenaltyTrigger: 0,
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

  confirmOrder: () => {
    const { customerPatience } = get();
    set({
      isOrderConfirmed: true,
      customerExpression: customerPatience < 40 ? 'ANXIOUS' : 'NEUTRAL'
    });
  },

  askClarification: () => {
    const { activeOrder, customerPatience, patiencePenaltyTrigger } = get();
    if (!activeOrder) return;
    const newPatience = Math.max(10, customerPatience - 8);
    set({
      customerPatience: newPatience,
      customerExpression: newPatience < 40 ? 'ANXIOUS' : 'NEUTRAL',
      isClarified: true,
      patiencePenaltyTrigger: patiencePenaltyTrigger + 1
    });
  },

  setExpression: (customerExpression: CustomerExpression) => {
    set({ customerExpression });
  },

  tickTimer: () => {
    const {
      timeLeft, status, dayCoins, currentDay, isPaused,
      activeOrder, customerPatience, customerExpression, servedWrongCount
    } = get();
    if (status !== 'PLAYING' || isPaused) return;

    if (timeLeft <= 1) {
      // Day is over! Check if target reached
      const config = DAYS_CONFIG.find(d => d.dayNumber === currentDay) || DAYS_CONFIG[0];
      const isSuccess = dayCoins >= config.targetCoins;
      set({
        timeLeft: 0,
        status: isSuccess ? 'DAY_SUMMARY' : 'GAME_OVER'
      });
      return;
    }

    // ponytail: reuse existing 1s tickTimer (1.25%/s == 1%/0.8s) instead of a second 800ms interval
    if (!activeOrder) {
      set({ timeLeft: timeLeft - 1 });
      return;
    }

    const nextPatience = Math.max(0, Math.round((customerPatience - 1.25) * 100) / 100);
    if (nextPatience <= 0) {
      set({
        timeLeft: timeLeft - 1,
        servedWrongCount: servedWrongCount + 1,
        customerPatience: 100,
        customerExpression: 'NEUTRAL',
        isOrderConfirmed: false,
        isClarified: false,
        patiencePenaltyTrigger: 0,
        currentCup: { ...initialCup },
        currentSnack: 'NONE',
        feedbackMessage: { text: 'Pelanggan pergi karena terlalu lama menunggu 😿', type: 'error' },
        activeOrder: generateRandomOrder(currentDay),
      });
      return;
    }

    set({
      timeLeft: timeLeft - 1,
      customerPatience: nextPatience,
      customerExpression: nextPatience < 40 && customerExpression === 'NEUTRAL' ? 'ANXIOUS' : customerExpression,
    });
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
    const { customerPatience } = get();
    set({
      currentCup: { ...initialCup },
      currentSnack: 'NONE',
      customerExpression: customerPatience < 40 ? 'ANXIOUS' : 'NEUTRAL',
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
        customerPatience: 100,
        customerExpression: 'HAPPY',
        isOrderConfirmed: false,
        isClarified: false,
        patiencePenaltyTrigger: 0,
        currentCup: { ...initialCup },
        currentSnack: 'NONE',
        feedbackMessage: { text: `Sempurna! +${reward} Koin 🌸`, type: 'success' },
        activeOrder: generateRandomOrder(currentDay)
      });
      return { success: true, coins: reward };
    } else {
      set({
        servedWrongCount: servedWrongCount + 1,
        customerExpression: servedWrongCount >= 1 ? 'ANGRY' : 'SURPRISED',
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
