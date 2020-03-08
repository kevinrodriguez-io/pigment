/**
 * @typedef {import('@kevinrodriguez-io/pigment-core').Color} Color
 */
import { Colors } from '@kevinrodriguez-io/pigment-core'

/**
 * Color theme to be used as a base, all of it's properties are
 * in HEX format.
 * @typedef {Object} ColorTheme
 * @property {string} primary - primary Color
 * @property {string} secondary - secondary Color
 * @property {string} text - text Color
 * @property {string} invertedText - invertedText Color
 * @property {string} accent - accent Color
 * @property {string} background - background Color
 * @property {string} muted - muted Color
 * @property {string} warning - warning Color
 * @property {string} danger - danger Color
 */

/**
 * Generates a color theme based on a base color
 * @param {Color} color - Base color to be used
 * @param {string} [colorScheme] - Color scheme to use, defaults to 'analogousColorScheme'
 * @param {Object} [warningColor] - Warning color to use, you must provide light and dark variants in HEX format, defaults to flatYellow
 * @param {string} warningColor.light - Light warning variant
 * @param {string} warningColor.dark - Dark warning variant
 * @param {Object} [dangerColor] - Warning color to use, you must provide light and dark variants in HEX format, defaults to flatRed
 * @param {string} dangerColor.light - Light danger variant
 * @param {string} dangerColor.dark - Dark danger variant
 * @returns {ColorTheme} A color theme
 */
export default function generateColorTheme(
  color,
  colorScheme = 'analogousColorScheme',
  warningColor = Colors.flatYellow,
  dangerColor = Colors.flatRed,
) {
  const background = color.contrastingFlatTextColor.hexString
  const primary = color.hexString
  const secondary = color[colorScheme][1].hexString
  const text = color.contrastingFlatTextColor.hexString
  const accent = color[colorScheme][3].hexString
  const muted = color.contrastingFlatTextColor.shade(25).hexString
  const invertedText =
    color.contrastingFlatTextColor.contrastingFlatTextColor.hexString
  return {
    primary,
    secondary,
    text,
    invertedText,
    accent,
    background,
    muted,
    warning: color.hsl.l < 50 ? warningColor.dark : warningColor.light,
    danger: color.hsl.l < 50 ? dangerColor.dark : dangerColor.light,
  }
}
