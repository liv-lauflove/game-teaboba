import { CustomerOrder, SnackOption } from '../types/game';

export interface DialogueEntry {
  initial: string;
  clarification: string;
}

// Dedicated persona-based dialogues for each cafe customer
export const CHARACTER_DIALOGUES: Record<string, Record<string, DialogueEntry[]>> = {
  Mimi: {
    BOBA_MILK_TEA: [
      {
        initial: "Hari ini ujianku berat banget, butuh yang manis-manis! Buatin milk tea dingin dengan boba kenyal yaa 🎀",
        clarification: "Maksudku: Milk Tea dingin dengan topping Boba kenyal ya, terima kasih!"
      },
      {
        initial: "Pengen boba yang banyak dong! Hariku bakal jauh lebih ceria kalau minum milk tea manis dingin hari ini ✨",
        clarification: "Maksudku: Milk Tea dingin + topping Boba kenyal ya, tolong ya!"
      },
      {
        initial: "Pita rambutku senada dengan warna boba kafe ini! Kasih aku segelas milk tea boba yang segar ya~",
        clarification: "Maksudku: Milk Tea dingin dengan topping Boba kenyal ya, terima kasih!"
      }
    ],
    MATCHA_STRAWBERRY: [
      {
        initial: "Minuman warna pink dan hijau ini imut banget di mataku! Mau matcha latte dingin pakai strawberry foam ya 🍓",
        clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, terima kasih!"
      },
      {
        initial: "Bisa buatin yang manis imut bernuansa stroberi? Matcha dengan krim pink strawberry di atasnya please!",
        clarification: "Maksudku: Matcha dingin dengan Strawberry Foam pink di atasnya ya, tolong ya!"
      },
      {
        initial: "Kata temanku strawberry cold foam di sini rasanya manis lembut kayak permen! Aku mau coba sama matcha dingin dong.",
        clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, terima kasih!"
      }
    ],
    COMBO_SWEET: [
      {
        initial: "Minum boba sambil gigit cheesecake lembut... perpaduan termanis sedunia! Buatkan keduanya ya 🍰",
        clarification: "Maksudku: Milk Tea dingin dengan Boba kenyal dan sepotong Classic Cheesecake ya!"
      },
      {
        initial: "Aku haus dan juga lapar sepulang les! Mau milk tea boba segar ditambah choco chip cookie renyah yaa.",
        clarification: "Maksudku: Milk Tea dingin dengan Boba kenyal dan Choco Chip Cookie ya, terima kasih!"
      },
      {
        initial: "Kue di etalase imut-imut sekali! Tolong seporsi cheesecake lembut dan matcha latte strawberry ya~",
        clarification: "Maksudku: Matcha dingin + Strawberry Foam pink dan sepotong Classic Cheesecake ya!"
      }
    ]
  },

  Luna: {
    CALM_TEA: [
      {
        initial: "Baru selesai kelas panjang, butuh ruang santai. Tolong segelas milk tea dingin dengan boba ya 🌸",
        clarification: "Maksudku: Milk Tea dingin dengan topping Boba kenyal ya, terima kasih!"
      },
      {
        initial: "Suasana sore ini tenang banget. Cocok ditemani milk tea hangat tanpa es dan topping jelly kenyal.",
        clarification: "Maksudku: Milk Tea tanpa es dengan Grass Jelly ya, terima kasih!"
      },
      {
        initial: "Lagi mau baca novel di sudut kafe, temani aku dengan classic milk tea dingin yang manisnya pas ya.",
        clarification: "Maksudku: Classic Milk Tea dingin tanpa topping ya, tolong ya!"
      }
    ],
    MATCHA_UBE: [
      {
        initial: "Warna lavender ube foam ini bikin rileks cuma dengan dilihat. Mau segelas matcha ube foam dingin ya 💜",
        clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, terima kasih!"
      },
      {
        initial: "Lagi kepingin aroma ube yang legit dipadu matcha teh hijau segar... bisa siapkan untukku?",
        clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, tolong ya!"
      },
      {
        initial: "Sepulang kampus pengen manjain diri. Matcha latte dingin dengan busa ube ungu di atasnya ya.",
        clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, terima kasih!"
      }
    ],
    STUDY_SNACK: [
      {
        initial: "Sepotong cheesecake dingin bakal balikin mood belajarku. Tolong sajikan bersama teh ya.",
        clarification: "Maksudku: Minuman teh pesanan dan sepotong Classic Cheesecake ya, tolong ya!"
      },
      {
        initial: "Kukis matcha ini wangi tehnya sampai ke pintu depan! Satu kukis matcha dan matcha ube ya 🍵",
        clarification: "Maksudku: Matcha dingin + Ube Foam ungu dan Matcha Cookie ya, terima kasih!"
      },
      {
        initial: "Cuma butuh camilan manis untuk teman baca buku, satu choco chip cookie renyah ya.",
        clarification: "Maksudku: Choco Chip Cookie di atas piring ya, terima kasih!"
      }
    ]
  },

  Chloë: {
    BAKERY_DELIGHT: [
      {
        initial: "Wangi panggangan cookies dari luar bener-bener menggoda! Mau choco chip cookie dan milk tea boba ya 🍪",
        clarification: "Maksudku: Milk Tea dingin dengan Boba kenyal dan Choco Chip Cookie ya, terima kasih!"
      },
      {
        initial: "Cheesecake segitiga di etalasemu teksturnya kelihatan lembut lumer. Aku mau satu porsi ya!",
        clarification: "Maksudku: sepotong Classic Cheesecake di atas piring ya, tolong ya!"
      },
      {
        initial: "Perpaduan matcha cookie renyah dan matcha latte dingin kedengarannya surga buat pecinta pastry!",
        clarification: "Maksudku: Matcha dingin dan Matcha Cookie ya, terima kasih!"
      }
    ],
    FOAM_PASSION: [
      {
        initial: "Foam susu buatanmu kelihatan lembut seperti meringue kue! Buatkan matcha dengan original milk foam ya ✨",
        clarification: "Maksudku: Matcha dingin + Original Milk Foam lembut di atasnya ya, terima kasih!"
      },
      {
        initial: "Cold foam strawberry ini harumnya mirip selai kue tart. Mau matcha latte dengan strawberry foam dong!",
        clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, tolong ya!"
      },
      {
        initial: "Sebagai pembuat kue, aku kagum sama tekstur ube foam kafe ini. Bikin satu matcha ube dingin ya!",
        clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, terima kasih!"
      }
    ]
  },

  Aoi: {
    AESTHETIC_MATCHA: [
      {
        initial: "Gradasi layer matcha di sini selalu cantik difoto! Tolong matcha dingin dengan ube foam ungu ya 🍵",
        clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, terima kasih!"
      },
      {
        initial: "Busa original milk foam putih di atas matcha hijau pekat... kontras yang elegan. Tolong satu ya!",
        clarification: "Maksudku: Matcha dingin + Original Milk Foam lembut di atasnya ya, terima kasih!"
      },
      {
        initial: "Strawberry foam pink di atas matcha dingin kelihatan fotogenik sekali untuk feed kafe-ku! Buatkan ya 📸",
        clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, tolong ya!"
      },
      {
        initial: "Sedang ingin teh hijau autentik yang segar. Matcha latte dingin tanpa foam ya, terima kasih.",
        clarification: "Maksudku: Matcha Latte dingin tanpa foam ya, tolong ya!"
      }
    ],
    ZEN_MOMENT: [
      {
        initial: "Foto sore ini bakal lengkap dengan kukis matcha dan segelas matcha latte dingin yang tenang.",
        clarification: "Maksudku: Matcha Latte dingin dan Matcha Cookie ya, terima kasih!"
      },
      {
        initial: "Warna hijau teh dan aroma kue keju... tolong sajikan matcha latte dengan sepotong cheesecake ya.",
        clarification: "Maksudku: Matcha Latte dingin dan sepotong Classic Cheesecake ya, tolong ya!"
      },
      {
        initial: "Boba hitam mengkilap di dasar gelas teh susu sangat aesthetic. Satu milk tea boba dingin ya!",
        clarification: "Maksudku: Milk Tea dingin dengan topping Boba kenyal ya, terima kasih!"
      }
    ]
  },

  Bella: {
    ENERGY_BOOST: [
      {
        initial: "Deadline menumpuk hari ini, butuh boba kenyal biar mataku tetap melek! Milk tea boba dingin please ✨",
        clarification: "Maksudku: Milk Tea dingin dengan topping Boba kenyal ya, tolong ya!"
      },
      {
        initial: "Energi sudah 5%, butuh recharge boba manis sekarang juga! Tolong buatkan secepatnya ya~",
        clarification: "Maksudku: Milk Tea dingin dengan topping Boba kenyal ya, terima kasih!"
      },
      {
        initial: "Grass jelly kenyal yang sejuk di tenggorokan plus milk tea dingin... penyelamat hariku yang sibuk!",
        clarification: "Maksudku: Milk Tea dingin dengan Grass Jelly ya, tolong ya!"
      }
    ],
    QUICK_COMBO: [
      {
        initial: "Cheesecake manis dan segelas milk tea dingin adalah bahan bakar kerja terbaik. Buatkan sepaket ya!",
        clarification: "Maksudku: Milk Tea dingin dan sepotong Classic Cheesecake ya, terima kasih!"
      },
      {
        initial: "Butuh camilan cepat di sela meeting, satu choco chip cookie renyah dan boba milk tea ya!",
        clarification: "Maksudku: Milk Tea dingin dengan Boba kenyal dan Choco Chip Cookie ya, tolong ya!"
      },
      {
        initial: "Matcha dingin dengan strawberry foam buat boost mood kerja yang lagi suntuk. Satu ya barista!",
        clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, terima kasih!"
      }
    ]
  }
};

