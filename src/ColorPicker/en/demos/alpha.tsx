import React, { useState } from 'react';
import { ColorPicker } from 'aeroly';

export default () => {
  const [color, setColor] = useState('rgba(80, 184, 231, 0.6)');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <ColorPicker value={color} onChange={setColor} showAlpha />
      <span style={{ fontFamily: 'monospace', fontSize: 14 }}>{color}</span>
    </div>
  );
};
