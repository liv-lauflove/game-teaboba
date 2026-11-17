import { DayConfig } from '../types/game';

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

export const CUSTOMER_PRESETS = [
  { name: "Mimi", avatar: "🎀", quote: "Aku mau minuman yang manis dan imut ya!" },
  { name: "Luna", avatar: "🌸", quote: "Lagi santai sepulang kuliah, mau pesan sesuatu yang hangat." },
  { name: "Chloë", avatar: "🍰", quote: "Kue di etalasemu wangi banget dari luar!" },
  { name: "Aoi", avatar: "🍵", quote: "Paling suka matcha dengan foam estetik untuk difoto!" },
  { name: "Bella", avatar: "✨", quote: "Butuh boba manis untuk recharge hari ini~" }
];
