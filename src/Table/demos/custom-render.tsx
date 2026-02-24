/**
 * title: " "
 * description: 通过 `render` 自定义列内容，结合 Tag 展示状态、操作按钮等。
 */
import React from 'react';
import { Table, Tag, Button, Flex } from 'aeroui';

const columns = [
  { title: '名称', dataIndex: 'name' },
  {
    title: '状态',
    dataIndex: 'status',
    render: (val: string) => {
      const map: Record<string, 'success' | 'error' | 'warning'> = {
        running: 'success',
        stopped: 'error',
        pending: 'warning',
      };
      const textMap: Record<string, string> = {
        running: '运行中',
        stopped: '已停止',
        pending: '等待中',
      };
      return <Tag type={map[val]} size="small">{textMap[val]}</Tag>;
    },
  },
  {
    title: '操作',
    key: 'action',
    align: 'right',
    render: () => (
      <Flex gap="xs" inline>
        <Button size="small" type="text">编辑</Button>
        <Button size="small" type="text">删除</Button>
      </Flex>
    ),
  },
];

const dataSource = [
  { id: 1, name: '服务 A', status: 'running' },
  { id: 2, name: '服务 B', status: 'stopped' },
  { id: 3, name: '服务 C', status: 'pending' },
  { id: 4, name: '服务 D', status: 'running' },
];

export default () => <Table columns={columns} dataSource={dataSource} pagination={false} />;
