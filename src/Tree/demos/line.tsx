/**
 * title: " "
 * description: 设置 `showLine` 显示层级连接线。
 */
import React from 'react';
import { Tree } from 'aero-ui';

const treeData = [
  {
    key: 'src',
    title: 'src',
    children: [
      {
        key: 'components',
        title: 'components',
        children: [
          { key: 'button', title: 'Button.tsx' },
          { key: 'input', title: 'Input.tsx' },
          { key: 'tree', title: 'Tree.tsx' },
        ],
      },
      {
        key: 'utils',
        title: 'utils',
        children: [
          { key: 'helpers', title: 'helpers.ts' },
          { key: 'hooks', title: 'hooks.ts' },
        ],
      },
      { key: 'index', title: 'index.ts' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} showLine defaultExpandAll />
);
