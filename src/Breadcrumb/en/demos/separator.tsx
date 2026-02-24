import React from 'react';
import { Breadcrumb } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Breadcrumb
      separator="/"
      items={[
        { label: 'Home', onClick: () => console.log('Home') },
        { label: 'Components', onClick: () => console.log('Components') },
        { label: 'Breadcrumb' },
      ]}
    />
    <Breadcrumb
      separator=">"
      items={[
        { label: 'Home', onClick: () => console.log('Home') },
        { label: 'Components', onClick: () => console.log('Components') },
        { label: 'Breadcrumb' },
      ]}
    />
  </div>
);
