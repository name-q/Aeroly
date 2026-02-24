/**
 * title: " "
 * description: 通过 `size` 控制间距和字号，支持 `small`、`medium`（默认）、`large`。
 */
import React, { useState } from 'react';
import { Descriptions, Segmented } from 'aeroly';
import type { DescriptionsProps } from 'aeroly';

const items = [
  { label: '姓名', children: '张三' },
  { label: '手机号', children: '13800138000' },
  { label: '地区', children: '浙江省杭州市' },
  { label: '地址', children: '西湖区工专路 77 号', span: 2 },
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
      <Descriptions title="用户信息" size={size} bordered items={items} />
    </div>
  );
};
