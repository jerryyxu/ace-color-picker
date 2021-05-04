## ace-color-picker

```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'ace-color-picker';

import SliderControl from '../src/components/slider-control';

export default function() {
  const [color, setColor] = useState('');

  return (
    <div style={{ width: 100 }}>
      <SliderControl onChange={console.log} />
      <ColorPicker defaultValue={color} onChange={console.log} />
    </div>
  );
}
```
