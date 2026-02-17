/**
 * title: " "
 * description: Basic usage — wrap child components to take effect. Without any configuration, it behaves the same as default (Chinese).
 */
import React from 'react';
import { ConfigProvider, Modal, Button, Flex } from 'aero-ui';

export default () => {
  const [open, setOpen] = React.useState(false);

  return (
    <ConfigProvider>
      <Flex gap={12}>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Button onClick={() => Modal.confirm({ title: 'Confirm Action', content: 'Are you sure you want to continue?' })}>
          Imperative Confirm
        </Button>
      </Flex>
      <Modal open={open} onOpenChange={setOpen} title="Default Config">
        <p>When ConfigProvider has no locale prop, components use Chinese defaults.</p>
      </Modal>
    </ConfigProvider>
  );
};
