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

export interface RGB {
  r: number
  g: number
  b: number
}

export interface HSL {
  h: number
  s: number
  l: number
}

export interface XYZ {
  x: number
  y: number
  z: number
}

export interface LAB {
  l: number
  a: number
  b: number
}
