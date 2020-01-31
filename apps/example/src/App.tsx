import React, { useState } from 'react'
import { Color } from '@pigment/core'
import ColorDisplaySection from './ColorDisplaySection'
import style from './App.module.css'

const ContrastingColorsContainer = ({ color }: { color: Color }) => {
  return (
    <div className={style.container}>
      <div>
        <pre>color.contrastingTextColor (BETA)</pre>
        <label htmlFor="contrastingTextColor">
          Contrasting text color ({color.contrastingTextColor.hexString}):&nbsp;
          <input id="contrastingTextColor" type="color" value={color.contrastingTextColor.hexString} readOnly />
        </label>
      </div>
      <div>
        <pre>color.contrastingFlatTextColor (BETA)</pre>
        <label htmlFor="contrastingFlatTextColor">
          Contrasting flat text color ({color.contrastingFlatTextColor.hexString}):&nbsp;
          <input id="contrastingFlatTextColor" type="color" value={color.contrastingFlatTextColor.hexString} readOnly />
        </label>
      </div>
    </div>
  )
}

const PaletteElement = ({ color }: { color: Color }) => {
  return <div style={{ width: '50px', height: '200px', backgroundColor: color.hexString }} />
}

const PaletteDisplay = ({ palette }: { palette: Color[] }) => {
  return (
    <div style={{ margin: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
      {palette.map((color, i) => (
        <PaletteElement key={i} color={color} />
      ))}
    </div>
  )
}

export default function App() {
  const [hexColor, setHexColor] = useState('#E74C3C') // FlatRed
  const color = new Color(hexColor)
  return (
    <>
      <h1>
        Pigment - A Colorful JS Framework&nbsp;
        <span role="img" aria-label="Rainbow">
          🌈
        </span>
      </h1>
      <div className={style.container}>
        <div>
          <pre>const color = new Color('{hexColor}')</pre>
          <ColorDisplaySection title="Color" color={color} onColorChange={e => setHexColor(e.target.value)} />
        </div>
        <div>
          <pre>color.complementaryColor</pre>
          <ColorDisplaySection title="Complementary Color" color={color.complementaryColor} readOnly />
        </div>
        <div>
          <pre>color.nearestFlatColor</pre>
          <ColorDisplaySection title="Nearest Flat Color" color={color.nearestFlatColor} readOnly />
        </div>
      </div>
      <hr />
      <h2>Color Shades: </h2>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <p style={{ textAlign: 'center' }}>All shades (Regular & Flat [25%])</p>
          <PaletteDisplay palette={color.all(25)} />
          <PaletteDisplay palette={color.nearestFlatColor.all(25)} />
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Complementary all shades (25%)</p>
          <PaletteDisplay palette={color.complementaryColor.all(25)} />
          <PaletteDisplay palette={color.nearestFlatColor.complementaryColor.all(25)} />
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Analogous (Regular & Flat)</p>
          <PaletteDisplay palette={color.analogousColorScheme} />
          <PaletteDisplay palette={color.analogousFlatColorScheme} />
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Complementary (Regular & Flat)</p>
          <PaletteDisplay palette={color.complementaryColorScheme} />
          <PaletteDisplay palette={color.complementaryFlatColorScheme} />
        </div>
        <div>
          <p style={{ textAlign: 'center' }}>Triadic (Regular & Flat)</p>
          <PaletteDisplay palette={color.triadicColorScheme} />
          <PaletteDisplay palette={color.triadicFlatColorScheme} />
        </div>
      </div>
      <hr />
      <ContrastingColorsContainer color={color} />
      <hr />
    </>
  )
}
