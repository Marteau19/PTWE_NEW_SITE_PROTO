/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'eco-green': '#64A70B',
        'eco-green-dark': '#4E8208',
        'eco-green-tint': '#EAF3DE',
        'eco-navy': '#041E42',
        'eco-body': '#3A4A50',
        'eco-offwhite': '#F7F6F1',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      transitionTimingFunction: {
        'eco-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      boxShadow: {
        'eco-card': '0 10px 40px -12px rgba(4, 30, 66, 0.18)',
        'eco-soft': '0 4px 24px -8px rgba(4, 30, 66, 0.12)',
        'eco-phone': '0 40px 80px -24px rgba(4, 30, 66, 0.45)',
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(0.6)', opacity: '0.7' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        'status-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.92)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '40%': { opacity: '1' },
          '80%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22,1,0.36,1) infinite',
        'status-pulse': 'status-pulse 2.2s ease-in-out infinite',
        'scroll-cue': 'scroll-cue 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
