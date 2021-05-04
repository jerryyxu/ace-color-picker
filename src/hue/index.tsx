import React, { useState } from 'react';
import tinycolor, { ColorFormats } from 'tinycolor2';

import SliderControl from '../components/slider-control';

import './index.css';

// 色相选择器
export default function ColorHuePicker({
  onChange,
  defaultValue = { h: 0, s: 1, v: 1, a: 1 },
}: ColorHuePickerProps) {
  const [color, setColor] = useState<ColorFormats.HSVA>(
    tinycolor(defaultValue).toHsv(),
  );

  function handlePositionChange(v: number) {
    const h = Math.round((360 * v) / 100);

    setColor({
      ...color,
      h,
    });
    onChange && onChange(h);
  }

  return (
    <SliderControl
      className="color-hue-picker"
      onChange={handlePositionChange}
      sliderStyle={{ background: tinycolor(color).toRgbString() }}
    />
  );
}

export type ColorHuePickerProps = {
  onChange?: (v: number) => void;
  defaultValue?: tinycolor.ColorInput;
};
