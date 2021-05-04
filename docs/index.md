## ace-color-picker

```tsx
import React, { useState } from 'react';
import { ColorSaturationPicker, ColorHuePicker } from 'ace-color-picker';

export default function() {
  const [color, setColor] = useState('');

  return (
    <div
      style={{ position: 'relative', width: 200, display: 'grid', rowGap: 20 }}
    >
      <ColorSaturationPicker />
      <ColorHuePicker />
    </div>
  );
}
```
