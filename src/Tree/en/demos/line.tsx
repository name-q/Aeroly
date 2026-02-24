/**
 * title: " "
 * description: Set `showLine` to display connecting lines between levels.
 */
import React from 'react';
import { Tree } from 'aeroui';

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
