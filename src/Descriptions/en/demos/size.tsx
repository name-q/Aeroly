/**
 * title: " "
 * description: Control spacing and font size via `size`, supports `small`, `medium` (default), and `large`.
 */
import React, { useState } from 'react';
import { Descriptions, Segmented } from 'aero-ui';
import type { DescriptionsProps } from 'aero-ui';

const items = [
  { label: 'Name', children: 'John Doe' },
  { label: 'Phone', children: '13800138000' },
  { label: 'Region', children: 'Hangzhou, Zhejiang' },
  { label: 'Address', children: '77 Gongzhuan Road, Xihu District', span: 2 },
];

export default () => {
  const [size, setSize] = useState<DescriptionsProps['size']>('medium');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Segmented
        value={size}
        onChange={(v) => setSize(v as DescriptionsProps['size'])}
        options={[
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' },
        ]}
      />
      <Descriptions title="User Info" size={size} bordered items={items} />
    </div>
  );
};
