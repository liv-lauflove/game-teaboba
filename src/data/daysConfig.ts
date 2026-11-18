import { DayConfig, CustomerVisual } from '../types/game';

export interface CustomerPreset {
  name: string;
  avatar: string;
  quote: string;
  visual: CustomerVisual;
}

export const DAYS_CONFIG: DayConfig[] = [
  {
    dayNumber: 1,
    title: "Grand Opening",
    storyNote: "Hari pertama kafe buka! Pelanggan ingin mencicipi Classic Milk Tea hangat dengan Boba kenyal dan Choco Cookie.",
    targetCoins: 50,
    timeLimitSeconds: 60,
    unlockedBases: ['MILK_TEA'],
    unlockedFoams: [],
    unlockedToppings: ['BOBA'],
    unlockedSnacks: ['CHOCO_COOKIE']
  },
  {
    dayNumber: 2,
    title: "Aroma Matcha & Cheesecake",
    storyNote: "Menu baru telah hadir! Sajikan Matcha Latte dengan Original Milk Foam lembut di atasnya dan potongan Classic Cheesecake.",
    targetCoins: 100,
    timeLimitSeconds: 75,
    unlockedBases: ['MILK_TEA', 'MATCHA'],
    unlockedFoams: ['ORIGINAL_FOAM'],
    unlockedToppings: ['BOBA'],
    unlockedSnacks: ['CHOCO_COOKIE', 'CHEESECAKE']
  },
  {
    dayNumber: 3,
    title: "Festival Foam Warna-Warni",
    storyNote: "Pelanggan mulai penasaran dengan Ube Foam ungu dan Strawberry Foam pink di atas Matcha mereka!",
    targetCoins: 160,
    timeLimitSeconds: 90,
    unlockedBases: ['MILK_TEA', 'MATCHA'],
    unlockedFoams: ['ORIGINAL_FOAM', 'UBE_FOAM', 'STRAWBERRY_FOAM'],
    unlockedToppings: ['BOBA', 'JELLY'],
    unlockedSnacks: ['CHOCO_COOKIE', 'CHEESECAKE', 'MATCHA_COOKIE']
  },
  {
    dayNumber: 4,
    title: "Weekend Sweet Rush",
    storyNote: "Kafe semakin ramai dan viral! Layani semua kombo minuman boba dan kue dengan cepat dan cermat.",
    targetCoins: 220,
    timeLimitSeconds: 90,
    unlockedBases: ['MILK_TEA', 'MATCHA'],
    unlockedFoams: ['ORIGINAL_FOAM', 'UBE_FOAM', 'STRAWBERRY_FOAM'],
    unlockedToppings: ['BOBA', 'JELLY'],
    unlockedSnacks: ['CHOCO_COOKIE', 'CHEESECAKE', 'MATCHA_COOKIE']
  }
];

export const CUSTOMER_PRESETS: CustomerPreset[] = [
  {
    name: "Mimi",
    avatar: "🎀",
    quote: "Aku mau minuman yang manis dan imut ya!",
    visual: {
      id: 'mimi',
      hairColor: '#E098A5', // cute pastel rose
      hairStyle: 'TWIN_BUNS',
      shirtColor: '#F7DAD9', // baby pink
      accessory: 'RIBBON',
      skinTone: '#FFF0E5'
    }
  },
  {
    name: "Luna",
    avatar: "🌸",
    quote: "Lagi santai sepulang kuliah, mau pesan sesuatu yang hangat.",
    visual: {
      id: 'luna',
      hairColor: '#A899C2', // lavender purple
      hairStyle: 'LONG_WAVY',
      shirtColor: '#E8DFF5', // soft lilac
      accessory: 'BERET',
      skinTone: '#FFF5EB'
    }
  },
  {
    name: "Chloë",
    avatar: "🍰",
    quote: "Kue di etalasemu wangi banget dari luar!",
    visual: {
      id: 'chloe',
      hairColor: '#F3D296', // warm honey blonde
      hairStyle: 'BLONDE_CURLS',
      shirtColor: '#FBF2C0', // vanilla butter
      accessory: 'APRON',
      skinTone: '#FFF2E8'
    }
  },
  {
    name: "Aoi",
    avatar: "🍵",
    quote: "Paling suka matcha dengan foam estetik untuk difoto!",
    visual: {
      id: 'aoi',
      hairColor: '#3A3F47', // sleek dark slate
      hairStyle: 'STRAIGHT_DARK',
      shirtColor: '#D4E5D4', // soft matcha cardigan
      accessory: 'GLASSES',
      skinTone: '#FFF0EA'
    }
  },
  {
    name: "Bella",
    avatar: "✨",
    quote: "Butuh boba manis untuk recharge hari ini~",
    visual: {
      id: 'bella',
      hairColor: '#C4815E', // soft caramel brown
      hairStyle: 'BOB_CUT',
      shirtColor: '#FFD0CD', // soft blush coral
      accessory: 'FLOWER',
      skinTone: '#FFF3EB'
    }
  }
];
