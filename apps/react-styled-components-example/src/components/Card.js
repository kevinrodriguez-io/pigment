import styled from 'styled-components'

const Card = styled.section`
  display: flex;
  flex-direction: column;
  padding: 1em;
  border-radius: 0.3em;
  background-color: ${props => props.theme.colors.text};
  color: ${props => props.theme.colors.primary};
  box-shadow: 0px 4px 5px -4px #000;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
`

export default Card
