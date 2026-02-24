/**
 * title: " "
 * description: Disable individual options or the entire group.
 */
import React from 'react';
import { Radio } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', gap: 16 }}>
      <Radio disabled>Unchecked disabled</Radio>
      <Radio disabled defaultChecked>Checked disabled</Radio>
    </div>
    <Radio.Group
      options={['Option A', 'Option B', 'Option C']}
      defaultValue="Option A"
      disabled
    />
  </div>
);
