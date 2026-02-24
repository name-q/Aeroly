/**
 * title: " "
 * description: Customize color via `color`, supports a fixed color or a function that changes dynamically based on the score.
 */
import React, { useState } from 'react';
import { Rate } from 'aeroly';

export default () => {
  const [val, setVal] = useState(2);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Rate defaultValue={3} color="#f5222d" />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Rate
          value={val}
          onChange={setVal}
          color={(v) => (v <= 2 ? '#f5222d' : v <= 3 ? '#faad14' : '#52c41a')}
        />
        <span style={{ color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
          {val} stars
        </span>
      </div>
    </div>
  );
};
