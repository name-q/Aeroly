/**
 * title: " "
 * description: 设置 `showSearch` 开启搜索，输入关键词可快速定位到叶子路径。
 */
import React from 'react';
import { Cascader } from 'aeroly';

export default () => {
  const options = [
    {
      value: 'asia',
      label: '亚洲',
      children: [
        {
          value: 'china',
          label: '中国',
          children: [
            { value: 'beijing', label: '北京' },
            { value: 'shanghai', label: '上海' },
            { value: 'guangzhou', label: '广州' },
          ],
        },
        {
          value: 'japan',
          label: '日本',
          children: [
            { value: 'tokyo', label: '东京' },
            { value: 'osaka', label: '大阪' },
          ],
        },
      ],
    },
    {
      value: 'europe',
      label: '欧洲',
      children: [
        {
          value: 'uk',
          label: '英国',
          children: [{ value: 'london', label: '伦敦' }],
        },
        {
          value: 'france',
          label: '法国',
          children: [{ value: 'paris', label: '巴黎' }],
        },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: 320 }}>
      <Cascader
        options={options}
        showSearch
        placeholder="搜索城市"
        searchPlaceholder="输入关键词..."
      />
    </div>
  );
};
