/**
 * title: " "
 * description: 通过 `icon` 替换默认星星图标，传入任意 ReactNode。
 */
import React from 'react';
import { Heart } from 'lucide-react';
import { Rate } from 'aeroly';

export default () => (
  <Rate defaultValue={3} icon={<Heart size={22} fill="currentColor" />} />
);
