const colors = {
  flatRed: {
    light: '#E74C3C',
    dark: '#C0392C',
  },
  flatOrange: {
    light: '#E67E23',
    dark: '#D35400',
  },
  flatYellow: {
    light: '#FFCD0E',
    dark: '#FFA800',
  },
  flatSand: {
    light: '#EFDEB4',
    dark: '#D6C194',
  },
  flatNavyBlue: {
    light: '#34495E',
    dark: '#2C3F50',
  },
  flatBlack: {
    light: '#2C2C2B',
    dark: '#272727',
  },
  flatMagenta: {
    light: '#9B59B7',
    dark: '#8E44AC',
  },
  flatTeal: {
    light: '#396F81',
    dark: '#356272',
  },
  flatSkyBlue: {
    light: '#3598DB',
    dark: '#2880B9',
  },
  flatGreen: {
    light: '#2FCC70',
    dark: '#26AE60',
  },
  flatMint: {
    light: '#1ABC9B',
    dark: '#169F84',
  },
  flatWhite: {
    light: '#EDF0F1',
    dark: '#BEC3C6',
  },
  flatGray: {
    light: '#95A5A6',
    dark: '#7E8C8D',
  },
  flatForestGreen: {
    light: '#355F40',
    dark: '#2D5036',
  },
  flatPurple: {
    light: '#735DC5',
    dark: '#5B48A2',
  },
  flatBrown: {
    light: '#5D4534',
    dark: '#503B2C',
  },
  flatPlum: {
    light: '#5E345E',
    dark: '#4F2C4F',
  },
  flatWatermelon: {
    light: '#EE707A',
    dark: '#D95459',
  },
  flatLime: {
    light: '#A4C53A',
    dark: '#8DB022',
  },
  flatPink: {
    light: '#F47BC3',
    dark: '#D45C9F',
  },
  flatMaroon: {
    light: '#79302A',
    dark: '#652622',
  },
  flatCoffee: {
    light: '#A38670',
    dark: '#8E725E',
  },
  flatPowderBlue: {
    light: '#B8CAF2',
    dark: '#98ABD5',
  },
  flatBlue: {
    light: '#5064A1',
    dark: '#394C80',
  },
} as const

export const flatColorsArray = Object.values(colors)
  .map(color => [color.light, color.dark])
  .reduce((a, b) => a.concat(b), [])

export default colors
