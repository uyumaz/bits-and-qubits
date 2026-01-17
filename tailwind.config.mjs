/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.700'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-links': theme('colors.indigo.600'),
            '--tw-prose-code': theme('colors.indigo.600'),
            '--tw-prose-pre-bg': theme('colors.zinc.900'),
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: theme('colors.zinc.100'),
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc.300'),
            '--tw-prose-headings': theme('colors.zinc.100'),
            '--tw-prose-links': theme('colors.indigo.400'),
            '--tw-prose-code': theme('colors.indigo.400'),
            '--tw-prose-pre-bg': theme('colors.zinc.800'),
            code: {
              backgroundColor: theme('colors.zinc.800'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
};
