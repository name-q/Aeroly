/**
 * title: " "
 * description: Customize the footer action area via `footer`. Pass `null` to completely hide the footer.
 */
import React, { useState } from 'react';
import { Button, Modal, ConfigProvider, enUS } from 'aeroly';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
    <div style={{ display: 'flex', gap: 12 }}>
      <Button onClick={() => setOpen1(true)}>Custom Footer</Button>
      <Modal
        open={open1}
        onOpenChange={setOpen1}
        title="Custom Footer"
        footer={
          <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'space-between' }}>
            <Button type="text" onClick={() => setOpen1(false)}>Skip</Button>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button onClick={() => setOpen1(false)}>Previous</Button>
              <Button type="primary" onClick={() => setOpen1(false)}>Next</Button>
            </div>
          </div>
        }
      >
        <p>The footer action area is fully under your control.</p>
      </Modal>

      <Button onClick={() => setOpen2(true)}>No Footer</Button>
      <Modal open={open2} onOpenChange={setOpen2} title="Content Only" footer={null}>
        <p>This dialog has no footer action area, suitable for display-only scenarios.</p>
      </Modal>
    </div>
    </ConfigProvider>
  );
};
