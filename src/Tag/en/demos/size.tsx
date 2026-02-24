/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { Tag } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
    <Tag size="small" type="info">Small</Tag>
    <Tag size="medium" type="info">Medium</Tag>
    <Tag size="large" type="info">Large</Tag>
  </div>
);
