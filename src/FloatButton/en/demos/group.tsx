/**
 * title: " "
 * description: Use `FloatButton.Group` to combine multiple buttons, expandable on click or hover. Supports controlled mode.
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
        tooltip="Quick Actions"
        style={{ position: 'relative' }}
      >
        <FloatButton icon={MessageCircle} tooltip="Messages" />
        <FloatButton icon={Share2} tooltip="Share" />
        <FloatButton icon={Heart} tooltip="Favorite" />
        <FloatButton icon={Star} tooltip="Rate" />
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
