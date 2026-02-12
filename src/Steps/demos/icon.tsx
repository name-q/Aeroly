/**
 * title: " "
 * description: 通过 `icon` 为步骤指定自定义图标。
 */
import React from 'react';
import { UserRound, ShieldCheck, Rocket } from 'lucide-react';
import { Steps } from 'aero-ui';

export default () => (
  <Steps
    current={2}
    items={[
      { title: '注册', icon: UserRound },
      { title: '验证', icon: ShieldCheck },
      { title: '上线', icon: Rocket },
    ]}
  />
);
