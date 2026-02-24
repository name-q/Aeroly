import React from 'react';
import { Tabs, Segmented } from 'aeroui';
import type { TabsVariant } from 'aeroui';

const tabItems = [
  { key: '1', label: 'Music', children: <p>Discover the latest music recommendations.</p> },
  { key: '2', label: 'Podcasts', children: <p>Popular podcast show list.</p> },
  { key: '3', label: 'Videos', children: <p>Curated video content.</p> },
];

export default () => {
  const [variant, setVariant] = React.useState<TabsVariant>('line');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Segmented
        options={[
          { value: 'line', label: 'Line' },
          { value: 'card', label: 'Card' },
          { value: 'pill', label: 'Pill' },
        ]}
        value={variant}
        onChange={(v) => setVariant(v as TabsVariant)}
      />
      <Tabs items={tabItems} variant={variant} />
    </div>
  );
};
