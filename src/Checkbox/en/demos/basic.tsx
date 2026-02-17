/**
 * title: " "
 * description: Basic checkbox, supports checking and unchecking.
 */
import React from 'react';
import { Checkbox } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Checkbox>Agree to Terms</Checkbox>
    <Checkbox defaultChecked>Checked by default</Checkbox>
  </div>
);
