/**
 * title: " "
 * description: 设置 `showSearch` 开启搜索功能，搜索时自动展开匹配路径，保留祖先节点。
 */
import React from 'react';
import { TreeSelect } from 'aeroui';

export default () => {
  const treeData = [
    {
      key: 'asia',
      title: '亚洲',
      children: [
        {
          key: 'china',
          title: '中国',
          children: [
            { key: 'beijing', title: '北京' },
            { key: 'shanghai', title: '上海' },
            { key: 'guangzhou', title: '广州' },
          ],
        },
        {
          key: 'japan',
          title: '日本',
          children: [
            { key: 'tokyo', title: '东京' },
            { key: 'osaka', title: '大阪' },
          ],
        },
      ],
    },
    {
      key: 'europe',
      title: '欧洲',
      children: [
        {
          key: 'uk',
          title: '英国',
          children: [
            { key: 'london', title: '伦敦' },
          ],
        },
        {
          key: 'france',
          title: '法国',
          children: [
            { key: 'paris', title: '巴黎' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect
        treeData={treeData}
        showSearch
        placeholder="搜索城市"
        searchPlaceholder="输入关键词..."
        defaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        showSearch
        multiple
        placeholder="多选 + 搜索"
        searchPlaceholder="搜索..."
        defaultExpandAll
      />
    </div>
  );
};
