/**
 * title: " "
 * description: Use `value` and `onChange` for controlled mode.
 */
import React, { useState } from 'react';
import { Segmented } from 'aero-ui';

export default () => {
  const [value, setValue] = useState<string | number>('February');

  return (
    <div>
      <Segmented
        options={['January', 'February', 'March']}
        value={value}
        onChange={setValue}
      />
      <div style={{ marginTop: 12, color: 'var(--aero-text-secondary, #666)', fontSize: 13 }}>
        Currently selected: {value}
      </div>
    </div>
  );
};
