import React, { useState } from 'react';
import { ColorPicker } from 'aeroly';

export default () => {
  const [color, setColor] = useState('#50b8e7');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <ColorPicker value={color} onChange={setColor} />
      <span style={{ fontFamily: 'monospace', fontSize: 14 }}>{color}</span>
    </div>
  );
};
