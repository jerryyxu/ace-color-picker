## ace-color-picker

```tsx
import React, { useState } from 'react';
import { ColorPicker, GradientPoints } from 'ace-color-picker';

import SliderControl from '../src/components/slider-control';

export default function() {
  const colorArr = [
    {
      color: 'red',
      stop: 10,
    },
    {
      color: 'black',
      stop: 100,
    },
  ];

  return (
    <div style={{ width: 400 }}>
      <GradientPoints defaultValue={colorArr} onChange={console.log} />
      <br />
    </div>
  );
}
```
