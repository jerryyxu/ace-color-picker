import React, { useState, useMemo } from 'react';
import SliderControl from '../components/slider-control';
import { clacGradientColor } from '../utils';

type ColorStopValue = {
  color: string;
  stop: number;
};

type GradientPointsProps = {
  onChange?: (value: number[], curVal?: number, curIdx?: number) => void;
  defaultValue?: ColorStopValue[];
};

function getGradientCss(v: ColorStopValue[]) {
  v = [...v];
  v.sort((x, y) => x.stop - y.stop);

  const c = v.map(({ color, stop }) => `${color} ${stop}%`).join(', ');

  return `linear-gradient(90deg, ${c})`;
}

export default function({ onChange, defaultValue = [] }: GradientPointsProps) {
  const [value, setValue] = useState<ColorStopValue[]>(defaultValue);

  function handleChange(_: number[], curVal: number, idx: number) {
    const newValue = [...value];

    curVal = Math.round(curVal);

    // 新增
    if (idx >= value.length) {
      const color = clacGradientColor(value, curVal);

      color &&
        newValue.push({
          color,
          stop: curVal,
        });
    } else {
      newValue[idx].stop = curVal;
    }

    setValue(newValue);
    onChange && onChange(_, curVal, idx);
  }

  function renderSlider(_: number, idx: number) {
    return (
      <span
        // @ts-ignore
        style={{ background: value[idx].color }}
        className="color-slider__pointer"
      ></span>
    );
  }

  return (
    <div className="color-gradient-bar">
      <SliderControl
        style={{ background: getGradientCss(value) }}
        value={value.map(v => v.stop)}
        addible
        // @ts-ignore
        onChange={handleChange}
        renderSlider={renderSlider}
      />
    </div>
  );
}
