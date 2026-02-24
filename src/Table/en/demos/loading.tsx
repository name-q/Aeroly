/**
 * title: " "
 * description: Set `loading` to show a loading overlay, useful during data requests.
 */
import React, { useState } from 'react';
import { Table, Button, Flex } from 'aeroui';

const columns = [
  { title: 'Name', dataIndex: 'name' },
  { title: 'Age', dataIndex: 'age' },
  { title: 'Address', dataIndex: 'address' },
];

const dataSource = [
  { id: 1, name: 'John Smith', age: 28, address: 'West Lake District, Hangzhou' },
  { id: 2, name: 'Jane Doe', age: 32, address: 'Chaoyang District, Beijing' },
  { id: 3, name: 'Bob Wilson', age: 25, address: 'Pudong District, Shanghai' },
];

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <Flex direction="column" gap="md">
      <Table columns={columns} dataSource={dataSource} loading={loading} pagination={false} />
      <Flex>
        <Button size="small" onClick={() => setLoading((v) => !v)}>
          {loading ? 'Done Loading' : 'Reload'}
        </Button>
      </Flex>
    </Flex>
  );
};
