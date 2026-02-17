/**
 * title: " "
 * description: Disable the entire selector, or disable individual nodes.
 */
import React from 'react';
import { TreeSelect } from 'aero-ui';

export default () => {
  const treeData = [
    {
      key: 'dept',
      title: 'R&D Department',
      children: [
        { key: 'fe', title: 'Frontend Team' },
        { key: 'be', title: 'Backend Team', disabled: true },
        { key: 'qa', title: 'QA Team' },
      ],
    },
    {
      key: 'design',
      title: 'Design Department',
      disabled: true,
      children: [
        { key: 'ui', title: 'UI Team' },
        { key: 'ux', title: 'UX Team' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect
        treeData={treeData}
        placeholder="Some nodes disabled"
        defaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        disabled
        defaultValue="fe"
        placeholder="Fully disabled"
        defaultExpandAll
      />
    </div>
  );
};
