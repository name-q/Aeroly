/**
 * title: " "
 * description: Use `value` and `onChange` for controlled mode.
 */
import React, { useState } from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aero-ui';

export default () => {
  const [value, setValue] = useState('2025-06-15');

  return (
    <ConfigProvider locale={enUS}>
      <div style={{ maxWidth: 280 }}>
        <DatePicker value={value} onChange={setValue} />
        <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
          Current value: {value || 'None'}
        </div>
      </div>
    </ConfigProvider>
  );
};
