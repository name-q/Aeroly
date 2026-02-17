/**
 * title: " "
 * description: Basic cascading selection. Click to expand submenus level by level, select a leaf node to complete.
 */
import React from 'react';
import { Cascader } from 'aero-ui';

export default () => {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang Province',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            { value: 'xihu', label: 'Xihu District' },
            { value: 'binjiang', label: 'Binjiang District' },
            { value: 'yuhang', label: 'Yuhang District' },
          ],
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          children: [
            { value: 'haishu', label: 'Haishu District' },
            { value: 'jiangbei', label: 'Jiangbei District' },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu Province',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            { value: 'xuanwu', label: 'Xuanwu District' },
            { value: 'gulou', label: 'Gulou District' },
          ],
        },
        {
          value: 'suzhou',
          label: 'Suzhou',
          children: [
            { value: 'gusu', label: 'Gusu District' },
            { value: 'yuanqu', label: 'Industrial Park' },
          ],
        },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 320 }}>
      <Cascader options={options} placeholder="Select a region" />
      <Cascader options={options} placeholder="Clearable" allowClear defaultValue={['zhejiang', 'hangzhou', 'xihu']} />
    </div>
  );
};
