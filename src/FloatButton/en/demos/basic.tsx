/**
 * title: " "
 * description: Basic float button with support for icon, description text, Tooltip, badge, shape, and type.
 */
import React from 'react';
import { FloatButton, Flex } from 'aero-ui';
import { MessageCircle, Settings, Heart, Bell } from 'lucide-react';

export default () => (
  <Flex gap={24} wrap="wrap" align="flex-end" style={{ height: 200, position: 'relative' }}>
    <FloatButton icon={MessageCircle} tooltip="Support" style={{ position: 'relative' }} />
    <FloatButton icon={Settings} description="Settings" tooltip="Open Settings" style={{ position: 'relative' }} />
    <FloatButton icon={Heart} type="primary" tooltip="Favorite" style={{ position: 'relative' }} />
    <FloatButton icon={Bell} shape="square" badge={5} style={{ position: 'relative' }} />
    <FloatButton icon={Heart} shape="square" dot style={{ position: 'relative' }} />
  </Flex>
);
