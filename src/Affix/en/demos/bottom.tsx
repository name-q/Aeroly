/**
 * title: " "
 * description: Set `offsetBottom` to fix an element at the bottom of the container, suitable for form submit bars, summary rows, etc.
 */
import React from 'react';
import { Affix, Button, Flex } from 'aeroly';

export default () => {
  return (
    <div style={{ height: 300, overflow: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 16 }}>
      <div style={{ height: 800 }}>
        <p style={{ color: '#999' }}>Scroll down, the bottom action bar stays pinned ↓</p>
        <p style={{ paddingTop: 40, color: '#bbb' }}>Long content area...</p>
      </div>
      <Affix offsetBottom={0}>
        <Flex gap={12} style={{ padding: '8px 12px' }}>
          <Button type="primary" size="small">Submit</Button>
          <Button size="small">Cancel</Button>
        </Flex>
      </Affix>
      <div style={{ height: 200 }}>
        <p style={{ paddingTop: 20, color: '#bbb' }}>More content below...</p>
      </div>
    </div>
  );
};
