/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Rate } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Rate size="small" defaultValue={3} />
    <Rate size="medium" defaultValue={3} />
    <Rate size="large" defaultValue={3} />
  </div>
);
