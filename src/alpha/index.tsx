import React, { useState, useEffect } from 'react';
import tinycolor, { ColorFormats } from 'tinycolor2';

import SliderControl from '../components/slider-control';

import './index.css';

export type ColorAlphaPickerProps = {
  onChange?: (v: ColorFormats.HSVA) => void;
  defaultValue?: ColorFormats.HSVA;
  value?: ColorFormats.HSVA;
};

// 色相选择器
export default function ColorAlphaPicker({
  onChange,
  value,
  defaultValue = { h: 0, s: 1, v: 1, a: 1 },
}: ColorAlphaPickerProps) {
  const [color, setColor] = useState<ColorFormats.HSVA>(value || defaultValue);

  // @ts-ignore
  function handleChange(v) {
    const a = 1 - v / 100;

    const c = {
      ...color,
      a,
    };

    value && setColor(c);
    onChange && onChange(c);
  }

  const c = tinycolor(value || color);
  const bgColor = c.toRgbString();
  const startColor = c.setAlpha(1).toRgbString();
  const endColor = c.setAlpha(0).toRgbString();

  useEffect(() => {
    if (
      value &&
      // @ts-ignore
      ['s', 'v', 'h'].some(k => value[k] !== color[k])
    ) {
      setColor(value);
    }
  }, [value]);

  return (
    <div className="color-alpha-picker">
      <SliderControl
        onChange={handleChange}
        value={(1 - color.a) * 100}
        style={{
          background: `linear-gradient(to right, ${startColor} 0%, ${endColor} 100%)`,
        }}
        sliderStyle={{
          background: bgColor,
        }}
      />
    </div>
  );
}
