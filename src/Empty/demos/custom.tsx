import React from 'react';
import { Empty } from 'aeroly';
import { Ghost } from 'lucide-react';

export default () => (
  <Empty
    icon={Ghost}
    iconSize={56}
    title="页面走丢了"
    description="你访问的页面不存在，可能已被移除或链接有误"
  />
);
