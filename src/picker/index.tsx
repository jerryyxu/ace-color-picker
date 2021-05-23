import React, { useState } from 'react';
import tinycolor from 'tinycolor2';

import { resolveGradientColor } from '../utils';

import ColorHuePicker from '../hue';
import ColorAlphaPicker from '../alpha';
import ColorSaturationPicker from '../saturation';
import ColorBlock from '../components/color-block';
import GradientBar from '../components/gradient-bar';
import AngleDial from '../components/angle-dial';

import './index.css';

type ColorPickerProps = {
  color: tinycolor.ColorInput;
  defaultColor: tinycolor.ColorInput;
};

enum ColorType {
  Solid,
  Linear,
  Radial,
}

type ColorItem = {
  css: String;
  hex: String;
  opacity: number;
  stop: Number;
};

export default function ColorPicker(props: ColorPickerProps) {
  const defaultValue =
    'linear-gradient(153deg, rgba(117,17,184,1) 5%, rgba(72,120,60,1) 36%, rgba(120,60,86,1) 67%, rgba(60,120,79,1) 100%)';

  const gradientColorObj = resolveGradientColor(defaultValue);
  const [gradientColor, setGradientColor] = useState(
    gradientColorObj.colorStopList,
  );

  const [angle, setAngel] = useState(parseFloat(gradientColorObj.angle));
  const [curIdx, setCurIdx] = useState<number>(0);
  const [curColor, setCurColor] = useState(
    tinycolor(gradientColor[curIdx].color).toHsv(),
  );

  function handleColorChange(c, ...args: any[]) {
    console.log(c, args);

    setCurColor(c);

    gradientColor[curIdx].color = tinycolor(c).toRgbString();
    setGradientColor([...gradientColor]);
  }

  return (
    <div className="ace-color-picker">
      <div style={{ height: 100, width: 200 }}></div>
      <div className="gradient-color--list"></div>
      <GradientBar defaultValue={gradientColor} onChange={console.log} />
      <ColorSaturationPicker value={curColor} onChange={handleColorChange} />
      <ColorHuePicker value={curColor} onChange={handleColorChange} />
      <ColorAlphaPicker value={curColor} onChange={handleColorChange} />
      <AngleDial value={angle} onChange={v => setAngel(v)} />
      <input
        type="number"
        value={angle}
        onChange={e => setAngel(Number(e.target.value))}
      />
      <ColorBlock color={tinycolor(curColor).toRgbString()} />
    </div>
  );
}
