import React, { useState } from 'react';
import SliderControl from '../slider-control';
import { clacGradientColor } from '../../utils';

type ColorStop = {
  color: string;
  stop: string;
};

type GradientBarProps = {
  defaultValue?: ColorStop[];
  value?: ColorStop[];
  currentIndex?: Number;
  onChange?: (value: number[], curVal: number, curIdx: number) => void;
};

function getGradientCss(v: ColorStop[]) {
  v = [...v];
  v.sort((x, y) => parseFloat(x.stop) - parseFloat(y.stop));

  const c = v.map(({ color, stop }) => `${color} ${stop}`).join(', ');

  return `linear-gradient(90deg, ${c})`;
}

export default function GradientBar({
  onChange,
  defaultValue = [],
}: GradientBarProps) {
  const [value, setValue] = useState<ColorStop[]>(defaultValue);

  function handleChange(_: number[], curVal: number, idx: number) {
    const newValue = [...value];

    curVal = Math.round(curVal);

    // 新增
    if (idx >= value.length) {
      const color = clacGradientColor(value, curVal);

      color &&
        newValue.push({
          color,
          stop: `${curVal}%`,
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
        value={value.map(v => parseFloat(v.stop))}
        addible
        // @ts-ignore
        onChange={handleChange}
        renderSlider={renderSlider}
      />
    </div>
  );
}
