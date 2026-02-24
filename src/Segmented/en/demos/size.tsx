/**
 * title: " "
 * description: Three sizes of segmented controls.
 */
import React from 'react';
import { Segmented } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Segmented options={['S', 'M', 'L']} size="small" defaultValue="S" />
    <Segmented options={['S', 'M', 'L']} size="medium" defaultValue="M" />
    <Segmented options={['S', 'M', 'L']} size="large" defaultValue="L" />
  </div>
);
