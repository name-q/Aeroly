/**
 * title: " "
 * description: 节点设置 `disabled` 禁用单个节点。
 */
import React from 'react';
import { Tree } from 'aeroly';

const treeData = [
  {
    key: '1',
    title: '可用节点',
    children: [
      { key: '1-1', title: '子节点 A' },
      { key: '1-2', title: '子节点 B（禁用）', disabled: true },
      { key: '1-3', title: '子节点 C' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} checkable defaultExpandAll />
);