// General fallback recipe templates ensuring 3+ distinct variations per specific drink/snack combo
export const GENERAL_RECIPE_DIALOGUES: Record<string, DialogueEntry[]> = {
  // 1. Milk Tea with Boba
  MILK_TEA_BOBA: [
    {
      initial: "Hai! Aku mau pesan Milk Tea dingin dengan mutiara boba yang kenyal dan manis ya.",
      clarification: "Maksudku: Milk Tea dingin + topping Boba kenyal di atas nampan ya, terima kasih!"
    },
    {
      initial: "Cuaca hari ini pas banget buat minum boba milk tea segar! Tolong buatkan satu porsi ya.",
      clarification: "Maksudku: Milk Tea dingin dengan Boba kenyal ya, tolong ya!"
    },
    {
      initial: "Lagi kangen banget sama boba kenyal kafe ini. Milk tea dingin pakai boba yaa!",
      clarification: "Maksudku: Milk Tea dingin + topping Boba kenyal ya, terima kasih!"
    }
  ],

  // 2. Milk Tea with Jelly
  MILK_TEA_JELLY: [
    {
      initial: "Permisi, aku mau pesan Milk Tea dingin dengan potongan grass jelly yang adem ya.",
      clarification: "Maksudku: Milk Tea dingin + Grass Jelly ya, terima kasih!"
    },
    {
      initial: "Grass jelly di sini lembut banget! Mau segelas milk tea dingin pakai jelly ya.",
      clarification: "Maksudku: Milk Tea dingin dengan Grass Jelly kenyal ya, tolong ya!"
    },
    {
      initial: "Mau yang segar tapi gak terlalu kenyal, milk tea dingin ditambah grass jelly yaa.",
      clarification: "Maksudku: Milk Tea dingin + Grass Jelly ya, terima kasih!"
    }
  ],

  // 3. Classic Milk Tea (No Topping)
  MILK_TEA_PLAIN: [
    {
      initial: "Aku kepingin rasa teh susu original yang creamy. Classic milk tea dingin tanpa topping ya.",
      clarification: "Maksudku: Classic Milk Tea dingin tanpa topping ya, terima kasih!"
    },
    {
      initial: "Tolong segelas milk tea dingin murni ya, lagi pengen nikmatin teh susunya saja hari ini.",
      clarification: "Maksudku: Milk Tea dingin tanpa topping ya, tolong ya!"
    },
    {
      initial: "Sore yang santai... satu cangkir milk tea dingin tanpa tambahan topping apa pun ya.",
      clarification: "Maksudku: Classic Milk Tea dingin ya, terima kasih!"
    }
  ],

  // 4. Matcha with Strawberry Foam
  MATCHA_STRAWBERRY_FOAM: [
    {
      initial: "Aku lihat di menu ada matcha dengan strawberry foam pink lucu! Mau coba satu dong.",
      clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, terima kasih!"
    },
    {
      initial: "Pecinta stroberi hadir! Tolong racikkan matcha latte dingin dengan lapisan strawberry cold foam ya.",
      clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, tolong ya!"
    },
    {
      initial: "Bisa buatkan minuman matcha dingin dengan mahkota busa strawberry pink yang manis?",
      clarification: "Maksudku: Matcha dingin + Strawberry Foam pink di atasnya ya, terima kasih!"
    }
  ],

  // 5. Matcha with Ube Foam
  MATCHA_UBE_FOAM: [
    {
      initial: "Warna ungu ube foam-nya estetik banget! Aku pesan matcha dingin dengan ube foam ya.",
      clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, terima kasih!"
    },
    {
      initial: "Penasaran sama rasa ube manis campur matcha teh hijau. Buatkan segelas dingin yaa!",
      clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, tolong ya!"
    },
    {
      initial: "Lagi pengen minuman pastel yang creamy. Matcha latte dingin dengan busa ube ungu ya.",
      clarification: "Maksudku: Matcha dingin + Ube Foam ungu di atasnya ya, terima kasih!"
    }
  ],

  // 6. Matcha with Original Foam
  MATCHA_ORIGINAL_FOAM: [
    {
      initial: "Tolong matcha latte dingin dengan lapisan original milk foam yang tebal dan lembut ya.",
      clarification: "Maksudku: Matcha dingin + Original Milk Foam lembut di atasnya ya, terima kasih!"
    },
    {
      initial: "Aku suka sensasi kumis susu saat minum matcha! Kasih original cold foam di atasnya ya.",
      clarification: "Maksudku: Matcha dingin + Original Milk Foam lembut di atasnya ya, tolong ya!"
    },
    {
      initial: "Matcha dingin dengan krim susu putih klasik di bagian atasnya ya, terima kasih!",
      clarification: "Maksudku: Matcha dingin + Original Milk Foam lembut di atasnya ya, terima kasih!"
    }
  ],

  // 7. Pure Matcha Latte (No Foam)
  MATCHA_PLAIN: [
    {
      initial: "Aku mau matcha latte dingin yang autentik tanpa topping foam ya.",
      clarification: "Maksudku: Matcha Latte dingin tanpa foam ya, terima kasih!"
    },
    {
      initial: "Rasa pekat teh hijau matcha dingin murni... tolong buatkan satu gelas ya.",
      clarification: "Maksudku: Matcha Latte dingin ya, tolong ya!"
    },
    {
      initial: "Cukup segelas matcha latte dingin yang segar untuk hari ini yaa.",
      clarification: "Maksudku: Matcha Latte dingin tanpa foam ya, terima kasih!"
    }
  ],

  // 8. Bakery Only: Cheesecake
  SNACK_CHEESECAKE_ONLY: [
    {
      initial: "Kue keju di etalase itu memanggilku! Tolong sepotong Classic Cheesecake ya 🍰",
      clarification: "Maksudku: sepotong Classic Cheesecake di atas piring keramik ya, terima kasih!"
    },
    {
      initial: "Lagi gak mau minum, cuma pengen ngemil cheesecake lembut lumer kafe ini.",
      clarification: "Maksudku: sepotong Classic Cheesecake ya, tolong ya!"
    },
    {
      initial: "Bisa bungkuskan sepotong cheesecake manis untuk kunikmati sekarang? Terima kasih!",
      clarification: "Maksudku: Classic Cheesecake di atas piring ya, terima kasih!"
    }
  ],

  // 9. Bakery Only: Cookies
  SNACK_COOKIE_ONLY: [
    {
      initial: "Aroma kukis cokelatnya harum banget! Aku pesan satu Choco Chip Cookie ya 🍪",
      clarification: "Maksudku: Choco Chip Cookie renyah di atas piring ya, terima kasih!"
    },
    {
      initial: "Mau camilan renyah untuk teman ngobrol, satu Choco Chip Cookie tolong yaa.",
      clarification: "Maksudku: Choco Chip Cookie ya, tolong ya!"
    },
    {
      initial: "Kukis matcha beraroma teh hijau ini menarik! Kasih aku satu Matcha Cookie ya.",
      clarification: "Maksudku: Matcha Cookie renyah di atas piring ya, terima kasih!"
    }
  ]
};

