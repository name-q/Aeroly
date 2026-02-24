/**
 * title: " "
 * description: Set `centered` to vertically center the dialog.
 */
import React, { useState } from 'react';
import { Button, Modal, ConfigProvider, enUS } from 'aeroly';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <Button onClick={() => setOpen(true)}>Centered Modal</Button>
      <Modal open={open} onOpenChange={setOpen} title="Centered" centered>
        <p>The dialog is vertically centered in the viewport.</p>
      </Modal>
    </ConfigProvider>
  );
};
