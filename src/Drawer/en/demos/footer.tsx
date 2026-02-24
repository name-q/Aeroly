/**
 * title: " "
 * description: Add a footer action area via `footer`, suitable for form submissions and similar scenarios.
 */
import React, { useState } from 'react';
import { Button, Drawer } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        With Footer Actions
      </Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Edit Info"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              OK
            </Button>
          </>
        }
      >
        <p>You can place forms or other content here.</p>
        <p>The footer action buttons are always fixed at the bottom of the drawer.</p>
      </Drawer>
    </>
  );
};
