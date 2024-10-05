module.exports = {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-right': 'env(safe-area-inset-right)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
      },
      colors: {
        primary: {
          light: 'rgba(225, 255, 180, 0.3)',
          dark: '#171717',
          titleLight: 'rgb(185, 240, 100, .8)',
          titleDark: 'rgba(0,0,0,0.7)',
          buttonLight: '#fcd34d',
          buttonDark: 'rgb(245,158,11)',
          buttonLightHover: 'rgb(251,191,36)',
          buttonDarkHover: '#d97706',
          buttonLightActive: '#fcd34d',
          buttonDarkActive: '##b45309',
          buttonDarkTransparent: 'rgba(0,0,0,0.7)',
          buttonDarkTransparentHover: 'rgba(0,0,0,0.8)',
          buttonDarkTransparentActive: 'rgba(0,0,0,0.9)'
        },
      },
    },
    plugins: [],
  }
};
