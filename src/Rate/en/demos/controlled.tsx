/**
 * title: " "
 * description: Use `value` and `onChange` for controlled mode, displaying the current rating in real time.
 */
import React, { useState } from 'react';
import { Rate } from 'aero-ui';

export default () => {
  const [value, setValue] = useState(3);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Rate value={value} onChange={setValue} />
      <span style={{ color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        {value} stars
      </span>
    </div>
  );
};
