/**
 * title: 垂直分割线
 * description: 用于行内元素之间的分隔。
 */
import React from 'react';
import { Divider } from 'aero-ui';

export default () => (
  <div>
    <span>首页</span>
    <Divider direction="vertical" />
    <span>文档</span>
    <Divider direction="vertical" />
    <span>关于</span>
  </div>
);
