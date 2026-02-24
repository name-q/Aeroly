/**
 * title: " "
 * description: Customize the loading indicator via the `indicator` property.
 */
import React from 'react';
import { Spin, Flex, Icon } from 'aeroly';
import { Loader } from 'lucide-react';

const CustomIcon = (
  <Icon icon={Loader} size={24} spin style={{ color: 'var(--aero-primary-color, #50b8e7)' }} />
);

export default () => (
  <Flex gap={48} align="center">
    <Spin indicator={CustomIcon} />
    <Spin indicator={CustomIcon} tip="Custom indicator" />
  </Flex>
);
