/**
 * title: " "
 * description: `disabled` fully disables interaction, `readOnly` displays only without modification.
 */
import React from 'react';
import { Rate } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Rate defaultValue={3} disabled />
    <Rate defaultValue={4} readOnly />
  </div>
);
