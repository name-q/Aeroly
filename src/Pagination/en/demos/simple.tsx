/**
 * title: " "
 * description: Simple mode, suitable for limited space. Page number is editable; press Enter or blur to jump.
 */
import React from 'react';
import { Pagination, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <Pagination total={200} simple />
  </ConfigProvider>
);
