import React from 'react';
import { Empty, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <Empty />
  </ConfigProvider>
);
