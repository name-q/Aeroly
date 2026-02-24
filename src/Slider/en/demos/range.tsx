/**
 * title: " "
 * description: Set `range` to enable range selection with two slider handles.
 */
import React, { useState } from 'react';
import { Slider } from 'aeroly';

export default () => {
  const [value, setValue] = useState<[number, number]>([20, 60]);

  return (
    <div>
      <Slider range value={value} onChange={(v) => setValue(v as [number, number])} />
      <div style={{ marginTop: 8, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        Range: {value[0]} ~ {value[1]}
      </div>
    </div>
  );
};
