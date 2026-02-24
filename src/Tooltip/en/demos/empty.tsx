/**
 * title: " "
 * description: Tooltip is not shown when `title` is empty.
 */
import React, { useState } from 'react';
import { Tooltip, Button } from 'aeroui';

export default () => {
  const [show, setShow] = useState(true);

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip title={show ? 'Tooltip is visible' : ''}>
        <Button>Conditional Tooltip</Button>
      </Tooltip>
      <Button size="small" onClick={() => setShow((s) => !s)}>
        {show ? 'Clear title' : 'Set title'}
      </Button>
    </div>
  );
};
