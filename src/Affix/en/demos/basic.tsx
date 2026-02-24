/**
 * title: " "
 * description: Scroll the page and the button stays fixed at 0px from the top.
 */
import React, { useState } from 'react';
import { Affix, Button, Flex } from 'aeroly';

export default () => {
  const [affixed, setAffixed] = useState(false);

  return (
    <div style={{ height: 300, overflow: 'auto', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, padding: 16 }}>
      <p style={{ color: '#999' }}>Scroll down to see the effect ↓</p>
      <div style={{ height: 80 }} />
      <Affix offsetTop={0} onChange={setAffixed}>
        <Flex gap={12} align="center" style={{ padding: '8px 12px' }}>
          <Button type="primary" size="small">Save</Button>
          <span style={{ fontSize: 13, color: '#888' }}>
            {affixed ? 'Affixed' : 'Not affixed'}
          </span>
        </Flex>
      </Affix>
      <div style={{ height: 800 }}>
        <p style={{ paddingTop: 40, color: '#bbb' }}>Long content area...</p>
      </div>
    </div>
  );
};
