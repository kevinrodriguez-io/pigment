import { RGB } from '../types'

const mixColors = (color1: RGB, color2: RGB, percentage: number = 50): RGB => {
  const weight = percentage / 100.0
  const w = weight * 2 - 1
  const a = 0

  const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2.0
  const w2 = 1 - w1

  const r = Math.round(color1.r * w1 + color2.r * w2)
  const g = Math.round(color1.g * w1 + color2.g * w2)
  const b = Math.round(color1.b * w1 + color2.b * w2)

  return { r, g, b }
}

export default mixColors
