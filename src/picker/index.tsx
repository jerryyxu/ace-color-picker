import React, { useState } from 'react';
import tinycolor from 'tinycolor2';

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
// type ColorValue = {};
// type ColorObject = {
//   type: ColorType;
//   css: String;
//   deg: number;
//   colorStops: color.ColorStops
// };

export default function ColorPicker(props: ColorPickerProps) {
  const [gradientColor, setGradientColor] = useState([
    { color: 'rgba(131,58,180,1)', stop: 0 },
    { color: 'rgba(252,176,69,1)', stop: 100 },
  ]);
  const [deg, setDeg] = useState(0);
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
      <GradientBar defaultValue={gradientColor} onChange={console.log} />
      <ColorSaturationPicker value={curColor} onChange={handleColorChange} />
      <ColorHuePicker value={curColor} onChange={handleColorChange} />
      <ColorAlphaPicker value={curColor} onChange={handleColorChange} />
      <AngleDial value={deg} onChange={v => setDeg(v)} />
      <ColorBlock color={tinycolor(curColor).toRgbString()} />
    </div>
  );
}
