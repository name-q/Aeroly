/**
 * title: " "
 * description: 设置 `bordered` 显示边框，`striped` 显示斑马纹。
 */
import React from 'react';
import { Table } from 'aeroly';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `用户 ${i + 1}`,
  age: 20 + i * 3,
  address: `城市 ${i + 1} 区`,
}));

export default () => (
  <Table columns={columns} dataSource={dataSource} bordered striped pagination={false} />
);
