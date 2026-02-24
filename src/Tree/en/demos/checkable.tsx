/**
 * title: " "
 * description: Set `checkable` to enable checkboxes with parent-child association (checking a parent auto-checks all children).
 */
import React from 'react';
import { Tree } from 'aeroly';

const treeData = [
  {
    key: 'asia',
    title: 'Asia',
    children: [
      {
        key: 'china',
        title: 'China',
        children: [
          { key: 'beijing', title: 'Beijing' },
          { key: 'shanghai', title: 'Shanghai' },
          { key: 'guangzhou', title: 'Guangzhou' },
        ],
      },
      {
        key: 'japan',
        title: 'Japan',
        children: [
          { key: 'tokyo', title: 'Tokyo' },
          { key: 'osaka', title: 'Osaka' },
        ],
      },
    ],
  },
  {
    key: 'europe',
    title: 'Europe',
    children: [
      { key: 'uk', title: 'United Kingdom' },
      { key: 'france', title: 'France' },
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
