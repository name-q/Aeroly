/**
 * title: " "
 * description: 通过 children 嵌入文字，orientation 控制文字位置。
 */
import React from 'react';
import { Divider } from 'aeroly';

export default () => (
  <div>
    <Divider>居中文字</Divider>
    <Divider orientation="left">左侧文字</Divider>
    <Divider orientation="right">右侧文字</Divider>
  </div>
);
