/**
 * title: " "
 * description: Use `Statistic.Countdown` to display a countdown timer with `onFinish` callback support.
 */
import React from 'react';
import { Statistic, Flex } from 'aeroui';

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30;

export default () => (
  <Flex gap="lg">
    <Statistic.Countdown title="Event Countdown" value={deadline} />
    <Statistic.Countdown title="With Days" value={deadline} format="D days HH:mm:ss" />
  </Flex>
);
