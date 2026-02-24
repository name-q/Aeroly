import React from 'react';
import { Empty, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <Empty />
  </ConfigProvider>
);
