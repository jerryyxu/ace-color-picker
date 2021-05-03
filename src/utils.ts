export function getOffset(el: Element | null): [number, number] {
  const offset: [number, number] = [0, 0];

  while (el && el instanceof HTMLElement) {
    offset[0] += el.offsetLeft;
    offset[1] += el.offsetTop;

    el = el.offsetParent;
  }

  return offset;
}

export function endEvent(e: Event | React.MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
}

export function throttle(fn: Function) {
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

export function limitRange(v: number, min: number, max: number): number {
  if (v < min) {
    return min;
  }

  if (v > max) {
    return max - 1;
  }

  return v;
}

export function toFixed(v: number, fractionDigits: number | undefined): number {
  return Number(v.toFixed(fractionDigits));
}
