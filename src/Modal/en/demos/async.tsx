/**
 * title: " "
 * description: When `onOk` returns a Promise, the OK button automatically enters loading state and closes upon completion.
 */
import React, { useState } from 'react';
import { Button, Modal, ConfigProvider, enUS } from 'aero-ui';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Async Submit
      </Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Submit Data"
        onOk={() => delay(2000)}
      >
        <p>Clicking OK will simulate a 2-second async operation.</p>
      </Modal>
    </ConfigProvider>
  );
};
