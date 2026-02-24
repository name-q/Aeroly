/**
 * title: " "
 * description: Disabled state.
 */
import React from 'react';
import { Pagination, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <Pagination total={200} defaultCurrent={5} disabled />
  </ConfigProvider>
);
