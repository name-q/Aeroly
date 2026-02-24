/**
 * title: " "
 * description: Imperative API for simple confirm/prompt scenarios. Supports `confirm`, `info`, `success`, `warning`, and `error` types.
 */
import React from 'react';
import { Button, Modal, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Button
      onClick={() =>
        Modal.confirm({
          title: 'Confirm Delete',
          content: 'This cannot be undone. Are you sure you want to continue?',
          onOk: () => console.log('Confirmed'),
        })
      }
    >
      Confirm
    </Button>
    <Button onClick={() => Modal.info({ title: 'Info', content: 'This is an informational message.' })}>
      Info
    </Button>
    <Button onClick={() => Modal.success({ title: 'Success', content: 'Operation completed.' })}>
      Success
    </Button>
    <Button onClick={() => Modal.warning({ title: 'Warning', content: 'Please be aware of the risks.' })}>
      Warning
    </Button>
    <Button onClick={() => Modal.error({ title: 'Error', content: 'Operation failed. Please try again.' })}>
      Error
    </Button>
  </div>
  </ConfigProvider>
);
