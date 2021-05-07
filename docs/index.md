## ace-color-picker

```tsx
import React, { useState } from 'react';
import { ColorPicker, GradientPoints } from 'ace-color-picker';

import SliderControl from '../src/components/slider-control';

export default function() {
  return (
    <div style={{ width: 400, height: 500 }}>
      <ColorPicker onChange={console.log} />
      <br />
    </div>
  );
}
```
