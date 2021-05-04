import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { requestAF, endEvent } from '../../utils';

import './index.css';

function Slider(props: SliderProps, ref: React.Ref<any>) {
  const { onPositionChange, style, ...restProps } = props;
  const [willChange, setWillChange] = useState<boolean>(false);

  function unbindEventListeners() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  // -------- event handle

  function handleMouseDown(e: React.MouseEvent) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    setWillChange(true);
    onPositionChange && onPositionChange(e);

    endEvent(e);
  }

  function handleMouseUp(e: MouseEvent) {
    unbindEventListeners();
    setWillChange(false);

    endEvent(e);
  }

  const handleMouseMove = requestAF((e: MouseEvent) => {
    onPositionChange && onPositionChange(e);

    endEvent(e);
  });

  useEffect(() => {
    return () => {
      unbindEventListeners();
      setWillChange(false);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    handleMouseDown,
  }));

  return (
    <div
      onMouseDown={handleMouseDown}
      className="color-slider"
      style={{ ...style, willChange: willChange ? 'left, right' : undefined }}
      {...restProps}
    ></div>
  );
}

interface SliderProps {
  style?: Object;
  onPositionChange?: (e: MouseEvent | React.MouseEvent) => void;
  ref?: React.Ref<any>;
}

export default forwardRef(Slider);
