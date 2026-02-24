import React from 'react';
import { Breadcrumb } from 'aeroly';

export default () => (
  <Breadcrumb
    items={[
      { label: 'Home', onClick: () => console.log('Home') },
      {
        label: 'Components',
        onClick: () => console.log('Components'),
        menu: [
          { label: 'Data Entry', onClick: () => console.log('Data Entry') },
          { label: 'Data Display', onClick: () => console.log('Data Display') },
          { label: 'Navigation', onClick: () => console.log('Navigation') },
        ],
      },
      { label: 'Breadcrumb' },
    ]}
  />
);
