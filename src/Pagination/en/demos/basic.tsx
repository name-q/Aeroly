/**
 * title: " "
 * description: Basic pagination, just provide `total`.
 */
import React from 'react';
import { Pagination, ConfigProvider, enUS } from 'aeroly';

export default () => (
  <ConfigProvider locale={enUS}>
    <Pagination total={50} />
  </ConfigProvider>
);
