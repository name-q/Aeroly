/**
 * title: " "
 * description: Disable individual checkboxes or the entire group.
 */
import React from 'react';
import { Checkbox } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div style={{ display: 'flex', gap: 16 }}>
      <Checkbox disabled>Unchecked disabled</Checkbox>
      <Checkbox disabled defaultChecked>Checked disabled</Checkbox>
    </div>
    <Checkbox.Group
      options={['Option A', 'Option B', 'Option C']}
      defaultValue={['Option A']}
      disabled
    />
  </div>
);
