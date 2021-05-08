import React, { useRef, useState } from 'react';
import { isUdf } from '../../utils';
import Slider from '../slider';

import './index.css';

type SliderControlProps = {
  min?: number;
  max?: number;
  defaultValue?: number | number[];
  value?: number | number[];
  onChange?: (v: number | number[], curVal?: number, curIdx?: number) => void;
  className?: string;
  sliderStyle?: object;
  style?: object;
  renderSlider?:
    | ((value: number, index?: number) => React.ReactNode)
    | React.ReactNode;
  addible?: boolean;
};

export default function SliderControl({
  min = 0,
  max = 100,
  defaultValue = 0,
  value,
  sliderStyle,
  className = '',
  style,
  renderSlider,
  onChange,
  addible = false,
}: SliderControlProps) {
  const ctrRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>([]);

  const defaultVal = value === undefined ? defaultValue : value;
  const [val, setVal] = useState<number[]>(
    Array.isArray(defaultVal) ? defaultVal : [defaultVal],
  );
  const [curIdx, setCurIdx] = useState<number>(0);

  const valueRef = useRef<number[]>(val);

  function computeValue(e: MouseEvent | React.MouseEvent) {
    const react = ctrRef.current?.getBoundingClientRect();

    if (!react) {
      return;
    }

    const { width } = react;
    let lt = e.clientX - react.x;

    if (lt < 0) {
      lt = 0;
    } else if (lt > width) {
      lt = width;
    }

    return ((max - min) * lt) / width + min;
  }

  function handlePositionChange(e: MouseEvent | React.MouseEvent, idx: number) {
    const v = computeValue(e);

    if (v === undefined) {
      return;
    }

    setCurIdx(idx);

    if (valueRef.current[idx] !== v) {
      valueRef.current[idx] = v;

      isUdf(value) && setVal([...valueRef.current]);

      if (onChange) {
        const _values = valueRef.current;

        if (_values.length < 2) {
          onChange(_values[0]);
        } else {
          onChange(_values, _values[idx], idx);
        }
      }
    }
  }

  function value2Left(v: number): string {
    return `${((v - min) * 100) / (max - min)}%`;
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (addible) {
      const v = computeValue(e);

      if (v === undefined) {
        return;
      }

      const _value = [...val, v];

      if (isUdf(value)) {
        setVal(_value);
        setCurIdx(_value.length);
      }
    } else {
      sliderRef.current[curIdx]?.startMove(e);
    }
  }

  let classname = `${className} slider-control`;

  if (addible) {
    classname += ' slider-control--addible';
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      ref={ctrRef}
      className={classname}
      style={style}
    >
      {val.map((v, idx) => {
        return (
          <Slider
            key={idx}
            ref={el => (sliderRef.current[idx] = el)}
            onPositionChange={e => handlePositionChange(e, idx)}
            style={{
              top: '50%',
              transform: 'translate(-50%, -50%)',
              ...sliderStyle,
              left: value2Left(v),
            }}
          >
            {typeof renderSlider === 'function'
              ? renderSlider(v, idx)
              : renderSlider}
          </Slider>
        );
      })}
    </div>
  );
}
