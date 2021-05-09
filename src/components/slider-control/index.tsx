import React, { useRef, useState } from 'react';
import clsx from 'clsx';
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

function toArray(v: any) {
  return Array.isArray(v) ? v : [v];
}

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

  const [val, setVal] = useState<number[]>(toArray(defaultValue));
  const [curIdx, setCurIdx] = useState<number>(0);

  const valueRef = useRef<number[]>(getValue());

  function getValue() {
    return isUdf(value) ? val : toArray(value);
  }

  // 根据鼠标事件计算当前值
  function calcValByMouse(e: MouseEvent | React.MouseEvent) {
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
    const v = calcValByMouse(e);

    if (v === undefined) {
      return;
    }

    setCurIdx(idx);

    if (valueRef.current[idx] !== v) {
      valueRef.current[idx] = v;

      isUdf(value) && setVal([...valueRef.current]);

      if (onChange) {
        const _value = valueRef.current;

        if (_value.length < 2) {
          onChange(_value[0]);
        } else {
          onChange(_value, _value[idx], idx);
        }
      }
    }
  }

  function value2Left(v: number): string {
    return `${((v - min) * 100) / (max - min)}%`;
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (!addible) {
      sliderRef.current[curIdx]?.startMove(e);
      return;
    }

    const v = calcValByMouse(e);

    if (v === undefined) {
      return;
    }

    const newValue = [...getValue(), v];
    const idx = newValue.length - 1;

    if (isUdf(value)) {
      setVal(newValue);
      setCurIdx(idx);
    }

    onChange && onChange(newValue, newValue[idx], idx);
  }

  let classname = clsx([
    className,
    'slider-control',
    { 'slider-control--addible': addible },
  ]);

  const curValue = getValue();

  return (
    <div
      onMouseDown={handleMouseDown}
      ref={ctrRef}
      className={classname}
      style={style}
    >
      {curValue.map((v, idx) => {
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
