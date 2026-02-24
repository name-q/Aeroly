/**
 * title: " "
 * description: 数据较多时自动出现省略号，hover 省略号可快速前进/后退 5 页。
 */
import React from 'react';
import { Pagination } from 'aeroly';

export default () => <Pagination total={500} defaultCurrent={10} />;
