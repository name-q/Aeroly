/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { InputNumber } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <InputNumber defaultValue={10} size="small" min={0} max={100} />
    <InputNumber defaultValue={10} min={0} max={100} />
    <InputNumber defaultValue={10} size="large" min={0} max={100} />
  </div>
);
