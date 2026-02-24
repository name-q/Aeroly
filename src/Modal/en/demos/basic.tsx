/**
 * title: " "
 * description: Click the button to open a dialog with built-in OK/Cancel buttons.
 */
import React, { useState } from 'react';
import { Button, Modal, ConfigProvider, enUS } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} onOpenChange={setOpen} title="Basic Modal">
        <p>This is the modal content area.</p>
        <p>Click the mask, press Esc, or click Cancel to close.</p>
      </Modal>
    </ConfigProvider>
  );
};
