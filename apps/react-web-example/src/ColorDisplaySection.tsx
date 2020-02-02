import React from 'react'
import { Color } from '@pigment/core'

interface ColorDisplaySectionProps {
  title: string
  color: Color
  onColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  readOnly?: boolean
}

const ColorDisplaySection: React.FC<ColorDisplaySectionProps> = ({ title, color, onColorChange, readOnly }) => {
  return (
    <div>
      <h2>
        {title}: {color.hexString}
      </h2>
      <input type="color" name="hexColor" value={color.hexString} onChange={onColorChange} readOnly={readOnly} />
      <hr />
      <p>HEX: {color.hexString}</p>
      <p>RGB: {color.rgbString}</p>
      <p>HSL: {color.hslString}</p>
    </div>
  )
}

export default ColorDisplaySection
