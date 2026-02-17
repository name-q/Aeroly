/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), and `large`.
 */
import React from 'react';
import { Checkbox } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Checkbox.Group size="small" options={['Small A', 'Small B']} defaultValue={['Small A']} />
    <Checkbox.Group size="medium" options={['Medium A', 'Medium B']} defaultValue={['Medium A']} />
    <Checkbox.Group size="large" options={['Large A', 'Large B']} defaultValue={['Large A']} />
  </div>
);
