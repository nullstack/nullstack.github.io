
const { spacing } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.njs",
    "./src/**/*.jsx",
    "./src/**/*.nts",
    "./src/**/*.tsx",
  ],
  // darkMode: "class",
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      '32': '8rem',
    },
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '0': '0%',
      '70': '70%',
      '100': '100%',
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            'h2,h3,h4': {
              'scroll-margin-top': spacing[32]
            },
            code: { backgroundColor: theme('colors.gray.100') },
            blockquote: {
              fontStyle: 'normal',
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::before': false,
            'code::before': false,
            'code::after': false
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            blockquote: {
              borderLeftColor: theme('colors.gray.700'),
              color: theme('colors.gray.300')
            },
            a: {
              color: theme('colors.gray.300')
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.300')
            },
            'h2,h3,h4': {
              color: theme('colors.gray.100'),
              'scroll-margin-top': spacing[32]
            },
            hr: { borderColor: theme('colors.gray.700') },
            ol: {
              li: {
                '&:before': { color: theme('colors.gray.500') }
              }
            },
            ul: {
              li: {
                '&:before': { backgroundColor: theme('colors.gray.500') }
              }
            },
            strong: { color: theme('colors.gray.300') },
            thead: {
              color: theme('colors.gray.100')
            },
            tbody: {
              tr: {
                borderBottomColor: theme('colors.gray.700')
              }
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
