import Color from './Color'
import { RGB, XYZ, LAB, HSL } from './types'

export const reHash = new RegExp('^#')
export const reHEX = new RegExp('^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$')
export const reRGB = new RegExp(
  'rgba?\\s*\\((\\d+)\\,\\s*(\\d+)\\,\\s*(\\d+)(,\\s*((\\d+)?(\\.\\d+)?))?\\)',
  'i',
)
export const reHSL = new RegExp(
  'hsla?\\((\\d+),\\s*([\\d.]+)%,\\s*([\\d.]+)%,?\\s*(?:0?(\\.\\d+)?|1(\\.0)?)?\\)',
  'i',
)

export const isHEX = (value: string): boolean => reHEX.test(value)

export const isRGB = (value: string): boolean => {
  const rgb = value.match(reRGB)
  try {
    if (!rgb) return false
    const rgbValues = rgb.map(r => parseFloat(r))
    if (rgbValues[1] <= 255 && rgbValues[2] <= 255 && rgbValues[3] <= 255) {
      return true
    } else {
      return false
    }
  } catch {
    return false
  }
}

export const isHSL = (value: string): boolean => {
  const hsl = value.match(reHSL)
  try {
    if (!hsl) return false
    const hslValues = hsl.map(r => parseFloat(r))
    if (hslValues[1] <= 360 && hslValues[2] <= 100 && hslValues[3] <= 100) {
      return true
    }
    return false
  } catch {
    return false
  }
}

export const HEXtoRGB = (hex: string): RGB => {
  let hexValue = hex.replace('#', '')

  if (hexValue.length === 3) {
    const h1 = hexValue.charAt(0)
    const h2 = hexValue.charAt(1)
    const h3 = hexValue.charAt(2)
    hexValue = h1 + h1 + h2 + h2 + h3 + h3
  }
  const bw = parseInt(hexValue, 16)

  return { r: (bw >> 16) & 255, g: (bw >> 8) & 255, b: bw & 255 }
}

export const RGBtoHEX = (r: number, g: number, b: number): string =>
  (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1)

