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

  // @ts-ignore
  function handlePositionChange(v) {
    const h = Math.round((360 * v) / 100);

    setColor({
      ...color,
      h,
    });
    onChange && onChange(h);
  }

  const cssColor = tinycolor(color).toRgbString();

  return (
    <div className="color-hue-picker">
      <SliderControl
        className="color-hue-picker"
        onChange={handlePositionChange}
        defaultValue={(color.h * 100) / 360}
        renderSlider={
          <div style={{ background: cssColor }} className="pointer"></div>
        }
      />
    </div>
  );
}

export type ColorHuePickerProps = {
  onChange?: (v: number) => void;
  defaultValue?: tinycolor.ColorInput;
};
