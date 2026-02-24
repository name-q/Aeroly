/**
 * title: " "
 * description: 最简单的步骤条，通过 `current` 指定当前步骤。
 */
import React from 'react';
import { Steps } from 'aeroly';

export default () => (
  <Steps
    current={2}
    items={[
      { title: '创建账号', description: '注册基本信息' },
      { title: '身份验证', description: '完成实名认证' },
      { title: '完成', description: '开始使用' },
    ]}
  />
);
