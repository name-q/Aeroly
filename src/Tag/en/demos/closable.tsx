/**
 * title: " "
 * description: Add `closable` to make tags closable.
 */
import React, { useState } from 'react';
import { Tag } from 'aeroui';

const initialTags = ['Movies', 'Music', 'Games', 'Reading', 'Travel'];

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
        <span style={{ color: '#999', fontSize: 13 }}>All removed</span>
      )}
    </div>
  );
};
