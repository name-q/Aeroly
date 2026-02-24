/**
 * title: " "
 * description: 基础悬浮按钮，支持图标、描述文字、Tooltip、徽标、形状和类型。
 */
import React from 'react';
import { FloatButton, Flex } from 'aeroly';
import { MessageCircle, Settings, Heart, Bell } from 'lucide-react';

export default () => (
  <Flex gap={24} wrap="wrap" align="flex-end" style={{ height: 200, position: 'relative' }}>
    <FloatButton icon={MessageCircle} tooltip="客服" style={{ position: 'relative' }} />
    <FloatButton icon={Settings} description="设置" tooltip="打开设置" style={{ position: 'relative' }} />
    <FloatButton icon={Heart} type="primary" tooltip="收藏" style={{ position: 'relative' }} />
    <FloatButton icon={Bell} shape="square" badge={5} style={{ position: 'relative' }} />
    <FloatButton icon={Heart} shape="square" dot style={{ position: 'relative' }} />
  </Flex>
);
