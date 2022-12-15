import Color from './Color'

export type OriginalColorLight = Color
export type OriginalColorDark = Color
export type OriginalColor = Color
export type ComplementaryColorLight = Color
export type ComplementaryColorDark = Color

export type FirstTriadicColorDark = Color
export type FirstTriadicColorLight = Color
export type SecondTriadicColorDark = Color
export type SecondTriadicColorLight = Color

export type ColorScheme = [Color, Color, Color, Color, Color]
export type FlatColorScheme = ColorScheme

export type ComplementaryColorScheme = [
  OriginalColorLight,
  OriginalColorDark,
  OriginalColor,
  ComplementaryColorLight,
  ComplementaryColorDark,
]
export type ComplementaryFlatColorScheme = ComplementaryColorScheme

export type TriadicColorScheme = [
  FirstTriadicColorDark,
  FirstTriadicColorLight,
  OriginalColor,
  SecondTriadicColorLight,
  SecondTriadicColorDark,
]

export type TriadicFlatColorScheme = TriadicColorScheme

export type RGB = {
  r: number
  g: number
  b: number
}

export type HSL = {
  h: number
  s: number
  l: number
}

export type XYZ = {
  x: number
  y: number
  z: number
}

export type LAB = {
  l: number
  a: number
  b: number
}

export type TailwindColor = {
  '50': string
  '100': string
  '200': string
  '300': string
  '400': string
  '500': string
  '600': string
  '700': string
  '800': string
  '900': string
}
