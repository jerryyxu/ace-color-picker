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
    color: '#22c1c3',
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

  console.log(tinycolor(colorArr[0].color).toHsv());

  return (
    <div className="ace-color-picker">
      <div style={{ height: 100, width: 200 }}></div>
      <GradientPoints defaultValue={colorArr} />
      {/* <ColorSaturationPicker defaultValue={curColor} /> */}
      <ColorHuePicker defaultValue={curColor} />
      <ColorAlphaPicker defaultValue={curColor} />

      {colorArr.map((v, idx) => (
        <div
          key={idx}
          style={{ height: 40, width: 40, background: v.color }}
        ></div>
      ))}
    </div>
  );
}

type ColorPickerProps = {
  color: tinycolor.ColorInput;
  defaultColor: tinycolor.ColorInput;
};
