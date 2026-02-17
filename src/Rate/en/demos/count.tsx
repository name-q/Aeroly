/**
 * title: " "
 * description: Set `count` to customize the total number of stars.
 */
import React from 'react';
import { Rate } from 'aero-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Rate count={3} defaultValue={2} />
    <Rate count={10} defaultValue={7} />
  </div>
);
