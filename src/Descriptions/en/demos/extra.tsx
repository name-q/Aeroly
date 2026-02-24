/**
 * title: " "
 * description: Place action buttons on the right side of the title via `extra`.
 */
import React from 'react';
import { Descriptions, Button } from 'aeroly';

export default () => (
  <Descriptions
    title="Device Info"
    extra={<Button size="small">Edit</Button>}
    bordered
    items={[
      { label: 'Device Name', children: 'MacBook Pro' },
      { label: 'Serial No.', children: 'C02X1234ABCD' },
      { label: 'OS Version', children: 'macOS 15.0' },
      { label: 'Processor', children: 'Apple M4 Pro' },
      { label: 'Memory', children: '36 GB' },
      { label: 'Storage', children: '1 TB SSD' },
    ]}
  />
);
