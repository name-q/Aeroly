import React from 'react';
import { Breadcrumb } from 'aeroly';

export default () => (
  <Breadcrumb
    maxItems={3}
    items={[
      { label: 'Home', onClick: () => console.log('Home') },
      { label: 'Level 1', onClick: () => console.log('Level 1') },
      { label: 'Level 2', onClick: () => console.log('Level 2') },
      { label: 'Level 3', onClick: () => console.log('Level 3') },
      { label: 'Level 4', onClick: () => console.log('Level 4') },
      { label: 'Current Page' },
    ]}
  />
);
