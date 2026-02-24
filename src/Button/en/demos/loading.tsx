/**
 * title: " "
 * description: Loading state automatically shows a spinning icon and disables interaction. Disabled directly disables the button.
 */
import React from 'react';
import { Button } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
    <Button loading type="primary">Submitting</Button>
    <Button loading>Loading</Button>
    <Button disabled>Disabled</Button>
    <Button disabled type="primary">Disabled</Button>
    <Button disabled type="text">Disabled</Button>
  </div>
);
