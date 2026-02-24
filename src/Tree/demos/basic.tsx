/**
 * title: " "
 * description: 最基础的树形结构，点击箭头展开/收起。
 */
import React from 'react';
import { Tree } from 'aeroui';

const treeData = [
  {
    key: '1',
    title: '总公司',
    children: [
      {
        key: '1-1',
        title: '技术部',
        children: [
          { key: '1-1-1', title: '前端组' },
          { key: '1-1-2', title: '后端组' },
          { key: '1-1-3', title: '测试组' },
        ],
      },
      {
        key: '1-2',
        title: '产品部',
        children: [
          { key: '1-2-1', title: '产品设计' },
          { key: '1-2-2', title: '用户研究' },
        ],
      },
      { key: '1-3', title: '行政部' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} defaultExpandedKeys={['1']} />
);
