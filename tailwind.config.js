/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          choco: "#6F4E37",
          cream: "#FFF8E7",
          babyPink: "#F7DAD9",
          vanilla: "#FBF2C0",
          blush: "#FFD0CD",
          roseLilac: "#F0C5D4",
          mint: "#D6E9ED",
          matcha: "#9BB59A",
          ube: "#C5B3D9",
          espresso: "#4A3528",
        }
      },
      fontFamily: {
        cozy: ['"Quicksand"', '"Nunito"', 'ui-rounded', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 14px 0 rgba(111, 78, 55, 0.08)',
        'cozy': '0 6px 20px -4px rgba(111, 78, 55, 0.15)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(111, 78, 55, 0.06)'
      }
    },
  },
  plugins: [],
}
