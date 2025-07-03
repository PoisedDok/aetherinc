/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    {
      // Preserve all responsive-prefixed utilities (sm:, md:, lg:, xl:, 2xl:)
      pattern: /^(sm|md|lg|xl|2xl):/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-josefin-sans)'],
        mono: ['JetBrains Mono', 'Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // Futuristic color palette
        cyber: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        neon: {
          cyan: '#00ffff',
          pink: '#ff00ff',
          green: '#00ff00',
          purple: '#8b5cf6',
          blue: '#3b82f6',
          orange: '#ff6b00',
        },
        dark: {
          50: '#1a1a1a',
          100: '#0f0f0f',
          200: '#0a0a0a',
          300: '#050505',
          400: '#030303',
          500: '#000000',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(255, 255, 255, 0.1)',
          heavy: 'rgba(255, 255, 255, 0.15)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
        'neural-network': 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite alternate',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-fast': 'float 3s ease-in-out infinite',
        'scan': 'scan 2s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'cyber-blink': 'cyber-blink 1.5s ease-in-out infinite',
        'hologram': 'hologram 3s ease-in-out infinite',
        'data-flow': 'data-flow 8s linear infinite',
        'neural-pulse': 'neural-pulse 4s ease-in-out infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite alternate',
      },
      keyframes: {
        'glow-pulse': {
          '0%': { 
            boxShadow: '0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(0, 255, 255, 0.3), 0 0 15px rgba(0, 255, 255, 0.1)' 
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.5), 0 0 30px rgba(0, 255, 255, 0.3)' 
          },
        },
        'scan': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'matrix': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'cyber-blink': {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' },
        },
        'hologram': {
          '0%, 100%': { 
            opacity: '1',
            filter: 'hue-rotate(0deg)',
          },
          '50%': { 
            opacity: '0.8',
            filter: 'hue-rotate(90deg)',
          },
        },
        'data-flow': {
          '0%': { 
            transform: 'translateX(-100%) rotate(0deg)',
            opacity: '0',
          },
          '10%': { 
            opacity: '1',
          },
          '90%': { 
            opacity: '1',
          },
          '100%': { 
            transform: 'translateX(100vw) rotate(360deg)',
            opacity: '0',
          },
        },
        'neural-pulse': {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '0.7',
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: '1',
          },
        },
        'glitch': {
          '0%': {
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
          '20%': {
            transform: 'translate(-2px, 2px)',
            filter: 'hue-rotate(90deg)',
          },
          '40%': {
            transform: 'translate(-2px, -2px)',
            filter: 'hue-rotate(180deg)',
          },
          '60%': {
            transform: 'translate(2px, 2px)',
            filter: 'hue-rotate(270deg)',
          },
          '80%': {
            transform: 'translate(2px, -2px)',
            filter: 'hue-rotate(360deg)',
          },
          '100%': {
            transform: 'translate(0)',
            filter: 'hue-rotate(0deg)',
          },
        },
      },
      boxShadow: {
        'cyber': '0 0 20px rgba(0, 255, 255, 0.3)',
        'cyber-strong': '0 0 30px rgba(0, 255, 255, 0.6)',
        'neon-pink': '0 0 20px rgba(255, 0, 255, 0.4)',
        'neon-green': '0 0 20px rgba(0, 255, 0, 0.4)',
        'hologram': '0 8px 32px rgba(59, 130, 246, 0.3)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
      },
      backdropBlur: {
        'xs': '2px',
        'cyber': '12px',
      },
      borderRadius: {
        'cyber': '0.75rem',
        'neural': '1.5rem',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      }
    },
  },
  plugins: [],
} 