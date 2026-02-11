/**
 * title: " "
 * description: 三种尺寸：`small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { Tag } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Tag size="small" type="info">Small</Tag>
    <Tag size="medium" type="info">Medium</Tag>
    <Tag size="large" type="info">Large</Tag>
  </div>
);
