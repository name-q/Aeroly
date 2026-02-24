import React from 'react';
import { Breadcrumb } from 'aeroly';

export default () => (
  <Breadcrumb
    items={[
      { label: 'Home', onClick: () => console.log('Home') },
      { label: 'Components', onClick: () => console.log('Components') },
      { label: 'Breadcrumb' },
    ]}
  />
);
