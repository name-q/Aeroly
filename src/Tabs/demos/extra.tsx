import React from 'react';
import { Tabs, Button } from 'aeroui';

export default () => {
  return (
    <Tabs
      items={[
        { key: '1', label: '文章', children: <p>文章列表。</p> },
        { key: '2', label: '评论', children: <p>评论列表。</p> },
        { key: '3', label: '收藏', children: <p>收藏列表。</p> },
      ]}
      extra={<Button size="small">发布</Button>}
    />
  );
};
