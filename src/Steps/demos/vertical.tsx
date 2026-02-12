/**
 * title: " "
 * description: 设置 `direction="vertical"` 垂直展示步骤条。
 */
import React from 'react';
import { Steps } from 'aero-ui';

export default () => (
  <Steps
    current={2}
    direction="vertical"
    items={[
      { title: '提交订单', description: '已提交，等待审核' },
      { title: '审核中', description: '预计 1-2 个工作日' },
      { title: '审核通过', description: '审核完成后自动发货' },
      { title: '已完成' },
    ]}
  />
);
