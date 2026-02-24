/**
 * title: " "
 * description: 通过 `indicator` 属性自定义加载指示器。
 */
import React from 'react';
import { Spin, Flex, Icon } from 'aeroui';
import { Loader } from 'lucide-react';

const CustomIcon = (
  <Icon icon={Loader} size={24} spin style={{ color: 'var(--aero-primary-color, #50b8e7)' }} />
);

export default () => (
  <Flex gap={48} align="center">
    <Spin indicator={CustomIcon} />
    <Spin indicator={CustomIcon} tip="自定义指示器" />
  </Flex>
);
