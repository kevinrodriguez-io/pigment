import styled from 'styled-components'
import { Color } from '@kevinrodriguez-io/pigment-core'
/**
 * @typedef {import('../theme/tools/generateColorTheme').ColorTheme} ColorTheme
 */

/**
 * Generates a background color for the current button
 * @param {ColorTheme} colorTheme - Colors to use as source
 * @param {'primary'|'secondary'|'warning'|'danger'} variant - Variant to use
 */
const getButtonHoverBackgroundColor = (colorTheme, variant) => {
  switch (variant) {
    case 'primary':
      return colorTheme.secondary
    case 'secondary':
      return colorTheme.primary
    case 'warning':
      return new Color(colorTheme.warning).shade(25).hexString
    case 'danger':
      return new Color(colorTheme.danger).shade(25).hexString
    default:
      return ''
  }
}

const Button = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  font-size: 1em;
  padding: 1rem;
  border-radius: 0.3em;
  width: 100%;

  background-color: ${props => props.theme.colors[props.variant]};
  color: ${props => props.theme.colors.text};

  box-shadow: 0px 4px 5px -4px #000;

  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.muted};
    &:hover {
      cursor: not-allowed;
      background-color: ${props => props.theme.colors.muted};
    }
  }
  &:visited {
    background-color: ${props => props.theme.colors[props.variant]};
  }
  &:hover {
    background-color: ${props =>
      getButtonHoverBackgroundColor(props.theme.colors, props.variant)};
  }
`

export default Button
