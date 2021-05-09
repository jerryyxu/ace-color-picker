import React, { useState } from 'react';
import ColorHuePicker from '../hue';
import ColorAlphaPicker from '../alpha';
import ColorSaturationPicker from '../saturation';
import ColorBlock from '../components/color-block';
import GradientPoints from '../gradient-points';
import tinycolor from 'tinycolor2';

import './index.css';

type ColorPickerProps = {
  color: tinycolor.ColorInput;
  defaultColor: tinycolor.ColorInput;
};

export default function ColorPicker(props: ColorPickerProps) {
  const [gradientColor, setGradientColor] = useState([
    { color: 'rgba(131,58,180,1)', stop: 0 },
    { color: 'rgba(252,176,69,1)', stop: 100 },
  ]);

  const [curIdx, setCurIdx] = useState<number>(0);

  const [curColor, setCurColor] = useState(
    tinycolor(gradientColor[curIdx].color).toHsv(),
  );

  function handleColorChange(c) {
    console.log(c);
    setCurColor(c);

    gradientColor[curIdx].color = tinycolor(c).toRgbString();
    setGradientColor([...gradientColor]);
  }

  return (
    <div className="ace-color-picker">
      <div style={{ height: 100, width: 200 }}></div>
      <GradientPoints defaultValue={gradientColor} />
      <ColorSaturationPicker value={curColor} onChange={handleColorChange} />
      <ColorHuePicker value={curColor} onChange={handleColorChange} />
      <ColorAlphaPicker value={curColor} onChange={handleColorChange} />

      {gradientColor.map(({ color }, idx) => (
        <ColorBlock
          isActive={idx === curIdx}
          onClick={() => {
            setCurIdx(idx);
            handleColorChange(tinycolor(color).toHsv());
          }}
          color={color}
        />
      ))}
    </div>
  );
}
