/**
 * title: " "
 * description: Set `disabled` on a node to disable individual nodes.
 */
import React from 'react';
import { Tree } from 'aero-ui';

const treeData = [
  {
    key: '1',
    title: 'Available Node',
    children: [
      { key: '1-1', title: 'Child A' },
      { key: '1-2', title: 'Child B (disabled)', disabled: true },
      { key: '1-3', title: 'Child C' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} checkable defaultExpandAll />
);
