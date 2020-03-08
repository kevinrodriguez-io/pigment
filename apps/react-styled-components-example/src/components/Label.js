import styled from 'styled-components'

const Label = styled.label`
  position: absolute;
  top: -0.5em;
  left: 0.8em;
  font-weight: 600;
  font-size: 1em;
  line-height: 1em;
  padding: 0 5px;
  color: ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.text};
`

export default Label
