import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

import { requestAF, endEvent } from '../../utils';

import './index.css';

function Pointer(props: PointerProps, ref: React.Ref<any>) {
  const { onPositionChange, ...restProps } = props;

  function unbindEventListeners() {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  // -------- event handle

  function handleMouseDown(e: React.MouseEvent) {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    onPositionChange && onPositionChange(e);
    endEvent(e);
  }

  function handleMouseUp(e: MouseEvent) {
    unbindEventListeners();

    endEvent(e);
  }

  const handleMouseMove = requestAF((e: MouseEvent) => {
    onPositionChange && onPositionChange(e);

    endEvent(e);
  });

  useEffect(() => {
    return () => {
      unbindEventListeners();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    handleMouseDown,
  }));

  return (
    <div
      onMouseDown={handleMouseDown}
      className="color-pointer"
      {...restProps}
    ></div>
  );
}

interface PointerProps {
  style?: Object;
  onPositionChange?: (e: MouseEvent | React.MouseEvent) => void;
  ref?: React.Ref<any>;
}

export default forwardRef(Pointer);
