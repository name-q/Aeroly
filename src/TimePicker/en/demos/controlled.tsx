/**
 * title: " "
 * description: Use `value` and `onChange` for controlled mode.
 */
import React, { useState } from 'react';
import { TimePicker, ConfigProvider, enUS } from 'aeroly';

export default () => {
  const [value, setValue] = useState('09:30:00');

  return (
    <ConfigProvider locale={enUS}>
      <div>
        <TimePicker value={value} onChange={setValue} />
        <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
          Current value: {value || 'None'}
        </div>
      </div>
    </ConfigProvider>
  );
};
