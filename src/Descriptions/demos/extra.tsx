/**
 * title: " "
 * description: 通过 `extra` 在标题右侧放置操作按钮。
 */
import React from 'react';
import { Descriptions, Button } from 'aero-ui';

export default () => (
  <Descriptions
    title="设备信息"
    extra={<Button size="small">编辑</Button>}
    bordered
    items={[
      { label: '设备名称', children: 'MacBook Pro' },
      { label: '序列号', children: 'C02X1234ABCD' },
      { label: '系统版本', children: 'macOS 15.0' },
      { label: '处理器', children: 'Apple M4 Pro' },
      { label: '内存', children: '36 GB' },
      { label: '存储', children: '1 TB SSD' },
    ]}
  />
);
