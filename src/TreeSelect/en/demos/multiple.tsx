/**
 * title: " "
 * description: Set `multiple` to enable multi-select mode with checkboxes and parent-child linkage.
 */
import React from 'react';
import { TreeSelect } from 'aero-ui';

export default () => {
  const treeData = [
    {
      key: 'frontend',
      title: 'Frontend',
      children: [
        { key: 'react', title: 'React' },
        { key: 'vue', title: 'Vue' },
        { key: 'angular', title: 'Angular' },
      ],
    },
    {
      key: 'backend',
      title: 'Backend',
      children: [
        { key: 'node', title: 'Node.js' },
        { key: 'go', title: 'Go' },
        { key: 'rust', title: 'Rust' },
      ],
    },
    {
      key: 'mobile',
      title: 'Mobile',
      children: [
        { key: 'rn', title: 'React Native' },
        { key: 'flutter', title: 'Flutter' },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 360 }}>
      <TreeSelect
        treeData={treeData}
        multiple
        placeholder="Select tech stack"
        defaultExpandAll
        defaultValue={['react', 'vue']}
      />
      <TreeSelect
        treeData={treeData}
        multiple
        allowClear
        maxTagCount={3}
        placeholder="Show up to 3 tags"
        defaultExpandAll
        defaultValue={['react', 'vue', 'node', 'go']}
      />
    </div>
  );
};
