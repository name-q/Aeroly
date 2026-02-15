/**
 * title: " "
 * description: 使用 `FloatButton.Group` 将多个按钮组合，点击或 hover 展开。支持受控模式。
 */
import React from 'react';
import { FloatButton, Flex } from 'aero-ui';
import { MessageCircle, Share2, Heart, Star, Plus } from 'lucide-react';

export default () => (
  <Flex gap={60} align="flex-end" style={{ height: 320, position: 'relative' }}>
    <div style={{ position: 'relative' }}>
      <FloatButton.Group
        icon={Plus}
        trigger="click"
        tooltip="快捷操作"
        style={{ position: 'relative' }}
      >
        <FloatButton icon={MessageCircle} tooltip="消息" />
        <FloatButton icon={Share2} tooltip="分享" />
        <FloatButton icon={Heart} tooltip="收藏" />
        <FloatButton icon={Star} tooltip="评分" />
      </FloatButton.Group>
    </div>

    <div style={{ position: 'relative' }}>
      <FloatButton.Group
        icon={Plus}
        trigger="hover"
        type="primary"
        style={{ position: 'relative' }}
      >
        <FloatButton icon={MessageCircle} type="primary" />
        <FloatButton icon={Share2} type="primary" />
      </FloatButton.Group>
    </div>
  </Flex>
);
