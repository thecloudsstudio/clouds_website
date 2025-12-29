/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js}",
    "./*.html",
    "./assets/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'ultra-light': ['4rem', { lineHeight: '1.1', fontWeight: '100' }],
        'hero': ['3.5rem', { lineHeight: '1.2', fontWeight: '200' }],
        'section': ['2.5rem', { lineHeight: '1.3', fontWeight: '300' }],
      },
      spacing: {
        '18': '4.5rem',
        '28': '7rem',
        '32': '8rem',
        '36': '9rem',
        '44': '11rem',
        '52': '13rem',
        '60': '15rem',
        '68': '17rem',
        '76': '19rem',
        '84': '21rem',
        '92': '23rem',
        '100': '25rem',
      },
      colors: {
        'clouds': {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#1a1e22',
        },
        'point': {
          'ultra-light': '#fafafa',
          'text-ultra': '#1a1a1a',
          'text-light': '#666666',
          'border-light': '#e5e5e5',
          'accent': '#2563eb',
        }
      },
      backdropBlur: {
        '4xl': '72px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}