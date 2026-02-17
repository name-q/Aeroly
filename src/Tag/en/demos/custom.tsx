/**
 * title: " "
 * description: Customize color via `color`, enable pill shape via `round`, remove border via `bordered={false}`.
 */
import React from 'react';
import { Tag } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="#7c3aed">Purple</Tag>
      <Tag color="#0891b2">Cyan</Tag>
      <Tag color="#db2777">Pink</Tag>
      <Tag color="#ea580c">Orange</Tag>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag round type="info">Pill</Tag>
      <Tag round type="success">Pill</Tag>
      <Tag round type="warning">Pill</Tag>
      <Tag round type="error">Pill</Tag>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag bordered={false} type="info">Borderless</Tag>
      <Tag bordered={false} type="success">Borderless</Tag>
      <Tag bordered={false} type="warning">Borderless</Tag>
      <Tag bordered={false} type="error">Borderless</Tag>
    </div>
  </div>
);
