import React, {
  useImperativeHandle,
  useEffect,
  useState,
  forwardRef,
} from 'react';

import { requestAF, endEvent, invoke } from '../../utils';
import clsx from 'clsx';

import './index.less';

interface SliderProps {
  style?: Object;
  onPositionChange?: (e: MouseEvent | React.MouseEvent) => void;
  ref?: React.Ref<any>;
  children?: React.ReactNode;
  color?: string;
  onStartMove?: (e: MouseEvent | React.MouseEvent) => void;
}

function Slider(props: SliderProps, ref: React.Ref<any>) {
  const {
    onPositionChange,
    style,
    color,
    onStartMove,
    children = <span className="color-slider__pointer"></span>,
    ...restProps
  } = props;

  const [willChange, setWillChange] = useState<boolean>(false);

  function removeListener() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  // -------- event handle

  function startMove(e: React.MouseEvent) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    setWillChange(true);
    invoke(onStartMove, e);
    invoke(onPositionChange, e);
    endEvent(e);
  }

  function handleMouseUp(e: MouseEvent) {
    removeListener();
    setWillChange(false);
    endEvent(e);
  }

  const handleMouseMove = requestAF((e: MouseEvent) => {
    invoke(onPositionChange, e);
    endEvent(e);
  });

  useEffect(() => {
    return () => {
      removeListener();
      setWillChange(false);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    startMove,
  }));

  const classname = clsx('color-slider', { 'is-active': willChange });

  return (
    <div
      onMouseDown={startMove}
      className={classname}
      style={{ ...style, willChange: willChange ? 'left, top' : undefined }}
      {...restProps}
    >
      {children}
    </div>
  );
}

export default forwardRef(Slider);
