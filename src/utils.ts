// stopPropagation && preventDefault
export function endEvent(e: Event | React.MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
}

// 使用 requestAnimationFrame 进行节流
export function requestAF(fn: Function) {
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

// 限制范围
export function minmax(v: number, min: number, max: number): number {
  if (v < min) {
    return min;
  }

  if (v > max) {
    return max;
  }

  return v;
}
