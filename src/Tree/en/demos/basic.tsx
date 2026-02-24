/**
 * title: " "
 * description: Basic tree structure. Click the arrow to expand/collapse.
 */
import React from 'react';
import { Tree } from 'aeroly';

const treeData = [
  {
    key: '1',
    title: 'Headquarters',
    children: [
      {
        key: '1-1',
        title: 'Engineering',
        children: [
          { key: '1-1-1', title: 'Frontend Team' },
          { key: '1-1-2', title: 'Backend Team' },
          { key: '1-1-3', title: 'QA Team' },
        ],
      },
      {
        key: '1-2',
        title: 'Product',
        children: [
          { key: '1-2-1', title: 'Product Design' },
          { key: '1-2-2', title: 'User Research' },
        ],
      },
      { key: '1-3', title: 'Administration' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} defaultExpandedKeys={['1']} />
);
