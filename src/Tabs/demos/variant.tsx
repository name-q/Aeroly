import React from 'react';
import { Tabs, Segmented } from 'aeroly';
import type { TabsVariant } from 'aeroly';

const tabItems = [
  { key: '1', label: '音乐', children: <p>发现最新的音乐推荐。</p> },
  { key: '2', label: '播客', children: <p>热门播客节目列表。</p> },
  { key: '3', label: '视频', children: <p>精选视频内容。</p> },
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
