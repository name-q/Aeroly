/**
 * title: 基础用法
 * description: 默认水平分割线，线条从两端渐隐。
 */
import React from 'react';
import { Divider } from 'aero-ui';

export default () => (
  <div>
    <p>上方内容</p>
    <Divider />
    <p>下方内容</p>
  </div>
);
