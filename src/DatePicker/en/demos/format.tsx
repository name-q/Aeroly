/**
 * title: " "
 * description: Customize the display format in the input via `format`. The value is always `YYYY-MM-DD`.
 */
import React, { useState } from 'react';
import { DatePicker, ConfigProvider, enUS } from 'aeroui';

export default () => {
  const [value, setValue] = useState('');

  return (
    <ConfigProvider locale={enUS}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 280 }}>
        <DatePicker format="YYYY/MM/DD" placeholder="YYYY/MM/DD" onChange={setValue} />
        <DatePicker format="MM-DD-YYYY" placeholder="MM-DD-YYYY" onChange={setValue} />
        {value && (
          <div style={{ color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
            Actual value: {value}
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};
