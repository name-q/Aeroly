/**
 * title: " "
 * description: Three sizes `small`, `medium` (default), and `large`.
 */
import React from 'react';
import { TreeSelect } from 'aeroui';

export default () => {
  const treeData = [
    {
      key: 'dept',
      title: 'R&D Department',
      children: [
        { key: 'fe', title: 'Frontend Team' },
        { key: 'be', title: 'Backend Team' },
        { key: 'qa', title: 'QA Team' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect treeData={treeData} size="small" placeholder="Small" defaultExpandAll />
      <TreeSelect treeData={treeData} size="medium" placeholder="Medium" defaultExpandAll />
      <TreeSelect treeData={treeData} size="large" placeholder="Large" defaultExpandAll />
    </div>
  );
};
