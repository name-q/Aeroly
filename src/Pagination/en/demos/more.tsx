/**
 * title: " "
 * description: Ellipsis appears automatically with many pages. Hover over the ellipsis to jump forward/backward 5 pages.
 */
import React from 'react';
import { Pagination, ConfigProvider, enUS } from 'aero-ui';

export default () => (
  <ConfigProvider locale={enUS}>
    <Pagination total={500} defaultCurrent={10} />
  </ConfigProvider>
);
