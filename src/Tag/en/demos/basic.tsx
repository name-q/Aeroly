/**
 * title: " "
 * description: Basic tag usage.
 */
import React from 'react';
import { Tag } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Tag>Default</Tag>
    <Tag type="info">Info</Tag>
    <Tag type="success">Success</Tag>
    <Tag type="warning">Warning</Tag>
    <Tag type="error">Error</Tag>
  </div>
);
