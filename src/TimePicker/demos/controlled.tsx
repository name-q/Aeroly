/**
 * title: " "
 * description: 通过 `value` 和 `onChange` 实现受控模式。
 */
import React, { useState } from 'react';
import { TimePicker } from 'aero-ui';

export default () => {
  const [value, setValue] = useState('09:30:00');

  return (
    <div>
      <TimePicker value={value} onChange={setValue} />
      <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        当前值：{value || '无'}
      </div>
    </div>
  );
};
