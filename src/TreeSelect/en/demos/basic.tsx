/**
 * title: " "
 * description: Basic single-select tree selector. Click to expand the dropdown panel and select a tree node.
 */
import React from 'react';
import { TreeSelect } from 'aero-ui';

export default () => {
  const treeData = [
    {
      key: 'zhejiang',
      title: 'Zhejiang Province',
      children: [
        {
          key: 'hangzhou',
          title: 'Hangzhou',
          children: [
            { key: 'xihu', title: 'Xihu District' },
            { key: 'binjiang', title: 'Binjiang District' },
          ],
        },
        {
          key: 'ningbo',
          title: 'Ningbo',
          children: [
            { key: 'haishu', title: 'Haishu District' },
            { key: 'jiangbei', title: 'Jiangbei District' },
          ],
        },
      ],
    },
    {
      key: 'jiangsu',
      title: 'Jiangsu Province',
      children: [
        {
          key: 'nanjing',
          title: 'Nanjing',
          children: [
            { key: 'xuanwu', title: 'Xuanwu District' },
            { key: 'gulou', title: 'Gulou District' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect
        treeData={treeData}
        placeholder="Select a region"
        defaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        placeholder="Leaf nodes only"
        treeLeafOnly
        defaultExpandAll
        allowClear
      />
    </div>
  );
};