// Helper: Determine key from recipe components
export function getRecipeCategoryKey(drink: CustomerOrder['drink'], snack: SnackOption): string {
  if (drink) {
    if (drink.base === 'MATCHA') {
      if (drink.foam === 'STRAWBERRY_FOAM') return 'MATCHA_STRAWBERRY_FOAM';
      if (drink.foam === 'UBE_FOAM') return 'MATCHA_UBE_FOAM';
      if (drink.foam === 'ORIGINAL_FOAM') return 'MATCHA_ORIGINAL_FOAM';
      return 'MATCHA_PLAIN';
    } else {
      if (drink.topping === 'BOBA') return 'MILK_TEA_BOBA';
      if (drink.topping === 'JELLY') return 'MILK_TEA_JELLY';
      return 'MILK_TEA_PLAIN';
    }
  }

  if (snack === 'CHEESECAKE') return 'SNACK_CHEESECAKE_ONLY';
  return 'SNACK_COOKIE_ONLY';
}

// Helper: Generate structured clarification fallback
export function generateStructuredClarification(
  drink: CustomerOrder['drink'],
  snack: SnackOption
): string {
  const parts: string[] = [];

  if (drink) {
    const iceText = drink.ice === 'NO_ICE' ? 'tanpa es' : 'dingin';
    if (drink.base === 'MATCHA') {
      let foamText = '';
      if (drink.foam === 'STRAWBERRY_FOAM') foamText = ' + Strawberry Foam pink di atasnya';
      else if (drink.foam === 'UBE_FOAM') foamText = ' + Ube Foam ungu di atasnya';
      else if (drink.foam === 'ORIGINAL_FOAM') foamText = ' + Original Milk Foam lembut di atasnya';

      parts.push(`Matcha ${iceText}${foamText}`);
    } else {
      let toppingText = '';
      if (drink.topping === 'BOBA') toppingText = ' + topping Boba kenyal';
      else if (drink.topping === 'JELLY') toppingText = ' + Grass Jelly';

      parts.push(`Milk Tea ${iceText}${toppingText}`);
    }
  }

  if (snack !== 'NONE') {
    if (snack === 'CHEESECAKE') parts.push('sepotong Classic Cheesecake');
    else if (snack === 'CHOCO_COOKIE') parts.push('Choco Chip Cookie');
    else if (snack === 'MATCHA_COOKIE') parts.push('Matcha Cookie');
  }

  if (parts.length === 0) return 'Maksudku: apa saja yang manis dan lezat ya, terima kasih!';
  return `Maksudku: ${parts.join(' dan ')} ya, terima kasih!`;
}

