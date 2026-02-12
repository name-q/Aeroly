/**
 * title: " "
 * description: 设置 `status="error"` 标记当前步骤为错误状态。
 */
import React from 'react';
import { Steps } from 'aero-ui';

export default () => (
  <Steps
    current={2}
    status="error"
    items={[
      { title: '提交信息' },
      { title: '验证失败', description: '身份信息不匹配' },
      { title: '完成' },
    ]}
  />
);
