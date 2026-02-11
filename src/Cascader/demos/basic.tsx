/**
 * title: " "
 * description: 基础级联选择，点击逐级展开子菜单，选择叶子节点完成选择。
 */
import React from 'react';
import { Cascader } from 'aero-ui';

export default () => {
  const options = [
    {
      value: 'zhejiang',
      label: '浙江省',
      children: [
        {
          value: 'hangzhou',
          label: '杭州市',
          children: [
            { value: 'xihu', label: '西湖区' },
            { value: 'binjiang', label: '滨江区' },
            { value: 'yuhang', label: '余杭区' },
          ],
        },
        {
          value: 'ningbo',
          label: '宁波市',
          children: [
            { value: 'haishu', label: '海曙区' },
            { value: 'jiangbei', label: '江北区' },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: '江苏省',
      children: [
        {
          value: 'nanjing',
          label: '南京市',
          children: [
            { value: 'xuanwu', label: '玄武区' },
            { value: 'gulou', label: '鼓楼区' },
          ],
        },
        {
          value: 'suzhou',
          label: '苏州市',
          children: [
            { value: 'gusu', label: '姑苏区' },
            { value: 'yuanqu', label: '工业园区' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Cascader options={options} placeholder="请选择地区" />
      <Cascader options={options} placeholder="可清除" allowClear defaultValue={['zhejiang', 'hangzhou', 'xihu']} />
    </div>
  );
};
