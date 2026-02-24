/**
 * title: " "
 * description: Fully control visibility via `open` and `onOpenChange`.
 */
import React, { useState } from 'react';
import { Tooltip, Button } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Tooltip title="Controlled Tooltip" open={open} onOpenChange={setOpen}>
        <Button>Controlled</Button>
      </Tooltip>
      <Button size="small" onClick={() => setOpen((o) => !o)}>
        {open ? 'Close' : 'Open'}
      </Button>
    </div>
  );
};
