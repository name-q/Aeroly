/**
 * title: " "
 * description: 设置 `checkable` 开启勾选框，支持父子联动（勾选父节点自动勾选所有子节点）。
 */
import React from 'react';
import { Tree } from 'aeroui';

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
      { key: 'uk', title: '英国' },
      { key: 'france', title: '法国' },
    ],
  },
];

export default () => (
  <Tree
    treeData={treeData}
    checkable
    defaultExpandAll
    defaultCheckedKeys={['china']}
  />
);
