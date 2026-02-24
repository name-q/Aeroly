/**
 * title: " "
 * description: You can pass a ReactNode as tooltip content.
 */
import React from 'react';
import { Tooltip, Button } from 'aeroly';

export default () => (
  <Tooltip
    title={
      <div>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>Shortcuts</div>
        <div>Cmd + S Save</div>
        <div>Cmd + Z Undo</div>
      </div>
    }
  >
    <Button>ReactNode Content</Button>
  </Tooltip>
);
