/**
 * title: " "
 * description: Fully control visibility via `open` and `onOpenChange`.
 */
import { Button, Popover } from 'aeroui';
import React, { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <Popover
        content="Controlled popover"
        open={open}
        onOpenChange={(val: boolean) =>
          console.log('Controlled Popover state:', val)
        }
        trigger="click"
      >
        Controlled Popover
      </Popover>
      <Button size="small" type="primary" onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Open'}
      </Button>
    </div>
  );
};
