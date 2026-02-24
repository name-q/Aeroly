import React from 'react';
import { Tabs } from 'aeroly';
import { Home, Settings, User } from 'lucide-react';

export default () => {
  return (
    <Tabs
      items={[
        { key: '1', label: 'Home', icon: Home, children: <p>Home content.</p> },
        { key: '2', label: 'Profile', icon: User, children: <p>Profile content.</p> },
        { key: '3', label: 'Settings', icon: Settings, children: <p>Settings content.</p> },
      ]}
    />
  );
};
