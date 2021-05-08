import React, { useState } from 'react';
import ColorHuePicker from '../hue';
import ColorAlphaPicker from '../alpha';
import ColorSaturationPicker from '../saturation';
import GradientPoints from '../gradient-points';
import tinycolor from 'tinycolor2';

import './index.css';

type GradientValue = {
  color: string;
  stop: number;
};

function getGradientCss(v: GradientValue[]) {
  v.sort((x, y) => x.stop - y.stop);

  const c = v.map(({ color, stop }) => `${color} ${stop}%`).join(', ');

  return `linear-gradient(90deg, ${c})`;
}

const colorArr = [
  {
    color: '#2228c3',
    stop: 0,
  },
  {
    color: '#fdbb2d',
    stop: 100,
  },
];

export default function ColorPicker(props: ColorPickerProps) {
  const [curColor, setCurColor] = useState(
    tinycolor(colorArr[0].color).toHsv(),
  );

  function handleColorChange(c) {
    console.log(c);
    setCurColor(c);
  }

  return (
    <div className="ace-color-picker">
      <div style={{ height: 100, width: 200 }}></div>
      {/* <GradientPoints defaultValue={colorArr} /> */}
      <ColorSaturationPicker value={curColor} onChange={handleColorChange} />
      <ColorHuePicker value={curColor} onChange={handleColorChange} />
      <ColorAlphaPicker value={curColor} onChange={handleColorChange} />

      <div
        style={{
          height: 40,
          width: 40,
          background: tinycolor(curColor).toRgbString(),
        }}
      ></div>
    </div>
  );
}

type ColorPickerProps = {
  color: tinycolor.ColorInput;
  defaultColor: tinycolor.ColorInput;
};