// Main Selector: Resolves a rich dialogue entry matching character persona and recipe
export function getCustomerDialogue(
  customerName: string,
  drink: CustomerOrder['drink'],
  snack: SnackOption
): DialogueEntry {
  const charPools = CHARACTER_DIALOGUES[customerName];
  const recipeKey = getRecipeCategoryKey(drink, snack);
  const isCombo = drink !== null && snack !== 'NONE';

  // 1. Try to find character-specific match
  if (charPools) {
    let pool: DialogueEntry[] | undefined;

    if (isCombo) {
      pool = charPools.COMBO_SWEET || charPools.STUDY_SNACK || charPools.QUICK_COMBO || charPools.BAKERY_DELIGHT || charPools.ZEN_MOMENT;
    } else if (recipeKey === 'MILK_TEA_BOBA' && charPools.BOBA_MILK_TEA) {
      pool = charPools.BOBA_MILK_TEA;
    } else if (recipeKey === 'MATCHA_STRAWBERRY_FOAM' && charPools.MATCHA_STRAWBERRY) {
      pool = charPools.MATCHA_STRAWBERRY;
    } else if (recipeKey === 'MATCHA_UBE_FOAM' && charPools.MATCHA_UBE) {
      pool = charPools.MATCHA_UBE;
    } else if (charPools[recipeKey]) {
      pool = charPools[recipeKey];
    } else if (drink?.base === 'MATCHA' && (charPools.AESTHETIC_MATCHA || charPools.FOAM_PASSION)) {
      pool = charPools.AESTHETIC_MATCHA || charPools.FOAM_PASSION;
    } else if (drink?.base === 'MILK_TEA' && (charPools.CALM_TEA || charPools.ENERGY_BOOST)) {
      pool = charPools.CALM_TEA || charPools.ENERGY_BOOST;
    }

    if (pool && pool.length > 0) {
      const selected = pool[Math.floor(Math.random() * pool.length)];
      // If combo but template was generic, ensure clarification specifies both
      if (isCombo) {
        return {
          initial: selected.initial,
          clarification: generateStructuredClarification(drink, snack)
        };
      }
      return selected;
    }
  }

  // 2. Try general recipe category pool
  const generalPool = GENERAL_RECIPE_DIALOGUES[recipeKey];
  if (generalPool && generalPool.length > 0) {
    const selected = generalPool[Math.floor(Math.random() * generalPool.length)];
    if (isCombo) {
      return {
        initial: `${selected.initial.replace(/[.!?]+$/, '')} dan sepotong camilan manis ya!`,
        clarification: generateStructuredClarification(drink, snack)
      };
    }
    return selected;
  }

  // 3. Guaranteed structured fallback
  return {
    initial: "Halo! Aku mau pesan sesuatu yang manis dan segar untuk hari ini ya ✨",
    clarification: generateStructuredClarification(drink, snack)
  };
}
