/**
 * title: " "
 * description: Use `value` and `onChange` for controlled mode.
 */
import React, { useState } from 'react';
import { Segmented } from 'aeroly';

const OPTIONS = [
  { value: 'January', label: 'January' },
  { value: 'February', label: 'February' },
  { value: 'March', label: 'March' },
];

export default () => {
  const [value, setValue] = useState<string | number>('February');

  return (
    <div>
      <Segmented
        options={OPTIONS}
        value={value}
        onChange={(v: string | number) => setValue(v)}
      />
      <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        Currently selected: {value}
      </div>
    </div>
  );
};
