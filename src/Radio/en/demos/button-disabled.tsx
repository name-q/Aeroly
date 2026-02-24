/**
 * title: " "
 * description: Button mode supports both overall and individual option disabling.
 */
import React from 'react';
import { Radio } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group
      optionType="button"
      defaultValue="a"
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ]}
    />
    <Radio.Group
      optionType="button"
      defaultValue="x"
      disabled
      options={[
        { value: 'x', label: 'All Disabled' },
        { value: 'y', label: 'Option Y' },
        { value: 'z', label: 'Option Z' },
      ]}
    />
  </div>
);
