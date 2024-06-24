module.exports = {
  darkMode: 'selector',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: 'rgba(225, 255, 180, 0.3)',
          dark: '#171717',
          titleLight: 'rgb(185, 240, 100, .8)',
          titleDark: 'rgb(55, 120, 50, .5)',
          buttonLight: '#fcd34d',
          buttonDark: 'rgb(245,158,11)',
          buttonLightHover: 'rgb(251,191,36)',
          buttonDarkHover: '#d97706',
          buttonLightActive: '#fcd34d',
          buttonDarkActive: '##b45309',
          buttonDarkTransparent: 'rgba(0,0,0,0.7)'
        },
      },
    },
    plugins: [],
  }
};
