/**
 * title: " "
 * description: 基础标签用法。
 */
import React from 'react';
import { Tag } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <Tag>默认</Tag>
    <Tag type="info">信息</Tag>
    <Tag type="success">成功</Tag>
    <Tag type="warning">警告</Tag>
    <Tag type="error">错误</Tag>
  </div>
);
