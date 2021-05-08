import React, { useState, useEffect } from 'react';
import tinycolor, { ColorFormats } from 'tinycolor2';

import SliderControl from '../components/slider-control';

import './index.css';

export type ColorHuePickerProps = {
  onChange?: (v: ColorFormats.HSVA) => void;
  defaultValue?: ColorFormats.HSVA;
  value?: ColorFormats.HSVA;
};

// 色相选择器
export default function ColorHuePicker({
  onChange,
  value,
  defaultValue = { h: 0, s: 1, v: 1, a: 1 },
}: ColorHuePickerProps) {
  const [color, setColor] = useState<ColorFormats.HSVA>(value || defaultValue);

  // @ts-ignore
  function handlePositionChange(v) {
    const h = Math.round((360 * v) / 100);

    const _color = {
      ...color,
      h,
    };

    value || setColor(_color);

    onChange && onChange(_color);
  }

  useEffect(() => {
    if (
      value &&
      // @ts-ignore
      ['s', 'v', 'a'].some(k => value[k] !== color[k])
    ) {
      setColor(value);
    }
  }, [value]);

  const _color = value || color;
  const cssColor = tinycolor({ h: _color.h, s: 1, v: 1, a: 1 }).toRgbString();

  return (
    <div className="color-hue-picker">
      <SliderControl
        className="color-hue-picker"
        onChange={handlePositionChange}
        defaultValue={(_color.h * 100) / 360}
        sliderStyle={{
          background: cssColor,
        }}
      />
    </div>
  );
}
