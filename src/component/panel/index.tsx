import React, { useEffect, useRef, useState } from 'react';
import {
  getOffset,
  endEvent,
  throttle,
  limitRange,
  toFixed,
} from '../../utils';

import './index.css';

function drawCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const { height, width } = canvas;

  if (ctx) {
    const lg = ctx.createLinearGradient(0, height, width, 0);

    lg.addColorStop(0, 'black');
    lg.addColorStop(1, 'red');

    ctx.fillStyle = lg;

    ctx.fillRect(0, 0, width, height);
  }
}

export default function ColorPanel(prop: ColorPanelPorps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const movableRef = useRef<boolean>(false);
  const [pos, setPos] = useState<[number, number] | null>(null);

  const [color, setColor] = useState<string>('');

  // event handle

  function handleStartMove(e: React.MouseEvent) {
    movableRef.current = true;

    endEvent(e);
  }

  function handleMouseUp(e: MouseEvent) {
    movableRef.current = false;

    endEvent(e);
  }

  function handleMouseDown(e: MouseEvent) {
    endEvent(e);
  }

  const handleMouseMove = throttle((e: MouseEvent) => {
    if (movableRef.current) {
      const [x, y] = [e.clientX, e.clientY];
      const react = panelRef.current?.getBoundingClientRect();

      if (react) {
        setPos([
          toFixed(limitRange(x - react.x, 0, react.width), 2),
          toFixed(limitRange(y - react.y, 0, react.height), 2),
        ]);
      }
    }
    endEvent(e);
  });

  // useEffect

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      drawCanvas(canvasRef.current);
    }
  }, [canvasRef, panelRef]);

  useEffect(() => {
    if (panelRef.current && canvasRef.current && pos) {
      const ctx = canvasRef.current.getContext('2d');
      const react = panelRef.current?.getBoundingClientRect();

      const [x, y] = [
        pos[0] * 2,
        (pos[1] > react.width ? pos[1] - 1 : pos[1]) * 2,
      ];
      const imgData = ctx?.getImageData(x, y, 1, 1);

      imgData && setColor(`rgba(${imgData.data})`);

      prop?.onChange?.call(null, color);
    }
  }, [pos, canvasRef, panelRef]);

  return (
    <div
      ref={panelRef}
      className="picker-panel"
      style={{ width: 200, height: 200 }}
      onMouseDown={handleStartMove}
    >
      <canvas
        width="400px"
        height="400px"
        ref={canvasRef}
        className="picker-panel__canvas"
      ></canvas>
      {pos ? (
        <div
          style={{
            left: pos[0],
            top: pos[1],
            background: color,
          }}
          className="picker-panel__point"
        ></div>
      ) : null}
    </div>
  );
}

interface ColorPanelPorps {
  onChange?: (color: string) => void;
}
