/**
 * title: " "
 * description: Customize column content via `render`, combined with Tag for status display and action buttons.
 */
import React from 'react';
import { Table, Tag, Button, Flex } from 'aero-ui';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (val: string) => {
      const map: Record<string, 'success' | 'error' | 'warning'> = {
        running: 'success',
        stopped: 'error',
        pending: 'warning',
      };
      const textMap: Record<string, string> = {
        running: 'Running',
        stopped: 'Stopped',
        pending: 'Pending',
      };
      return <Tag type={map[val]} size="small">{textMap[val]}</Tag>;
    },
  },
  {
    title: 'Actions',
    key: 'action',
    align: 'right',
    render: () => (
      <Flex gap="xs" inline>
        <Button size="small" type="text">Edit</Button>
        <Button size="small" type="text">Delete</Button>
      </Flex>
    ),
  },
];

const dataSource = [
  { id: 1, name: 'Service A', status: 'running' },
  { id: 2, name: 'Service B', status: 'stopped' },
  { id: 3, name: 'Service C', status: 'pending' },
  { id: 4, name: 'Service D', status: 'running' },
];

export default () => <Table columns={columns} dataSource={dataSource} pagination={false} />;
