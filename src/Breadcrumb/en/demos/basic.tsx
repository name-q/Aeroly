import React from 'react';
import { Breadcrumb } from 'aero-ui';

export default () => (
  <Breadcrumb
    items={[
      { label: 'Home', onClick: () => console.log('Home') },
      { label: 'Components', onClick: () => console.log('Components') },
      { label: 'Breadcrumb' },
    ]}
  />
);
