## ace-color-picker

```tsx
import React, { useState } from 'react';
import { ColorPicker } from 'ace-color-picker';

export default function() {
  const [color, setColor] = useState('');

  return (
    <div>
      <ColorPicker defaultValue={color} onChange={console.log} />
    </div>
  );
}
```
