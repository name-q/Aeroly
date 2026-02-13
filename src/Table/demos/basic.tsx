/**
 * title: " "
 * description: 最基础的表格用法，通过 `columns` 和 `dataSource` 渲染。
 */
import React from 'react';
import { Table } from 'aero-ui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { id: 1, name: '张三', age: 28, address: '杭州市西湖区' },
  { id: 2, name: '李四', age: 32, address: '北京市朝阳区' },
  { id: 3, name: '王五', age: 25, address: '上海市浦东新区' },
];

export default () => <Table columns={columns} dataSource={dataSource} pagination={false} />;
