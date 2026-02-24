/**
 * title: " "
 * description: 通过 `value` 和 `onChange` 实现受控模式。
 */
import React, { useState } from 'react';
import { Radio } from 'aeroui';

export default () => {
  const [value, setValue] = useState<string | number>('February');

  return (
    <div>
      <Radio.Group
        options={['January', 'February', 'March', 'April']}
        value={value}
        onChange={setValue}
      />
      <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        当前选中：{String(value)}
      </div>
    </div>
  );
};
