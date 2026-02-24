/**
 * title: " "
 * description: Three sizes: `small`, `medium` (default), `large`.
 */
import React from 'react';
import { Pagination, ConfigProvider, enUS } from 'aeroui';

export default () => (
  <ConfigProvider locale={enUS}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Pagination total={200} size="small" />
      <Pagination total={200} />
      <Pagination total={200} size="large" />
    </div>
  </ConfigProvider>
);
