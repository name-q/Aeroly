/**
 * title: " "
 * description: 三种尺寸 `small`、`medium`（默认）、`large`。
 */
import React from 'react';
import { TreeSelect } from 'aeroui';

export default () => {
  const treeData = [
    {
      key: 'dept',
      title: '研发部',
      children: [
        { key: 'fe', title: '前端组' },
        { key: 'be', title: '后端组' },
        { key: 'qa', title: '测试组' },
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
