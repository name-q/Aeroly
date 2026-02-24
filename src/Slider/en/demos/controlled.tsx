/**
 * title: " "
 * description: Controlled via `value` + `readOnly` to prevent dragging (no graying out), paired with InputNumber to modify the value, demonstrating pure controlled mode.
 */
import React, { useState } from 'react';
import { Slider, InputNumber } from 'aeroui';

export default () => {
  const [value, setValue] = useState(40);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Slider
        value={value}
        readOnly
        tooltipVisible
        style={{ flex: 1 }}
      />
      <InputNumber
        value={value}
        min={0}
        max={100}
        onChange={(v) => setValue(v ?? 0)}
        style={{ width: 80 }}
      />
    </div>
  );
};
