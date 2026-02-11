/**
 * title: " "
 * description: 设置 `multiple` 开启多选模式，下拉面板中以勾选框形式选择，支持父子联动。
 */
import React from 'react';
import { TreeSelect } from 'aero-ui';

export default () => {
  const treeData = [
    {
      key: 'frontend',
      title: '前端',
      children: [
        { key: 'react', title: 'React' },
        { key: 'vue', title: 'Vue' },
        { key: 'angular', title: 'Angular' },
      ],
    },
    {
      key: 'backend',
      title: '后端',
      children: [
        { key: 'node', title: 'Node.js' },
        { key: 'go', title: 'Go' },
        { key: 'rust', title: 'Rust' },
      ],
    },
    {
      key: 'mobile',
      title: '移动端',
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
        placeholder="选择技术栈"
        defaultExpandAll
        defaultValue={['react', 'vue']}
      />
      <TreeSelect
        treeData={treeData}
        multiple
        allowClear
        maxTagCount={3}
        placeholder="最多显示 3 个标签"
        defaultExpandAll
        defaultValue={['react', 'vue', 'node', 'go']}
      />
    </div>
  );
};
