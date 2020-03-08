import styled from 'styled-components'

const Input = styled.input`
  border-radius: 0.3em;
  font-size: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  :focus {
    outline: none;
  }
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
  ::placeholder {
    color: ${props => props.theme.colors.secondary};
  }
`

export default Input
