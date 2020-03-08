import React from 'react'
import styled from 'styled-components'
import { Color } from '@kevinrodriguez-io/pigment-core'

const TOP_BAR_HEIGHT = '44px'

const TopBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${TOP_BAR_HEIGHT};
  padding-left: 1em;
  z-index: 10;
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.secondary};
  box-shadow: 0px 4px 5px -4px #000;
  display: flex;
  align-items: center;
`

const MainContainer = styled.main`
  margin-top: ${TOP_BAR_HEIGHT};
  background-color: ${props =>
    new Color(props.theme.colors.text).shade(2.5).hexString};
  min-height: calc(100vh - ${TOP_BAR_HEIGHT});
  height: calc(100% - 44px);
`

const Layout = ({ children }) => {
  return (
    <>
      <TopBar>
        <span role="img" aria-label="Rainbow">
          🌈
        </span>
        &nbsp; Pigment Example!
      </TopBar>
      <MainContainer>{children}</MainContainer>
    </>
  )
}

export default Layout
