import React from 'react';
import { Empty, Button, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <Empty
      preset="networkError"
      extra={<Button onClick={() => window.location.reload()}>Reload</Button>}
    />
  </ConfigProvider>
);
