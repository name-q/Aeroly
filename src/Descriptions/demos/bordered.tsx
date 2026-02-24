/**
 * title: " "
 * description: 设置 `bordered` 显示边框样式，适合信息密度较高的场景。
 */
import React from 'react';
import { Descriptions } from 'aeroly';

export default () => (
  <Descriptions
    title="订单详情"
    bordered
    items={[
      { label: '商品名称', children: 'AeroUI Pro 年度会员' },
      { label: '订单编号', children: '20240101000001' },
      { label: '状态', children: '已完成' },
      { label: '金额', children: '¥ 299.00' },
      { label: '创建时间', children: '2024-01-01 12:00:00' },
      { label: '备注', children: '首年优惠价', span: 3 },
    ]}
  />
);
