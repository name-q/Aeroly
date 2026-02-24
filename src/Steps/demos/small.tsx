/**
 * title: " "
 * description: 设置 `size="small"` 使用迷你版本。
 */
import React from 'react';
import { Steps } from 'aeroly';

export default () => (
  <Steps
    current={2}
    size="small"
    items={[
      { title: '登录' },
      { title: '选购' },
      { title: '支付' },
      { title: '完成' },
    ]}
  />
);
