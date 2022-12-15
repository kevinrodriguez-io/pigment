import {
  RGB,
  HSL,
  XYZ,
  LAB,
  ComplementaryColorScheme,
  TriadicColorScheme,
  ColorScheme,
  FlatColorScheme,
  ComplementaryFlatColorScheme,
  TriadicFlatColorScheme,
  TailwindColor,
} from './types'

import {
  reHash,
  reHSL,
  HEXtoRGB,
  RGBtoHSL,
  RGBtoXYZ,
  XYZtoLAB,
  RGBtoHEX,
  HSLtoRGB,
  isHEX,
  isHSL,
  isRGB,
  totalSumOfDifferences,
  limitHue,
} from './ColorUtils'

import {
  analogousColorSchemeFromColor,
  complementaryColorSchemeFromColor,
  triadicColorSchemeFromColor,
} from './ColorSchemes'

import { flatColorsArray } from './Colors'
import {
  toHslString,
  toXyzString,
  toLabString,
  toRgbString,
  toHexString,
} from './tools/colorToString'

import { brightness, mixColors } from './functions'

export default class Color {
  hex: string = ''
  rgb: RGB = { r: 0, g: 0, b: 0 }
  hsl: HSL = { h: 0, s: 0, l: 0 }
  xyz: XYZ = { x: 0, y: 0, z: 0 }
  lab: LAB = { l: 0, a: 0, b: 0 }

  private setFromHexString(color: string) {
    this.hex = reHash.test(color) ? color.replace('#', '') : color
    this.rgb = HEXtoRGB(color)
    this.hsl = RGBtoHSL(this.rgb.r, this.rgb.g, this.rgb.b)
    this.xyz = RGBtoXYZ(this.rgb.r, this.rgb.g, this.rgb.b)
    this.lab = XYZtoLAB(this.xyz.x, this.xyz.y, this.xyz.z)
  }

  private setFromRGBString(color: string) {
    const rgb = color.replace(/[^\d,]/g, '').split(',')
    const r = parseInt(rgb[0], 10)
    const g = parseInt(rgb[1], 10)
    const b = parseInt(rgb[2], 10)
    this.rgb = { r, g, b }
    this.hex = RGBtoHEX(r, g, b)
    this.hsl = RGBtoHSL(r, g, b)
    this.xyz = RGBtoXYZ(r, g, b)
    this.lab = XYZtoLAB(this.xyz.x, this.xyz.y, this.xyz.z)
  }

  private setFromHSLString(color: string) {
    const hsl = color.match(reHSL)
    if (!hsl) return
    const hslValues = hsl.map(r => parseFloat(r))
    const h = Math.round(hslValues[1])
    const s = Math.round(hslValues[2])
    const l = Math.round(hslValues[3])
    this.hsl = { h, s, l }
    this.rgb = HSLtoRGB(h, s, l)
    this.hex = RGBtoHEX(this.rgb.r, this.rgb.g, this.rgb.b)
    this.xyz = RGBtoXYZ(this.rgb.r, this.rgb.g, this.rgb.b)
    this.lab = XYZtoLAB(this.xyz.x, this.xyz.y, this.xyz.z)
  }

  constructor(color: string) {
    if (!color) throw new Error('Color must be present')
    if (isHEX(color)) {
      this.setFromHexString(color)
    } else if (isRGB(color)) {
      this.setFromRGBString(color)
    } else if (isHSL(color)) {
      this.setFromHSLString(color)
    }
  }

  public tint(percentage: number = 10): Color {
    const absoluteWhite: RGB = { r: 255, g: 255, b: 255 }
    const { r, g, b } = mixColors(absoluteWhite, this.rgb, percentage)
    return new Color(RGBtoHEX(r, g, b))
  }

  public shade(percentage: number = 10): Color {
    const absoluteBlack: RGB = { r: 0, g: 0, b: 0 }
    const { r, g, b } = mixColors(absoluteBlack, this.rgb, percentage)
    return new Color(RGBtoHEX(r, g, b))
  }

