/**
 * title: " "
 * description: 通过 `format` 自定义输入框中的日期显示格式，值始终为 `YYYY-MM-DD`。
 */
import React, { useState } from 'react';
import { DatePicker } from 'aeroui';

export default () => {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
      <DatePicker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" onChange={setValue} />
      <DatePicker format="YYYY年M月D日" placeholder="YYYY年M月D日" onChange={setValue} />
      {value && (
        <div style={{ color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
          实际值：{value}
        </div>
      )}
    </div>
  );
};
