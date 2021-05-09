import React from 'react';
import clsx from 'clsx';

import './index.less';

export type ColorBlockProps = {
  color: string;
  isActive?: boolean;
  isCircle?: boolean;
  className?: string;
  size?: number | string;
  style?: object;
  onClick?: (event: React.MouseEvent) => void;
};

export default function ColorBlock({
  color,
  className = '',
  isActive = false,
  isCircle = false,
  size,
  style,
  ...rest
}: ColorBlockProps) {
  const cls = clsx(className, 'color-block', {
    'is-active': isActive,
    'is-circle': isCircle,
  });

  return (
    <div
      style={{ width: size, height: size, ...style }}
      className={cls}
      {...rest}
    >
      <div style={{ background: color }}></div>
    </div>
  );
}
