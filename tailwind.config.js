/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        '[auto_auto_1fr]': 'auto auto 1fr', 
      },
      keyframes: {
        slowpulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.025)' }, // 102.5%
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        slowpulse: 'slowpulse 5s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
