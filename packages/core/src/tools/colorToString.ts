import { HSL, XYZ, LAB, RGB } from '../types'

export const toHslString = ({ h, s, l }: HSL) => `hsl(${h}, ${s}%, ${l}%)`
export const toXyzString = ({ x, y, z }: XYZ) => `xyz(${x}, ${y}, ${z})`
export const toLabString = ({ l, a, b }: LAB) => `lab(${l}, ${a}, ${b})`
export const toRgbString = ({ r, g, b }: RGB) => `rgb(${r}, ${g}, ${b})`
export const toHexString = (hex: string) => `#${hex}`
