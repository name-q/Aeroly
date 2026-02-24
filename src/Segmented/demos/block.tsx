/**
 * title: " "
 * description: 设置 `block` 属性使分段控制器撑满父容器宽度，各选项等分。
 */
import React from 'react';
import { Segmented } from 'aeroui';

export default () => (
  <Segmented
    options={['全部', '未读', '已读', '已归档']}
    defaultValue="全部"
    block
  />
);
