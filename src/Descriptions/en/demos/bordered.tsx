/**
 * title: " "
 * description: Set `bordered` to show bordered style, suitable for high-density information.
 */
import React from 'react';
import { Descriptions } from 'aeroly';

export default () => (
  <Descriptions
    title="Order Details"
    bordered
    items={[
      { label: 'Product', children: 'Aeroly Pro Annual Membership' },
      { label: 'Order No.', children: '20240101000001' },
      { label: 'Status', children: 'Completed' },
      { label: 'Amount', children: '$299.00' },
      { label: 'Created At', children: '2024-01-01 12:00:00' },
      { label: 'Remark', children: 'First-year discount', span: 3 },
    ]}
  />
);
