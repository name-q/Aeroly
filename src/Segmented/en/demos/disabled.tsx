/**
 * title: " "
 * description: Disable all options or individual ones.
 */
import React from 'react';
import { Segmented } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Segmented options={['Available', 'Disabled All', 'Unavailable']} disabled />
    <Segmented
      options={[
        { value: 'a', label: 'Option A' },
        { value: 'b', label: 'Option B', disabled: true },
        { value: 'c', label: 'Option C' },
      ]}
      defaultValue="a"
    />
  </div>
);
