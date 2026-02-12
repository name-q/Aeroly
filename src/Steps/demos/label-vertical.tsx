/**
 * title: " "
 * description: 设置 `labelPlacement="vertical"` 将标签放在图标下方。
 */
import React from 'react';
import { Steps } from 'aero-ui';

export default () => (
  <Steps
    current={2}
    labelPlacement="vertical"
    items={[
      { title: '选择商品' },
      { title: '确认订单' },
      { title: '支付' },
      { title: '完成' },
    ]}
  />
);
