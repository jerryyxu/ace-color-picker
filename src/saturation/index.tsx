import React, { useEffect, useRef, useState } from 'react';
import tinycolor from 'tinycolor2';
import { minmax } from '../utils';

import Slider from '../components/slider';

import './index.css';

function drawCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const { width, height } = canvas.getBoundingClientRect();

  canvas.width = width;
  canvas.height = height;

  if (ctx) {
    ctx.fillStyle = 'rgb(210, 0, 255)';
    ctx.fillRect(0, 0, width, height);

    const lg0 = ctx.createLinearGradient(0, 0, width, 0);

    lg0.addColorStop(0, '#fff');
    lg0.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = lg0;

    ctx.fillRect(0, 0, width, height);

    const lg = ctx.createLinearGradient(0, 0, 0, height);

    lg.addColorStop(0, 'transparent');
    lg.addColorStop(1, '#000');

    ctx.fillStyle = lg;

    ctx.fillRect(0, 0, width, height);
  }
}

type Color = {
  h: number;
  s: number;
  v: number;
  a: number;
};

type Position = {
  top: number;
  left: number;
};

function computePosition(hsla: Color, pickerContainer: HTMLElement) {
  const { height, width } = pickerContainer.getBoundingClientRect();
  const { s, v } = hsla;

  const left = Math.round((s / 100) * width);
  const top = Math.round(height - (v / 100) * height);

  return { left, top };
}

// 颜色饱和度和明度选择器
export default function ColorSaturationPicker(prop: ColorPanelPorps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<any>(null);

  const [color, setColor] = useState<Color>({
    h: 289,
    s: 0,
    v: 0,
    a: 1,
  });

  const [position, setPosition] = useState<Position | null>(null);

  function handlePositionChange(e: MouseEvent | React.MouseEvent) {
    if (!panelRef.current) {
      return;
    }

    const { clientX, clientY } = e;
    const { x, y, height, width } = panelRef.current?.getBoundingClientRect();

    let left = minmax(clientX - x, 0, width);
    let top = minmax(clientY - y, 0, height);

    setPosition({
      left,
      top,
    });

    setColor({
      ...color,
      s: Math.round((left * 100) / width) / 100,
      v: Math.round(((height - top) * 100) / height) / 100,
    });
  }

  function handleMouseDown(e: React.MouseEvent) {
    sliderRef.current.startMove(e);
  }

  useEffect(() => {
    if (canvasRef.current) {
      drawCanvas(canvasRef.current);
    }

    if (panelRef.current) {
      setPosition(computePosition(color, panelRef.current));
    }
  }, []);

  return (
    <div ref={panelRef} className="color-saturation-picker">
      <canvas
        onMouseDown={handleMouseDown}
        ref={canvasRef}
        className="picker__canvas"
      ></canvas>

      {position ? (
        <Slider
          ref={sliderRef}
          onPositionChange={handlePositionChange}
          style={{
            left: position.left,
            top: position.top,
            background: tinycolor(color).toRgbString(),
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : null}
    </div>
  );
}

interface ColorPanelPorps {
  onChange?: (color: string) => void;
}
