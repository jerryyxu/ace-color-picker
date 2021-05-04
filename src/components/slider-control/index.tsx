import React, { useRef, useState } from 'react';
import Slider from '../slider';

import './index.css';

type SliderControlProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (v: number) => void;
  className?: string;
  sliderStyle?: object;
  style?: object;
};

export default function SliderControl({
  min = 0,
  max = 100,
  defaultValue = 0,
  sliderStyle,
  className = '',
  style,
  onChange,
}: SliderControlProps) {
  const ctrRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);

  const defaultLeft = `${(defaultValue - min) / (max - min)}%`;
  const [left, setLeft] = useState<string>(defaultLeft);
  const leftRef = useRef<string>(left);

  function handlePositionChange(e: MouseEvent | React.MouseEvent) {
    const react = ctrRef.current?.getBoundingClientRect();

    if (!react) {
      return;
    }

    let lt = e.clientX - react.x;
    const { width } = react;

    if (lt < 0) {
      lt = 0;
    } else if (lt > width) {
      lt = width;
    }

    const newLeft = `${(lt / width) * 100}%`;

    if (newLeft !== leftRef.current) {
      const v = ((max - min) * lt) / width + min;

      setLeft(newLeft);
      leftRef.current = newLeft;
      onChange && onChange(v);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    // 调用 Pointer 中的 handleMouseDown 事件
    sliderRef.current.handleMouseDown(e);
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      ref={ctrRef}
      className={`${className} slider-control`}
      style={style}
    >
      <Slider
        ref={sliderRef}
        onPositionChange={handlePositionChange}
        style={{
          left,
          transform: 'translateX(-50%)',
          ...sliderStyle,
        }}
      />
    </div>
  );
}
