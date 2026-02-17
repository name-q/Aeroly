import React from 'react';
import { Tabs, Button } from 'aero-ui';

export default () => {
  return (
    <Tabs
      items={[
        { key: '1', label: 'Articles', children: <p>Article list.</p> },
        { key: '2', label: 'Comments', children: <p>Comment list.</p> },
        { key: '3', label: 'Favorites', children: <p>Favorites list.</p> },
      ]}
      extra={<Button size="small">Publish</Button>}
    />
  );
};
