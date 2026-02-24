/**
 * title: " "
 * description: 列配置 `sorter` 开启排序，点击表头切换升序/降序/取消。
 */
import React from 'react';
import { Table } from 'aeroly';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  {
    title: '年龄',
    dataIndex: 'age',
    sorter: (a: any, b: any) => a.age - b.age,
  },
  {
    title: '成绩',
    dataIndex: 'score',
    sorter: (a: any, b: any) => a.score - b.score,
    defaultSortOrder: 'descend' as const,
  },
];

const dataSource = [
  { id: 1, name: '张三', age: 28, score: 88 },
  { id: 2, name: '李四', age: 22, score: 95 },
  { id: 3, name: '王五', age: 35, score: 72 },
  { id: 4, name: '赵六', age: 26, score: 91 },
];

export default () => <Table columns={columns} dataSource={dataSource} pagination={false} />;
