import React from 'react';
import { Empty, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <Empty />
  </ConfigProvider>
);
