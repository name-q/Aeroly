import React from 'react';
import { Tabs } from 'aeroly';
import { Home, Settings, User } from 'lucide-react';

export default () => {
  return (
    <Tabs
      items={[
        { key: '1', label: '首页', icon: Home, children: <p>首页内容。</p> },
        { key: '2', label: '个人', icon: User, children: <p>个人中心内容。</p> },
        { key: '3', label: '设置', icon: Settings, children: <p>设置页内容。</p> },
      ]}
    />
  );
};