export const RGBtoHSL = (r: number, g: number, b: number): HSL => {
  let h: number, s: number, l: number

  const red = r / 255
  const green = g / 255
  const blue = b / 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)

  l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === red) {
      h = (green - blue) / d + (green < blue ? 6 : 0)
    } else if (max === green) {
      h = (blue - red) / d + 2
    } else if (max === blue) {
      h = (red - green) / d + 4
    }

    //@ts-ignore
    h /= 6
  }

  return {
    //@ts-ignore
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

export const HUEtoRGB = (v1: number, v2: number, vh: number): number => {
  let vhValue = vh
  if (vhValue < 0) {
    vhValue += 1
  }
  if (vhValue > 1) {
    vhValue -= 1
  }

  if (6 * vhValue < 1) {
    return v1 + (v2 - v1) * 6 * vhValue
  }
  if (2 * vhValue < 1) {
    return v2
  }
  if (3 * vhValue < 2) {
    return v1 + (v2 - v1) * (2 / 3 - vhValue) * 6
  }
  return v1
}

export const HSLtoRGB = (h: number, s: number, l: number): RGB => {
  let r: number, g: number, b: number

  h /= 360
  s /= 100
  l /= 100

  if (s === 0) {
    r = l
    g = l
    b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = HUEtoRGB(p, q, h + 1 / 3)
    g = HUEtoRGB(p, q, h)
    b = HUEtoRGB(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

export const RGBtoXYZ = (r: number, g: number, b: number): XYZ => {
  let red = r / 255
  let green = g / 255
  let blue = b / 255

  // Let's assume sRGB
  red = red > 0.04045 ? ((red + 0.055) / 1.055) ** 2.4 : red / 12.92
  green = green > 0.04045 ? ((green + 0.055) / 1.055) ** 2.4 : green / 12.92
  blue = blue > 0.04045 ? ((blue + 0.055) / 1.055) ** 2.4 : blue / 12.92

  const x = red * 0.4124564 + green * 0.3575761 + blue * 0.1804375
  const y = red * 0.2126729 + green * 0.7151522 + blue * 0.072175
  const z = red * 0.0193339 + green * 0.119192 + blue * 0.9503041

  return {
    x: x * 100,
    y: y * 100,
    z: z * 100,
  }
}

export const XYZtoLAB = (x: number, y: number, z: number): LAB => {
  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116

  const l = 116 * y - 16
  const a = 500 * (x - y)
  const b = 200 * (y - z)

  return { l, a, b }
}

export const mix = (
  color1: { rgb: RGB },
  color2: { rgb: RGB },
  percentage: number,
) => {
  percentage = typeof percentage === 'undefined' ? 50 : percentage

  const weight = percentage / 100.0
  const w = weight * 2 - 1
  const a = 0

  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const w2 = 1 - w1

  const r = Math.round(color1.rgb.r * w1 + color2.rgb.r * w2)
  const g = Math.round(color1.rgb.g * w1 + color2.rgb.g * w2)
  const b = Math.round(color1.rgb.b * w1 + color2.rgb.b * w2)

  return new Color(RGBtoHEX(r, g, b))
}

export const fmod = (a: number, b: number) =>
  parseFloat((a - Math.floor(a / b) * b).toPrecision(8))

export const totalSumOfDifferences = (
  l1: number,
  a1: number,
  b1: number,
  l2: number,
  a2: number,
  b2: number,
): number => {
  const c1 = Math.sqrt(Math.pow(a1, 2) + Math.pow(b1, 2))
  const c2 = Math.sqrt(Math.pow(a2, 2) + Math.pow(b2, 2))

  const kl = 1
  const kc = 1
  const kh = 1

  const deltaPrimeL = l2 - l1
  const meanL = (l1 + l2) / 2
  const meanC = (c1 + c2) / 2
  const a1Prime =
    a1 +
    (a1 / 2) *
      (1 -
        Math.sqrt(
          Math.pow(meanC, 7.0) / (Math.pow(meanC, 7.0) + Math.pow(25.0, 7.0)),
        ))
  const a2Prime =
    a2 +
    (a2 / 2) *
      (1 -
        Math.sqrt(
          Math.pow(meanC, 7.0) / (Math.pow(meanC, 7.0) + Math.pow(25.0, 7.0)),
        ))
  const c1Prime = Math.sqrt(Math.pow(a1Prime, 2) + Math.pow(b1, 2))
  const c2Prime = Math.sqrt(Math.pow(a2Prime, 2) + Math.pow(b2, 2))
  const deltaPrimeC = c1Prime - c2Prime
  const deltaC = c1 - c2
  const meanCPrime = (c1Prime + c2Prime) / 2
  const h1Prime = fmod(Math.atan2(b1, a1Prime), (360.0 * Math.PI) / 180)
  const h2Prime = fmod(Math.atan2(b2, a2Prime), (360.0 * Math.PI) / 180)
  let hDeltaPrime
  if (Math.abs(h1Prime - h2Prime) <= (180.0 * Math.PI) / 180) {
    hDeltaPrime = h2Prime - h1Prime
  } else if (h2Prime <= h1Prime) {
    hDeltaPrime = h2Prime - h1Prime + (360.0 * Math.PI) / 180
  } else {
    hDeltaPrime = h2Prime - h1Prime - (360.0 * Math.PI) / 180
  }

  const deltaHPrime =
    2 * Math.sqrt(c1Prime * c2Prime) * Math.sin(hDeltaPrime / 2)
  let meanHPrime
  if (Math.abs(h1Prime - h2Prime) > (180.0 * Math.PI) / 180) {
    meanHPrime = (h1Prime + h2Prime + (360.0 * Math.PI) / 180) / 2
  } else {
    meanHPrime = (h1Prime + h2Prime) / 2
  }

  const t =
    1 -
    0.17 * Math.cos(meanHPrime - (30.0 * Math.PI) / 180) +
    0.24 * Math.cos(2 * meanHPrime) +
    0.32 * Math.cos(3 * meanHPrime + (6.0 * Math.PI) / 180) -
    0.2 * Math.cos(4 * meanHPrime - (63.0 * Math.PI) / 180)

  const sl =
    1 +
    (0.015 * Math.pow(meanL - 50, 2)) / Math.sqrt(20 + Math.pow(meanL - 50, 2))
  const sc = 1 + 0.045 * meanCPrime
  const sh = 1 + 0.015 * meanCPrime * t

  const rt =
    -2 *
    Math.sqrt(
      Math.pow(meanCPrime, 7) / (Math.pow(meanCPrime, 7) + Math.pow(25.0, 7)),
    ) *
    Math.sin(
      ((60.0 * Math.PI) / 180) *
        Math.exp(
          -1 *
            Math.pow(
              (meanCPrime - (275.0 * Math.PI) / 180) / ((25.0 * Math.PI) / 180),
              2,
            ),
        ),
    )

  const totalDifference = Math.sqrt(
    Math.pow(deltaPrimeL / (kl * sl), 2) +
      Math.pow(deltaPrimeC / (kc * sc), 2) +
      Math.pow(deltaHPrime / (kh * sh), 2) +
      rt * (deltaC / (kc * sc)) * (deltaHPrime / (kh * sh)),
  )
  return totalDifference
}

export const limitHue = (hue: number) => {
  if (hue <= 0) return 360 - Math.abs(hue)
  if (hue > 360.0) return hue - 360.0
  return hue
}

export const limitPercentageValue = (value: number) => {
  if (value < 0) return 0
  return value > 100 ? 100 : value
}

export default {
  reHash,
  reHEX,
  reRGB,
  reHSL,
  isHEX,
  isRGB,
  isHSL,
  HEXtoRGB,
  RGBtoHEX,
  RGBtoHSL,
  HUEtoRGB,
  HSLtoRGB,
  RGBtoXYZ,
  XYZtoLAB,
  mix,
  fmod,
  totalSumOfDifferences,
  limitHue,
  limitPercentageValue,
}
