/**
 * title: " "
 * description: In controlled mode, the value is fully driven by external state.
 */
import React, { useState } from 'react';
import { TextArea } from 'aeroly';

export default () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 420 }}>
      <TextArea
        value={value}
        onChange={setValue}
        placeholder="Controlled input"
        autoSize={{ minRows: 2 }}
      />
      <div style={{ fontSize: 13, color: '#888' }}>
        Current value: {value || '(empty)'}
      </div>
    </div>
  );
};
