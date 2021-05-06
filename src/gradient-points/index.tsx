import React, { useState } from 'react';
import SliderControl from '../components/slider-control';

type GradientValue = {
  color: string;
  stop: number;
};

type GradientPointsProps = {
  onChange?: (value: number[], curVal?: number, curIdx?: number) => void;
  defaultValue?: GradientValue[];
};

function getGradientCss(v: GradientValue[]) {
  v.sort((x, y) => x.stop - y.stop);

  const c = v.map(({ color, stop }) => `${color} ${stop}%`).join(', ');

  return `linear-gradient(90deg, ${c})`;
}

export default function({ onChange, defaultValue = [] }: GradientPointsProps) {
  const [value, setValue] = useState<GradientValue[]>(defaultValue);

  const stopValue = value.map(v => v.stop);

  function handleChange(_, curVal, idx) {
    value[idx].stop = Math.round(curVal);

    setValue([...value]);

    console.log(value);
  }

  return (
    <div className="color-gradient-points">
      <SliderControl
        style={{ background: getGradientCss(value) }}
        defaultValue={stopValue}
        addible
        /* @ts-ignore */
        onChange={handleChange}
        renderSlider={(v, idx) => {
          v = Math.round(v);

          return (
            <div key={idx}>
              <span>{v}</span>
            </div>
          );
        }}
      />
    </div>
  );
}
