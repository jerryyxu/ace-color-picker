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

// 计算渐变色 相对位置 stop 处的颜色值
export function clacGradientColor(colorStopList: ColorStop[], stop: number) {
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

// 函数调用
export function invoke(func: any, ...args: any[]) {
  return func && typeof func === 'function' && func.apply(null, args);
}

/**
 * 解析渐变色值
 * @param  color 渐变色值
 * @example linear-gradient(150deg, rgba(117,17,184,1) 5%, rgba(72,120,60,1) 30%, rgba(72,120,60,1));
 * @return 渐变色数据对象
 */
export function resolveGradientColor(color: string) {
  function _split(str: string, separator: string | RegExp): string[] {
    const result: string[] = [];

    let cstr = [];
    let bracketFlag = false;

    for (let i = 0; i < str.length; i++) {
      const c = str.charAt(i);

      if (c.match(separator) && !bracketFlag) {
        result.push(cstr.join('').trim());
        cstr = [];
      } else {
        if (c === '(') {
          bracketFlag = true;
        } else if (c === ')') {
          bracketFlag = false;
        }

        cstr.push(c);
      }
    }
    cstr.length && result.push(cstr.join('').trim());

    return result;
  }

  const re = /^([a-z]+)-gradient\((.+)\)$/;
  const matches = re.exec(color.trim());

  if (!matches) {
    return null;
  }

  const result: any = {};

  const [_, functionType, args] = matches;

  result.functionType = functionType;

  let argArr = _split(args, ',');

  // 只支持 deg 单位
  if (argArr[0].match('deg')) {
    result.angle = argArr[0];
    argArr.splice(0, 1);
  }

  // 不允许 忽略 stop 值
  result.colorStopList = argArr.map(cs => {
    const [color, stop] = _split(cs, /\s+/);

    return { color, stop };
  });

  return result;
}
