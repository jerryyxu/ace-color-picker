import React, { useEffect, useRef, useState } from 'react';
import tinycolor, { ColorFormats } from 'tinycolor2';
import { minmax } from '../utils';

import Slider from '../components/slider';

import './index.css';

type Position = {
  top: string;
  left: string;
};

interface ColorPanelPorps {
  onChange?: (color: ColorFormats.HSVA) => void;
  defaultValue?: ColorFormats.HSVA;
  value?: ColorFormats.HSVA;
}

function drawCanvas(canvas: HTMLCanvasElement, color: string) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas.getBoundingClientRect();

  canvas.width = width;
  canvas.height = height;

  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // 亮度
  let lineGradient = ctx.createLinearGradient(0, 0, width, 0);

  lineGradient.addColorStop(0, '#fff');
  lineGradient.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = lineGradient;
  ctx.fillRect(0, 0, width, height);

  // 透明度
  lineGradient = ctx.createLinearGradient(0, 0, 0, height);

  lineGradient.addColorStop(0, 'transparent');
  lineGradient.addColorStop(1, '#000');
  ctx.fillStyle = lineGradient;
  ctx.fillRect(0, 0, width, height);
}

function computePosition(hsla: ColorFormats.HSVA): Position {
  const { s, v } = hsla;

  const left = `${s * 100}%`;
  const top = `${(1 - v) * 100}%`;

  return { left, top };
}

// 颜色饱和度和明度选择器
export default function ColorSaturationPicker({
  onChange,
  defaultValue = {
    h: 360,
    s: 0,
    v: 0,
    a: 1,
  },
  value,
}: ColorPanelPorps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);

  const [color, setColor] = useState<ColorFormats.HSVA>(value || defaultValue);

  function handlePositionChange(e: MouseEvent | React.MouseEvent) {
    if (!panelRef.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { x, y, height, width } = panelRef.current?.getBoundingClientRect();

    const left = minmax(clientX - x, 0, width);
    const top = minmax(clientY - y, 0, height);

    const _color = {
      ...color,
      s: left / width,
      v: 1 - top / height,
    };

    value || setColor(_color);
    onChange && onChange(_color);
  }

  function handleMouseDown(e: React.MouseEvent) {
    sliderRef.current.startMove(e);
  }

  function drawPanel({ v, s, h }: ColorFormats.HSVA) {
    canvasRef.current &&
      drawCanvas(canvasRef.current, tinycolor({ s, v, h, a: 1 }).toRgbString());
  }

  useEffect(() => {
    drawPanel(color);
  }, []);

  useEffect(() => {
    if (
      value &&
      // @ts-ignore
      ['a', 'h'].some(k => value[k] !== color[k])
    ) {
      drawPanel(value);

      setColor(value);
    }
  }, [value]);

  const _color = value || color;

  return (
    <div ref={panelRef} className="color-saturation-picker">
      <canvas
        onMouseDown={handleMouseDown}
        ref={canvasRef}
        className="picker__canvas"
      ></canvas>
      <Slider
        ref={sliderRef}
        onPositionChange={handlePositionChange}
        style={{
          ...computePosition(_color),
          transform: 'translate(-50%, -50%)',
          background: tinycolor(_color).toRgbString(),
        }}
      />
    </div>
  );
}
