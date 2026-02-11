/**
 * title: " "
 * description: 基础单选树选择器，点击展开下拉面板，选择树节点。
 */
import React from 'react';
import { TreeSelect } from 'aero-ui';

export default () => {
  const treeData = [
    {
      key: 'zhejiang',
      title: '浙江省',
      children: [
        {
          key: 'hangzhou',
          title: '杭州市',
          children: [
            { key: 'xihu', title: '西湖区' },
            { key: 'binjiang', title: '滨江区' },
          ],
        },
        {
          key: 'ningbo',
          title: '宁波市',
          children: [
            { key: 'haishu', title: '海曙区' },
            { key: 'jiangbei', title: '江北区' },
          ],
        },
      ],
    },
    {
      key: 'jiangsu',
      title: '江苏省',
      children: [
        {
          key: 'nanjing',
          title: '南京市',
          children: [
            { key: 'xuanwu', title: '玄武区' },
            { key: 'gulou', title: '鼓楼区' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <TreeSelect
        treeData={treeData}
        placeholder="请选择地区"
        defaultExpandAll
      />
      <TreeSelect
        treeData={treeData}
        placeholder="只能选叶子节点"
        treeLeafOnly
        defaultExpandAll
        allowClear
      />
    </div>
  );
};
