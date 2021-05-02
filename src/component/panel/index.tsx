import React, { useEffect, useRef, useState } from 'react';

import './index.css';

function drawCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  const { height, width } = canvas;

  console.log(height, width);

  if (ctx) {
    const lg = ctx.createLinearGradient(0, height, width, 0);

    lg.addColorStop(0, 'black');
    lg.addColorStop(1, 'red');

    ctx.fillStyle = lg;

    ctx.fillRect(0, 0, width, height);
  }
}

function throttle(fn: Function) {
  let running = false;

  return function(e: MouseEvent) {
    if (!running) {
      running = true;

      window.requestAnimationFrame(() => {
        fn(e);
        running = false;
      });
    }
  };
}

function limitRange(v: number, min: number, max: number): number {
  if (v < min) {
    return min;
  }

  if (v > max) {
    return max - 1;
  }
  return v;
}

function endEvent(e: Event) {
  e.stopPropagation();
  e.preventDefault();
}

export default function ColorPanel(prop: ColorPanelPorps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const movableRef = useRef<boolean>(false);
  const clientRef = useRef<[number, number] | null>(null);

  const [pos, setPos] = useState<[number, number] | null>(null);
  const posRef = useRef<[number, number] | null>(pos);

  const [color, setColor] = useState<string>('');

  // utils

  function getPosStyle() {
    if (pos && panelRef.current) {
      const { offsetWidth, offsetHeight } = panelRef.current;

      return {
        left: limitRange(pos[0], 0, offsetWidth),
        top: limitRange(pos[1], 0, offsetHeight),
      };
    }

    return { left: 0, top: 0 };
  }

  // event handle

  function handleStartMove(e: React.MouseEvent) {
    movableRef.current = true;

    setPos((posRef.current = [e.nativeEvent.offsetX, e.nativeEvent.offsetY]));
  }

  function handleMouseUp(e: MouseEvent) {
    movableRef.current = false;
    e.stopPropagation();

    endEvent(e);
  }

  function handleMouseDown(e: MouseEvent) {
    clientRef.current = [e.clientX, e.clientY];

    endEvent(e);
  }

  const handleMouseMove = throttle((e: MouseEvent) => {
    if (movableRef.current && clientRef.current && posRef.current) {
      const [x = 0, y = 0] = clientRef.current;
      const [left, top] = posRef.current;

      clientRef.current = [e.clientX, e.clientY];

      const newLeft = left + (e.clientX - x);
      const newTop = top + (e.clientY - y);

      posRef.current = [newLeft, newTop];
      setPos([newLeft, newTop]);
    }

    endEvent(e);
  });

  // useEffect

  useEffect(() => {
    if (canvasRef.current) {
      drawCanvas(canvasRef.current);
    }

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
    if (panelRef.current && canvasRef.current && pos) {
      const ctx = canvasRef.current.getContext('2d');

      const { left, top } = getPosStyle();

      const imgData = ctx?.getImageData(left, top, 1, 1);

      imgData && setColor(`rgba(${imgData.data})`);

      // if (imgData?.data[3] === 0) {
      //   debugger;
      // }

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
        width="200px"
        height="200px"
        ref={canvasRef}
        className="picker-panel__canvas"
      ></canvas>
      {pos ? (
        <div
          style={{
            ...getPosStyle(),
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
