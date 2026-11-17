# 🍵 Game Design Document & PRD: Boba & Patisserie Cozy Cafe

> **Project Name:** Game Tea & Boba (Working Title: *Boba & Bakery Cozy Cafe*)  
> **Repository:** [https://github.com/liv-lauflove/game-teaboba](https://github.com/liv-lauflove/game-teaboba)  
> **Platform / Format:** Web Browser (Mobile Portrait 9:16 Aspect Ratio)  
> **Tech Stack:** React 19 + Vite + Tailwind CSS + Framer Motion + Zustand  
> **Aesthetic / Theme:** Girly, Cozy, Feminine, Homey Anime Bakery Vibes  

---

## 1. Visi & Konsep Game

Game simulasi kasir dan barista kafe santai dengan estetika lembut (*cozy pastel*). Pemain berperan sebagai pemilik kafe teh dan kue estetik yang melayani pelanggan lucu setiap harinya.

Pemain meracik pesanan minuman (**Milk Tea** dengan aneka topping atau **Matcha Latte** dengan pilihan *flavored foam*) serta menyajikan aneka camilan lezat (**Cheesecake & Cookies**) di atas nampan kayu sebelum diserahkan ke pelanggan.

---

## 2. Palet Warna & Visual Identity

Terinspirasi dari perpaduan etalase *patisserie* Paris bernuansa lembut dan kedai kue anime hangat (*warm afternoon slice-of-life*):

| Kategori | Hex Code | Deskripsi & Penggunaan |
| :--- | :--- | :--- |
| **Warm Choco** | `#6F4E37` | Outline ramah, teks utama, boba pearls |
| **Warm Cream** | `#FFF8E7` | Background utama, piring keramik, aksen putih hangat |
| **Baby Pink** | `#F7DAD9` | Dinding latar belakang kafe, kanopi toko |
| **Vanilla Butter** | `#FBF2C0` | Tubuh cheesecake, cookies renyah, lampu gantung hangat |
| **Blush Coral** | `#FFD0CD` | Balon kata pesanan (thought bubble), strawberry cream |
| **Rose Lilac** | `#F0C5D4` | Bayangan lembut, ornamen pita & bunga |
| **Mint Teal** | `#D6E9ED` | Meja counter barista / kasir kayu vintage |
| **Matcha Leaf** | `#9BB59A` | Warna dasar cairan teh matcha |
| **Ube Lavender** | `#C5B3D9` | Warna khusus Ube cold foam |
| **Soft Espresso** | `#4A3528` | Warna teks tombol agar ramah mata & kontras |

---

## 3. Core Gameplay Loop

```
[Buka Toko / Mulai Hari]
         │
         ▼
[Pelanggan Datang] ───► [Balon Pikiran (Thought Bubble) Muncul]
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
[Racik Minuman di Gelas]                    [Letakkan Snack di Piring]
- Base: Milk Tea / Matcha                   - Cheesecake / Cookie
- Es Batu: Normal / No Ice
- Topping: Boba (untuk Milk Tea)
- Foam: Ori / Ube / Strawberry (Matcha)
       └───────────────────────┬───────────────────────┘
                               │
                               ▼
                   [Tombol "Sajikan" di Nampan]
                               │
               ┌───────────────┴───────────────┐
               ▼                               ▼
       [Racikan Cocok]                 [Racikan Salah]
       + Koin & Senyuman               - Kesempatan / Tip berkurang
               └───────────────┬───────────────┘
                               │
                               ▼
                      [Timer Hari Habis]
                               │
                               ▼
        [Rekap Toko Tutup: Cek Target Koin & Lanjut Hari]
```

---

## 4. Mekanik Resep & Peraturan Perakitan

### A. Minuman (Drinks)
Setiap minuman dirakit di dalam gelas kaca transparan:
1. **Es Batu:** Normal Ice / No Ice.
2. **Kategori Minuman:**
   * **Milk Tea:**
     * Pilihan Topping: *Boba Pearls* / *Grass Jelly* / *Tanpa Topping*.
   * **Matcha Latte:**
     * Pilihan Cold Foam di atas minuman:
       * **Original Foam:** Susu putih lembut (`#FFF8E7`)
       * **Ube Foam:** Ungu pastel manis (`#C5B3D9`)
       * **Strawberry Foam:** Pink pastel buah (`#FFD0CD`)

### B. Makanan Ringan (Snacks)
Disajikan di piring keramik kecil berdampingan dengan gelas di atas nampan:
* **Classic Cheesecake:** Potongan kue keju segitiga lembut.
* **Choco Chip Cookie:** Kukis renyah berbintik cokelat hangat.
* **Matcha Cookie:** Kukis manis beraroma teh hijau.

### C. Balon Pikiran Pelanggan (Visual Clue)
Pelanggan tidak berbicara dengan teks panjang yang membingungkan, melainkan menampilkan **Balon Pikiran Gambar (Visual Icon Bubble)**:
* Gambar gelas mini dengan warna cairan + warna foam spesifik di bagian atasnya (misal: layer hijau matcha + layer pink strawberry foam).
* Gambar piring mini dengan snack yang diinginkan di sampingnya.
* *Player langsung mengenali pesanan secara intuitif tanpa perlu membaca kalimat rumit.*

---

## 5. Sistem Progresi Hari (Day System)

| Hari | Nama Hari / Suasana | Menu & Bahan Aktif | Target | Waktu |
| :---: | :--- | :--- | :---: | :---: |
| **Day 1** | *Grand Opening* | Milk Tea + Boba + Choco Cookie | 50 Koin | 60 Detik |
| **Day 2** | *Aroma Matcha* | + Matcha Base, Original Milk Foam, Cheesecake | 100 Koin | 75 Detik |
| **Day 3** | *Warna-Warni Foam* | + Ube Foam, Strawberry Foam, Matcha Cookie | 160 Koin | 90 Detik |
| **Day 4+** | *Rush Hour Cafe* | Semua bahan aktif, pesanan kombo penuh, tips pelanggan | 220 Koin | 90 Detik |

### Layar Rekap Hari (End of Day):
* Total Koin Terkumpul vs Target Hari.
* Jumlah Pelanggan Puas vs Kecewa.
* Bintang Rating Kafe (1 - 3 Bintang).
* Tombol: **"Buka Hari Berikutnya"** (jika target tercapai) atau **"Coba Lagi"** (jika gagal).

---

## 6. Arsitektur Komponen & State Management

### Tech Stack:
* **Vite + React (TypeScript / JSX)**
* **Tailwind CSS:** Tema custom menggunakan palet warna di atas.
* **Framer Motion:** Animasi tuang minuman, balon pikiran membal, koin melayang.
* **Zustand Store:**
  * `useGameStore`: Menyimpan status hari saat ini, koin, riwayat hari, skor.
  * `useTrayStore`: Menyimpan isi nampan saat ini (`currentDrink: { base, ice, foam, topping }`, `currentSnack`).
  * `useCustomerStore`: Menyimpan antrean pelanggan, pesanan aktif, timer kesabaran.

### Struktur Folder Rekomendasi:
```
src/
├── assets/             # Gambar latar, icon, audio SFX
├── components/
│   ├── layout/         # Frame 9:16 HP & background counter kafe
│   ├── customer/       # Karakter pelanggan & ThoughtBubble visual
│   ├── tray/           # Gelas (layering cairan + foam) & Piring snack
│   ├── controls/       # Rak tombol bahan (Tab: Drink Base, Foam/Topping, Snack)
│   └── modals/         # DaySummaryModal, RecipeGuideModal, GameOverModal
├── store/
│   ├── gameStore.ts    # State koin, level/day, status permainan
│   └── trayStore.ts    # State racikan yang sedang dibuat
├── types/              # Type definitions untuk pesanan dan resep
└── data/
    └── daysConfig.ts   # Konfigurasi target koin, waktu, dan bahan per hari
```

---

## 7. Rencana Roadmap Pelaksanaan (4 Tahap)

* [x] **Tahap 1: Setup Proyek, Layout 9:16 & Wireframe Meja Kafe** (Selesai)
* [x] **Tahap 2: Logika Racik Gelas, Piring & Balon Pikiran** (Selesai)
* [x] **Tahap 3: Sistem Penilaian, Timer Hari & Siklus Buka Toko** (Selesai)
* [ ] **Tahap 4: Polishing, Efek Animasi & Sound FX** (Dalam Pengerjaan via 27 Granular Issues)

---

## 8. Peta Masalah GitHub Lengkap (27 Granular Issues & 8 Milestones)

Daftar issue resmi yang telah dipecah menjadi tugas-tugas kecil di [GitHub Issues](https://github.com/liv-lauflove/game-teaboba/issues):

### Milestone 1: Navigasi, Routing & State Siklus Game (Core UX Navigation)
- [ ] **#1** `[UI/UX] Tombol Navigasi Back pada Layar Day Briefing & Day Summary`
- [ ] **#9** `[UI/UX] Komponen Modal Pause Menu & Mekanik Freeze Timer`
- [ ] **#10** `[State] Logika Reset State Bersih saat Restart Hari & Quit ke Main Menu`

### Milestone 2: Karakter Pelanggan & Dialog System ala GPGP
- [ ] **#2** `[Feature] Visual Layout Karakter Pelanggan Setengah Badan (Bust/Torso) di Balik Meja Kasir`
- [ ] **#11** `[Feature] Sistem Dua Tombol Respon Balon Dialog: [Okay] dan [What?]`
- [ ] **#3** `[Visual] Miniatur Ilustrasi Resep Dinamis di Dalam Balon Dialog Pelanggan`
- [ ] **#12** `[Content] Database Kalimat Dialog Percakapan Pelanggan (Cerita Lucu & Petunjuk Resep)`
- [ ] **#13** `[Animation] Ekspresi Wajah Pelanggan Reaktif (Netral, Senang, Cemas, Kecewa)`

### Milestone 3: Kepuasan, Kesabaran & Ekonomi Tip (Patience & Tip Jar)
- [ ] **#4** `[Gameplay] Indikator Kesabaran Pelanggan (Patience Meter) Dinamis per Waktu`
- [ ] **#14** `[Gameplay] Toples Tip Kasir (Tip Jar) & Rumus Perhitungan Bonus Koin Berdasarkan Kesabaran`
- [ ] **#15** `[Animation] Efek Partikel & Floating Numbers Koin Melayang saat Pelanggan Memberi Tip`

### Milestone 4: Perakitan Minuman & Piring Camilan (Kitchen Polish)
- [ ] **#16** `[Gameplay] Mekanik Visual Layering Cairan Minuman (Milk Tea, Matcha) & Es Batu Mengapung`
- [ ] **#17** `[Gameplay] Mekanik Cold Foam Khusus Matcha (Strawberry Pink, Ube Ungu, Ori Susu)`
- [ ] **#18** `[Gameplay] Mekanik Topping Boba Mengkilap & Sedotan Dinamis pada Gelas`
- [ ] **#19** `[Gameplay] Piring Keramik Camilan Mini & Mekanik Menata Cheesecake / Cookies`
- [ ] **#20** `[UI/UX] Animasi Sapuan Nampan & Peringatan Konfirmasi pada Tombol Reset / Buang`

### Milestone 5: Toko Dekorasi & Upgrade Kafe (Shop & Progression)
- [ ] **#5** `[Progression] Layar Toko Kafe (End-of-Day Shop) & Katalog Dekorasi Interior`
- [ ] **#21** `[Progression] Katalog Upgrade Peralatan Barista (Toples Tip Besar, Shaker Cepat, Panci Boba)`
- [ ] **#22** `[State] Sistem Penyimpanan Progres Kafe ke LocalStorage (Save & Load Game)`

### Milestone 6: Aset Seni, Ilustrasi & Gaya Anime Pastel (Art & Illustrations)
- [ ] **#6** `[Art] Desain & Integrasi Ilustrasi Karakter Pelanggan PNG Transparan (Bust View)`
- [ ] **#23** `[Art] Desain Ilustrasi PNG Bahan Minuman, Foam, Es Batu, Gelas & Kue`
- [ ] **#24** `[Art] Desain Ilustrasi Latar Belakang Kafe (Etalase Roti Paris, Counter Mint, Kanopi Striped)`

### Milestone 7: Tata Suara & Audio Kafe (SFX & BGM)
- [ ] **#7** `[Audio] Integrasi Efek Suara (SFX) Interaksi Perakitan Dapur (Pop, Tuang, Clink)`
- [ ] **#25** `[Audio] Integrasi Musik Latar Lo-Fi Cozy Cafe & Kontrol Toggle Mute (BGM & SFX)`

### Milestone 8: Responsivitas Mobile & Rilis (Optimization & Launch)
- [ ] **#8** `[Deployment] Pengaturan Build Produksi & Otomasi Deployment ke GitHub Pages / Vercel`
- [ ] **#26** `[Optimization] Ergonomi Kontrol Layar Sentuh Mobile (No-Zoom, Safe-Area Padding, Touch Target)`
- [ ] **#27** `[Feature] Dukungan PWA (Manifest, App Icon Boba & Offline Cache)`
