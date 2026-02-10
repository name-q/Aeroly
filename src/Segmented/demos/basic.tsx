/**
 * title: " "
 * description: 传入字符串数组即可快速创建分段控制器。
 */
import React from 'react';
import { Segmented } from 'aero-ui';

export default () => (
  <Segmented
    options={['日', '周', '月', '年']}
    onChange={(val) => console.log('选中:', val)}
  />
);
