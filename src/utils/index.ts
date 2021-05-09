import tinycolor, { ColorFormats } from 'tinycolor2';

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

export function isUdf(v: any) {
  return v === undefined;
}

// 计算渐变色 相对位置 stop 处的颜色值
export function clacGradientColor(
  colorStopList: ColorStopValue[],
  stop: number,
) {
  if (colorStopList.length < 1) {
    return;
  }

  let begin = 0;
  let end = 0;

  const list = [...colorStopList].sort((x, y) => x.stop - y.stop);

  for (let i = 0; i < list.length; i++) {
    const c = list[i];

    if (c.stop < stop) {
      begin = i;
    } else if (c.stop > stop) {
      end = i;
      break;
    }
  }

  const rgb: ColorFormats.RGB = { r: -1, g: -1, b: -1 };

  const radio =
    (stop - list[begin].stop) / (list[end].stop - list[begin].stop || 100);

  const [beginRgb, endRgb] = [begin, end].map(i =>
    tinycolor(list[i].color).toRgb(),
  );

  ['r', 'g', 'b'].map(
    // @ts-ignore
    n => (rgb[n] = beginRgb[n] * (1 - radio) + endRgb[n] * radio),
  );

  return tinycolor(rgb).toHexString();
}
