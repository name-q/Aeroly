/**
 * title: " "
 * description: 通过 `color` 自定义颜色，`round` 开启胶囊形状，`bordered={false}` 去掉边框。
 */
import React from 'react';
import { Tag } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="#7c3aed">紫色</Tag>
      <Tag color="#0891b2">青色</Tag>
      <Tag color="#db2777">粉色</Tag>
      <Tag color="#ea580c">橙色</Tag>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag round type="info">胶囊</Tag>
      <Tag round type="success">胶囊</Tag>
      <Tag round type="warning">胶囊</Tag>
      <Tag round type="error">胶囊</Tag>
    </div>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag bordered={false} type="info">无边框</Tag>
      <Tag bordered={false} type="success">无边框</Tag>
      <Tag bordered={false} type="warning">无边框</Tag>
      <Tag bordered={false} type="error">无边框</Tag>
    </div>
  </div>
);
