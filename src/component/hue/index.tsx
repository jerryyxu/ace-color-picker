import React, { useEffect, useRef, useState } from 'react';

import ControlBall from '../control-ball';

import './index.css';

// 色相选择器
export default function ColorHuePicker(props: ColorHuePickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<any>(null);

  const [left, setLeft] = useState<number>(0);
  const [hue, setHue] = useState<number>(0);

  function handlePositionChange(e: MouseEvent | React.MouseEvent) {
    const react = pickerRef.current?.getBoundingClientRect();

    if (react) {
      let left = e.clientX - react.x;
      const { width } = react;

      if (left < 0) {
        left = 0;
      } else if (left > width) {
        left = width;
      }

      setHue(Math.round((360 * left) / width));

      setLeft(left);
    }
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (ballRef.current) {
      ballRef.current.handleMouseDown(e);
    }
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      ref={pickerRef}
      className="color-hue-picker"
    >
      <ControlBall
        ref={ballRef}
        onPositionChange={handlePositionChange}
        style={{
          left,
          transform: 'translateX(-50%)',
          background: `hsl(${hue}deg 100% 50%)`,
        }}
      />
    </div>
  );
}

export type ColorHuePickerProps = {};
