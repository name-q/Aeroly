/**
 * title: " "
 * description: Multiple Affix instances on the same page work independently without interfering with each other. Left and right scroll containers each have their own pinned elements.
 */
import React from 'react';
import { Affix, Button, Flex } from 'aeroly';

const containerStyle: React.CSSProperties = {
  height: 300,
  overflow: 'auto',
  border: '1px solid rgba(0,0,0,0.08)',
  borderRadius: 8,
  padding: 16,
  flex: 1,
};

export default () => {
  return (
    <Flex gap={16}>
      <div style={containerStyle}>
        <p style={{ color: '#999', fontSize: 13 }}>Container A</p>
        <div style={{ height: 60 }} />
        <Affix offsetTop={0}>
          <div style={{ padding: '8px 12px' }}>
            <Button type="primary" size="small">Container A Pinned Bar</Button>
          </div>
        </Affix>
        <div style={{ height: 800 }}>
          <p style={{ paddingTop: 40, color: '#bbb' }}>Scroll content of Container A...</p>
        </div>
      </div>

      <div style={containerStyle}>
        <p style={{ color: '#999', fontSize: 13 }}>Container B</p>
        <div style={{ height: 60 }} />
        <Affix offsetTop={0}>
          <div style={{ padding: '8px 12px' }}>
            <Button size="small">Container B Pinned Bar</Button>
          </div>
        </Affix>
        <Affix offsetTop={40}>
          <div style={{ padding: '8px 12px' }}>
            <Button size="small" variant="outline">Container B Second Pin (top: 40px)</Button>
          </div>
        </Affix>
        <div style={{ height: 800 }}>
          <p style={{ paddingTop: 40, color: '#bbb' }}>Scroll content of Container B...</p>
        </div>
      </div>
    </Flex>
  );
};
