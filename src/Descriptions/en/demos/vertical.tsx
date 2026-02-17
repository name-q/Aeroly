/**
 * title: " "
 * description: Set `layout="vertical"` to arrange labels and content vertically.
 */
import React from 'react';
import { Descriptions } from 'aero-ui';

export default () => (
  <Descriptions
    title="Project Info"
    layout="vertical"
    bordered
    items={[
      { label: 'Project Name', children: 'AeroUI' },
      { label: 'Owner', children: 'John Doe' },
      { label: 'Status', children: 'In Progress' },
      { label: 'Description', children: 'A React UI component library designed for AI coding', span: 2 },
      { label: 'Created At', children: '2024-01-01' },
    ]}
  />
);
