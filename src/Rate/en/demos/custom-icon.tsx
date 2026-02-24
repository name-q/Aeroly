/**
 * title: " "
 * description: Replace the default star icon via `icon`, accepts any ReactNode.
 */
import React from 'react';
import { Heart } from 'lucide-react';
import { Rate } from 'aeroui';

export default () => (
  <Rate defaultValue={3} icon={<Heart size={22} fill="currentColor" />} />
);
