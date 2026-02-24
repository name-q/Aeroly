/**
 * title: " "
 * description: In controlled mode, the value is fully driven by external state.
 */
import React, { useState } from 'react';
import { Input } from 'aeroly';

export default () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <Input
        value={value}
        onChange={setValue}
        placeholder="Controlled input"
        allowClear
      />
      <div style={{ fontSize: 13, color: '#888' }}>
        Current value: {value || '(empty)'}
      </div>
    </div>
  );
};
