/**
 * title: " "
 * description: 通过 `value` 受控 + `readOnly` 禁止拖动（不灰显），配合 InputNumber 修改值，体现纯受控模式。
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
