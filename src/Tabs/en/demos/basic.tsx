import React from 'react';
import { Tabs } from 'aero-ui';

export default () => {
  return (
    <Tabs
      items={[
        { key: '1', label: 'Overview', children: <p>This is the overview panel content.</p> },
        { key: '2', label: 'Details', children: <p>This is the details panel content.</p> },
        { key: '3', label: 'Settings', children: <p>This is the settings panel content.</p> },
      ]}
    />
  );
};
