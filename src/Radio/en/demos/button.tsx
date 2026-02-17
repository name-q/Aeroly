/**
 * title: " "
 * description: Set `optionType="button"` to switch to button style. The selected item is filled with the primary color.
 */
import React, { useState } from 'react';
import { Radio } from 'aero-ui';

export default () => {
  const [value, setValue] = useState<string | number>('beijing');

  return (
    <Radio.Group
      optionType="button"
      value={value}
      onChange={setValue}
      options={[
        { value: 'beijing', label: 'Beijing' },
        { value: 'shanghai', label: 'Shanghai' },
        { value: 'guangzhou', label: 'Guangzhou' },
        { value: 'shenzhen', label: 'Shenzhen' },
      ]}
    />
  );
};
