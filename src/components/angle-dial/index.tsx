import React, { useState, useEffect, useRef } from 'react';
import { requestAF, endEvent, invoke } from '../../utils';

import './index.d.ts';
import './index.less';

type AngleDialProps = {
  value?: number;
  onChange?: (value: number) => void;
};

export default function AngleDial({ value, onChange }: AngleDialProps) {
  const dialRef = useRef<HTMLDivElement>(null);
  const [deg, setDeg] = useState(0);

  function removeListener() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  function handleMouseUp(e: MouseEvent) {
    removeListener();
    endEvent(e);
  }

  function getCenterCoord(el: HTMLElement) {
    const { width, height, x, y } = el.getBoundingClientRect();

    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  }

  const handleMouseMove = requestAF((e: MouseEvent) => {
    if (dialRef.current) {
      const { x, y } = getCenterCoord(dialRef.current);
      const { clientX, clientY } = e;

      const newDeg =
        (360 -
          Math.round((Math.atan2(x - clientX, y - clientY) * 180) / Math.PI)) %
        360;

      invoke(onChange, newDeg);

      if (value !== undefined) {
        setDeg(newDeg);
      }
    }

    endEvent(e);
  });

  function handleMouseDown(e: React.MouseEvent) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    endEvent(e);
  }

  useEffect(() => {
    return () => {
      removeListener();
    };
  }, []);

  const _deg = value === undefined ? deg : value;
  const style = {
    transform: `translateZ(0) rotate(${_deg}deg)`,
  };

  return (
    <div className="angle-dial" onMouseDown={handleMouseDown}>
      <div className="angle-dial--rotate" style={style} ref={dialRef}>
        <div className="angle-dial--dot"></div>
      </div>
    </div>
  );
}
