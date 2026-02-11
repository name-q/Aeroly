/**
 * title: " "
 * description: 添加 `closable` 属性可关闭标签。
 */
import React, { useState } from 'react';
import { Tag } from 'aero-ui';

const initialTags = ['电影', '音乐', '游戏', '阅读', '旅行'];

export default () => {
  const [tags, setTags] = useState(initialTags);

  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          closable
          type="info"
          onClose={() => setTags((t) => t.filter((v) => v !== tag))}
        >
          {tag}
        </Tag>
      ))}
      {tags.length === 0 && (
        <span style={{ color: '#999', fontSize: 13 }}>全部已删除</span>
      )}
    </div>
  );
};
