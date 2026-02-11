/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Pagination } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Pagination total={200} size="small" />
    <Pagination total={200} />
    <Pagination total={200} size="large" />
  </div>
);
