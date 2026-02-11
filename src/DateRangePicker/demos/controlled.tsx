/**
 * title: " "
 * description: 通过 `value` 和 `onChange` 实现受控模式。
 */
import React, { useState } from 'react';
import { DateRangePicker } from 'aero-ui';

export default () => {
  const [value, setValue] = useState<[string, string]>(['2025-06-01', '2025-06-15']);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <DateRangePicker value={value} onChange={setValue} />
      <span style={{ fontSize: 13, color: '#888' }}>
        当前值：{value[0] || '空'} ~ {value[1] || '空'}
      </span>
    </div>
  );
};
