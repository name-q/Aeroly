/**
 * title: " "
 * description: 使用 `Statistic.Countdown` 展示倒计时，支持 `onFinish` 回调。
 */
import React from 'react';
import { Statistic, Flex } from 'aeroly';

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30;

export default () => (
  <Flex gap="lg">
    <Statistic.Countdown title="活动倒计时" value={deadline} />
    <Statistic.Countdown title="含天数" value={deadline} format="D 天 HH:mm:ss" />
  </Flex>
);
