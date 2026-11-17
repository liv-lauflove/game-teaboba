export type DrinkBase = 'MILK_TEA' | 'MATCHA';
export type IceOption = 'NORMAL_ICE' | 'NO_ICE';
export type ToppingOption = 'BOBA' | 'JELLY' | 'NONE';
export type FoamOption = 'ORIGINAL_FOAM' | 'UBE_FOAM' | 'STRAWBERRY_FOAM' | 'NONE';
export type SnackOption = 'CHEESECAKE' | 'CHOCO_COOKIE' | 'MATCHA_COOKIE' | 'NONE';

export interface DrinkRecipe {
  base: DrinkBase | null;
  ice: IceOption | null;
  topping: ToppingOption;
  foam: FoamOption;
}

export interface CustomerOrder {
  id: string;
  customerName: string;
  customerAvatar: string; // emoji or image key
  dialogue: string;
  drink: {
    base: DrinkBase;
    ice: IceOption;
    topping?: ToppingOption;
    foam?: FoamOption;
  } | null;
  snack: SnackOption;
  rewardCoins: number;
}

export interface DayConfig {
  dayNumber: number;
  title: string;
  storyNote: string;
  targetCoins: number;
  timeLimitSeconds: number;
  unlockedBases: DrinkBase[];
  unlockedFoams: FoamOption[];
  unlockedToppings: ToppingOption[];
  unlockedSnacks: SnackOption[];
}

export type GameStatus = 'TITLE' | 'DAY_BRIEFING' | 'PLAYING' | 'DAY_SUMMARY' | 'GAME_OVER';
