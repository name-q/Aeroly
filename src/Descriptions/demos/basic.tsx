/**
 * title: " "
 * description: 最基础的用法，通过 `items` 传入描述项列表。
 */
import React from 'react';
import { Descriptions } from 'aero-ui';

export default () => (
  <Descriptions
    title="用户信息"
    items={[
      { label: '姓名', children: '张三' },
      { label: '手机号', children: '13800138000' },
      { label: '地区', children: '浙江省杭州市' },
      { label: '地址', children: '西湖区工专路 77 号' },
      { label: '备注', children: '无' },
    ]}
  />
);
