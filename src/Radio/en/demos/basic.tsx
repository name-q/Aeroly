/**
 * title: " "
 * description: Basic radio button. Click to toggle the selected state.
 */
import React from 'react';
import { Radio } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Radio defaultChecked>Selected by default</Radio>
    <Radio>Unselected</Radio>
  </div>
);
