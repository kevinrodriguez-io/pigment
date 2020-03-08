import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider } from 'styled-components'
import { Colors, Color } from '@kevinrodriguez-io/pigment-core'

import './global.css'

import Layout from './components/Layout'
import Card from './components/Card'
import Fieldset from './components/Fieldset'
import Input from './components/Input'
import Label from './components/Label'
import Button from './components/Button'

import generateColorTheme from './theme/tools/generateColorTheme'

const ExampleForm = styled.form`
  display: grid;
  grid-row-gap: 1rem;
`

const ColorInput = styled(Input)`
  padding: 0;
`

const App = () => {
  const [appColor, setAppColor] = useState(Colors.flatNavyBlue.dark)

  const handleSubmit = e => {
    e.preventDefault()
    alert('Submitted')
  }

  const handleColorChange = e => {
    setAppColor(e.target.value)
  }

  const theme = {
    colors: generateColorTheme(new Color(appColor)),
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Card>
          <h3>You can easily theme your app!</h3>
          <ExampleForm onSubmit={handleSubmit}>
            <Fieldset>
              <Label htmlFor="name">Name</Label>
              <Input id="name" />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" />
            </Fieldset>
            <Button variant="primary">Submit</Button>
          </ExampleForm>
        </Card>
        <div style={{ marginTop: '1rem' }} />
        <Card>
          <h3>Try another color!</h3>
          <ColorInput
            value={appColor}
            onChange={handleColorChange}
            type="color"
          />
        </Card>
        <div style={{ marginTop: '1rem' }} />
        <Card style={{ overflowX: 'scroll' }}>
          <h3>Theme object</h3>
          <pre>{JSON.stringify(theme, null, 2)}</pre>
          <p>
            Check out the implementation at pigment-core's original&nbsp;
            <a href="https://github.com/kevinrodriguez-io/pigment/tree/master/apps/react-styled-components-example">
              repository
            </a>
          </p>
        </Card>
      </Layout>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
