/**
 * title: " "
 * description: Use `value` and `onChange` for controlled mode.
 */
import React, { useState } from 'react';
import { DateRangePicker, ConfigProvider, enUS } from 'aeroly';

export default () => {
  const [value, setValue] = useState<[string, string]>(['2025-06-01', '2025-06-15']);

  return (
    <ConfigProvider locale={enUS}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 380 }}>
        <DateRangePicker value={value} onChange={setValue} />
        <span style={{ fontSize: 13, color: '#888' }}>
          Current value: {value[0] || 'empty'} ~ {value[1] || 'empty'}
        </span>
      </div>
    </ConfigProvider>
  );
};
