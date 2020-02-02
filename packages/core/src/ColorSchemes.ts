import Color from './Color'
import { toHslString } from './tools/colorToString'
import { limitHue, limitPercentageValue } from './ColorUtils'
import {
  ComplementaryColorScheme,
  TriadicColorScheme,
  ColorScheme,
} from './types'

export const analogousColorSchemeFromColor = (
  { hsl: { h, s, l } }: Color,
  flat = false,
): ColorScheme => {
  let firstColor = new Color(
    toHslString({
      h: limitHue(h - 32),
      s: limitPercentageValue(s + 5),
      l: limitPercentageValue(l + 5),
    }),
  )
  let secondColor = new Color(
    toHslString({
      h: limitHue(h - 16),
      s: limitPercentageValue(s + 5),
      l: limitPercentageValue(l + 9),
    }),
  )
  let thirdColor = new Color(toHslString({ h, s, l }))
  let fourthColor = new Color(
    toHslString({
      h: limitHue(h + 16),
      s: limitPercentageValue(s + 5),
      l: limitPercentageValue(l + 9),
    }),
  )
  let fifthColor = new Color(
    toHslString({
      h: limitHue(h + 32),
      s: limitPercentageValue(s + 5),
      l: limitPercentageValue(l + 5),
    }),
  )
  if (flat) {
    firstColor = firstColor.nearestFlatColor
    secondColor = secondColor.nearestFlatColor
    thirdColor = thirdColor.nearestFlatColor
    fourthColor = fourthColor.nearestFlatColor
    fifthColor = fifthColor.nearestFlatColor
    if (secondColor.hex === thirdColor.hex) {
      secondColor = new Color(
        toHslString({
          h: limitHue(h - 48),
          s: limitPercentageValue(s + 5),
          l: limitPercentageValue(l + 9),
        }),
      ).nearestFlatColor
    }
    if (thirdColor.hex === fourthColor.hex) {
      thirdColor = new Color(
        toHslString({
          h: limitHue(h + 32),
          s: limitPercentageValue(s + 5),
          l: limitPercentageValue(l + 9),
        }),
      ).nearestFlatColor
    }
    if (firstColor.hex === secondColor.hex) {
      firstColor = new Color(
        toHslString({
          h: limitHue(h - 64),
          s: limitPercentageValue(s + 5),
          l: limitPercentageValue(l + 9),
        }),
      ).nearestFlatColor
    }
    if (firstColor.hex === thirdColor.hex) {
      firstColor = new Color(
        toHslString({
          h: limitHue(h - 96),
          s: limitPercentageValue(s + 5),
          l: limitPercentageValue(l + 9),
        }),
      ).nearestFlatColor
    }
    if (fourthColor.hex === fifthColor.hex) {
      fifthColor = new Color(
        toHslString({
          h: limitHue(h + 64),
          s: limitPercentageValue(s + 5),
          l: limitPercentageValue(l + 9),
        }),
      ).nearestFlatColor
    }
    if (thirdColor.hex === fifthColor.hex) {
      fifthColor = new Color(
        toHslString({
          h: limitHue(h + 96),
          s: limitPercentageValue(s + 5),
          l: limitPercentageValue(l + 9),
        }),
      ).nearestFlatColor
    }
  }
  return [firstColor, secondColor, thirdColor, fourthColor, fifthColor]
}

export const complementaryColorSchemeFromColor = (
  { hsl: { h, s, l } }: Color,
  flat = false,
): ComplementaryColorScheme => {
  let firstColor = new Color(
    toHslString({
      h,
      s: limitPercentageValue(s + 5),
      l: limitPercentageValue(l - 30),
    }),
  )
  let secondColor = new Color(
    toHslString({
      h,
      s: limitPercentageValue(s - 10),
      l: limitPercentageValue(l + 9),
    }),
  )
  let thirdColor = new Color(toHslString({ h, s, l }))
  let fourthColor = new Color(
    toHslString({
      h: limitHue(h + 180),
      s,
      l,
    }),
  )
  let fifthColor = new Color(
    toHslString({
      h: limitHue(h + 180),
      s: limitPercentageValue(s + 20),
      l: limitPercentageValue(l - 30),
    }),
  )
  if (flat) {
    firstColor = firstColor.nearestFlatColor
    secondColor = secondColor.nearestFlatColor
    thirdColor = thirdColor.nearestFlatColor
    fourthColor = fourthColor.nearestFlatColor
    fifthColor = fifthColor.nearestFlatColor
    if (secondColor.hex === thirdColor.hex)
      secondColor = secondColor.shade(25).nearestFlatColor
    if (thirdColor.hex === fourthColor.hex)
      fourthColor = secondColor.shade(25).nearestFlatColor
    if (firstColor.hex === thirdColor.hex)
      firstColor = firstColor.shade(25).nearestFlatColor
    if (fifthColor.hex === thirdColor.hex)
      fifthColor = fifthColor.shade(25).nearestFlatColor
    if (firstColor.hex === secondColor.hex)
      firstColor = firstColor.shade(25).nearestFlatColor
    if (fourthColor.hex === fifthColor.hex)
      fifthColor = fifthColor.shade(25).nearestFlatColor
  }
  return [firstColor, secondColor, thirdColor, fourthColor, fifthColor]
}

export const triadicColorSchemeFromColor = (
  { hsl: { h, s, l } }: Color,
  flat = false,
): TriadicColorScheme => {
  let firstColor = new Color(
    toHslString({
      h: limitHue(h + 120),
      s: Math.round(limitPercentageValue((7 * s) / 6)),
      l: limitPercentageValue(l - 5),
    }),
  )
  let secondColor = new Color(
    toHslString({
      h: limitHue(h + 120),
      s,
      l: limitPercentageValue(l + 9),
    }),
  )
  let thirdColor = new Color(toHslString({ h, s, l }))
  let fourthColor = new Color(
    toHslString({
      h: limitHue(h + 240),
      s: Math.round(limitPercentageValue((7 * s) / 6)),
      l: limitPercentageValue(l - 5),
    }),
  )
  let fifthColor = new Color(
    toHslString({
      h: limitHue(h + 240),
      s,
      l: limitPercentageValue(l - 30),
    }),
  )
  if (flat) {
    firstColor = firstColor.nearestFlatColor
    secondColor = secondColor.nearestFlatColor
    thirdColor = thirdColor.nearestFlatColor
    fourthColor = fourthColor.nearestFlatColor
    fifthColor = fifthColor.nearestFlatColor

    if (secondColor.hex === thirdColor.hex)
      secondColor = secondColor.shade(25).nearestFlatColor
    if (thirdColor.hex === fourthColor.hex)
      fourthColor = secondColor.shade(25).nearestFlatColor
    if (firstColor.hex === thirdColor.hex)
      firstColor = firstColor.shade(25).nearestFlatColor
    if (fifthColor.hex === thirdColor.hex)
      fifthColor = fifthColor.shade(25).nearestFlatColor
    if (firstColor.hex === secondColor.hex)
      firstColor = firstColor.shade(25).nearestFlatColor
    if (fourthColor.hex === fifthColor.hex)
      fifthColor = fifthColor.shade(25).nearestFlatColor
  }
  return [firstColor, secondColor, thirdColor, fourthColor, fifthColor]
}

export default {
  analogousColorSchemeFromColor,
  complementaryColorSchemeFromColor,
  triadicColorSchemeFromColor,
}
