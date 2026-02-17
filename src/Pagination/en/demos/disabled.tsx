/**
 * title: " "
 * description: Disabled state.
 */
import React from 'react';
import { Pagination, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <Pagination total={200} defaultCurrent={5} disabled />
  </ConfigProvider>
);
