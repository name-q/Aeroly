/**
 * title: " "
 * description: Click the button to slide open a drawer from the right.
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aero-ui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Drawer
      </Button>
      <Drawer open={open} onOpenChange={setOpen} title="Basic Drawer">
        <p>This is the drawer content area.</p>
        <p>Click the mask or press Esc to close.</p>
      </Drawer>
    </>
  );
};
