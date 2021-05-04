import React, { useState } from 'react';
import ColorHuePicker from '../hue';
import ColorAlphaPicker from '../alpha';
import ColorSaturationPicker from '../saturation';
import tinycolor from 'tinycolor2';

import './index.css';

export default function ColorPicker(props: ColorPickerProps) {
  const [color, setColor] = useState<tinycolor.ColorInput>(
    tinycolor(props.color || props.defaultColor || '#fffff'),
  );

  return (
    <div className="ace-color-picker">
      <ColorSaturationPicker />
      <ColorHuePicker />
      <ColorAlphaPicker />
    </div>
  );
}

type ColorPickerProps = {
  color: tinycolor.ColorInput;
  defaultColor: tinycolor.ColorInput;
};