  public tints(percentage: number = 10): Color[] {
    let i = percentage
    const tints = []
    while (i <= 100) {
      tints.push(this.tint(i))
      i += percentage
    }
    return tints
  }

  public shades(percentage: number = 10): Color[] {
    let i = percentage
    const shades = []
    while (i <= 100) {
      shades.push(this.shade(i))
      i += percentage
    }
    return shades
  }

  public all(percentage: number = 10): Color[] {
    return [
      ...this.tints(percentage).reverse(),
      this,
      ...this.shades(percentage),
    ]
  }

  public tailwindColors(): TailwindColor {
    const [c50, c100, c200, c300, c400, c500, c600, c700, c800, c900] =
      this.all(20)
    return {
      '50': c50.hex,
      '100': c100.hex,
      '200': c200.hex,
      '300': c300.hex,
      '400': c400.hex,
      '500': c500.hex,
      '600': c600.hex,
      '700': c700.hex,
      '800': c800.hex,
      '900': c900.hex,
    }
  }

  public get nearestFlatColor(): Color {
    let index = 0
    let smallestDistance: number = 1000000
    let previousDistance: number = 1000000
    let currentDistance: number
    const { l: l1, a: a1, b: b1 } = this.lab
    let l2, a2, b2
    for (let i = 0; i < flatColorsArray.length; i++) {
      if (i !== 0) {
        const colorLAB = new Color(flatColorsArray[i - 1]).lab
        l2 = colorLAB.l
        a2 = colorLAB.a
        b2 = colorLAB.b
        previousDistance = totalSumOfDifferences(l1, a1, b1, l2, a2, b2)
      }
      const colorLAB = new Color(flatColorsArray[i]).lab
      l2 = colorLAB.l
      a2 = colorLAB.a
      b2 = colorLAB.b
      currentDistance = totalSumOfDifferences(l1, a1, b1, l2, a2, b2)

      if (currentDistance < previousDistance) {
        if (currentDistance < smallestDistance) {
          smallestDistance = currentDistance
          index = i
        }
      }
    }
    return new Color(flatColorsArray[index])
  }

  public get brightness(): number {
    return brightness(this.rgb)
  }

  public get complementaryColor(): Color {
    const { h, s, l } = this.hsl
    let hue = h
    hue += 180.0
    hue = limitHue(hue)
    hue = Math.round(hue)
    const rgb = HSLtoRGB(hue, s, l)
    const hex = RGBtoHEX(rgb.r, rgb.g, rgb.b)
    return new Color(`#${hex}`)
  }

  public get analogousColorScheme(): ColorScheme {
    return analogousColorSchemeFromColor(this)
  }

  public get analogousFlatColorScheme(): FlatColorScheme {
    return analogousColorSchemeFromColor(this, true)
  }

  public get complementaryColorScheme(): ComplementaryColorScheme {
    return complementaryColorSchemeFromColor(this)
  }

  public get complementaryFlatColorScheme(): ComplementaryFlatColorScheme {
    return complementaryColorSchemeFromColor(this, true)
  }

  public get triadicColorScheme(): TriadicColorScheme {
    return triadicColorSchemeFromColor(this)
  }

  public get triadicFlatColorScheme(): TriadicFlatColorScheme {
    return triadicColorSchemeFromColor(this, true)
  }

  public get contrastingTextColor(): Color {
    const { l } = this.hsl
    if (l >= 50) return new Color('#000000')
    return new Color('#ffffff')
  }

  public get contrastingFlatTextColor(): Color {
    return this.contrastingTextColor.nearestFlatColor
  }

  public get hexString(): string {
    return toHexString(this.hex)
  }

  public get rgbString(): string {
    return toRgbString(this.rgb)
  }

  public get hslString(): string {
    return toHslString(this.hsl)
  }

  public get xyzString(): string {
    return toXyzString(this.xyz)
  }

  public get labString(): string {
    return toLabString(this.lab)
  }
}
