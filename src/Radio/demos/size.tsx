/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Radio } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Radio.Group size="small" options={['Small A', 'Small B']} defaultValue="Small A" />
    <Radio.Group size="medium" options={['Medium A', 'Medium B']} defaultValue="Medium A" />
    <Radio.Group size="large" options={['Large A', 'Large B']} defaultValue="Large A" />
  </div>
);
