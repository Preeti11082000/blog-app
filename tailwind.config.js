/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Merriweather', 'serif'],
        display: ['Fraunces', 'serif'],
      },
      colors: {
        paper: '#FFFBF5',
        ink: {
          50: '#f8f8f7',
          100: '#f0efe9',
          900: '#111111',
          800: '#1a1a1a',
        },
        accent: {
          DEFAULT: '#FF4D2E',
          light: '#FF6B4A',
          muted: '#FFF0EC',
        },
        mustard: '#F2C94C',
        forest: '#0B3D2E',
      },
      boxShadow: {
        hard: '6px 6px 0px 0px #111111',
        'hard-sm': '4px 4px 0px 0px #111111',
        'hard-lg': '8px 8px 0px 0px #111111',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
