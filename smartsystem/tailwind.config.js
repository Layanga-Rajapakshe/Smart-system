const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'glitter-white': '#F9F9FD', // Light white with a hint of sparkle
        'glitter-purple': '#F5F3FF', // Light purple with glitter effect
      },
      backgroundImage: {
        'glitter-pattern': 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%), linear-gradient(225deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%), linear-gradient(45deg, rgba(255, 255, 255, 0.2) 25%, transparent 25%), linear-gradient(315deg, rgba(255, 255, 255, 0.2) 25%, rgba(0, 0, 0, 0) 25%)',
      },
      backgroundSize: {
        'glitter': '4px 4px',
      },  
    },
  },
  darkMode: "class",
  plugins: [
    heroui(),
  ]
}

