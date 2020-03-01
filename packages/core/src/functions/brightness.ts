import { RGB } from '../types'

const brightness = ({ r, g, b }: RGB) =>
  Math.round(((r + g + b) / (255 * 3)) * 100)

export default brightness
