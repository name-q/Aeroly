/**
 * title: " "
 * description: 禁用整个选择器，或禁用单个节点。
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
        { key: 'be', title: '后端组', disabled: true },
        { key: 'qa', title: '测试组' },
      ],
    },
    {
      key: 'design',
      title: '设计部',
      disabled: true,
      children: [
        { key: 'ui', title: 'UI 组' },
        { key: 'ux', title: 'UX 组' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect
        treeData={treeData}
        placeholder="部分节点禁用"
        defaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        disabled
        defaultValue="fe"
        placeholder="整体禁用"
        defaultExpandAll
      />
    </div>
  );
};
