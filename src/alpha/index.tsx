import React, { useState } from 'react';
import tinycolor, { ColorFormats } from 'tinycolor2';

import SliderControl from '../components/slider-control';

import './index.css';

// 色相选择器
export default function ColorAlphaPicker({
  onChange,
  defaultValue = { h: 0, s: 1, v: 1, a: 1 },
}: ColorAlphaPickerProps) {
  const [color, setColor] = useState<ColorFormats.HSVA>(
    tinycolor(defaultValue).toHsv(),
  );

  function handlePositionChange(v: number) {
    const a = 1 - v / 100;

    const c = {
      ...color,
      a,
    };

    setColor(c);

    onChange && onChange(color);
  }

  const startColor = tinycolor({ ...color, a: 1 }).toRgbString();
  const endColor = tinycolor({ ...color, a: 0 }).toRgbString();

  return (
    <div className="color-alpha-picker">
      <SliderControl
        onChange={handlePositionChange}
        sliderStyle={{ background: tinycolor(color).toRgbString() }}
        style={{
          background: `linear-gradient(to right, ${startColor} 0%, ${endColor} 100%)`,
        }}
      />
    </div>
  );
}

export type ColorAlphaPickerProps = {
  onChange?: (v: ColorFormats.HSVA) => void;
  defaultValue?: tinycolor.ColorInput;
};
