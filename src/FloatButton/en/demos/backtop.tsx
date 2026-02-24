/**
 * title: " "
 * description: Shows a back-to-top button after scrolling past a specified height. Smooth scrolls to top on click. Try scrolling in the container below.
 */
import React from 'react';
import { FloatButton, ConfigProvider, enUS } from 'aeroui';

export default () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
    <ConfigProvider locale={enUS}>
    <div
      ref={containerRef}
      style={{
        height: 300,
        overflow: 'auto',
        position: 'relative',
        borderRadius: 12,
        border: '1px solid rgba(0,0,0,0.06)',
        padding: 20,
      }}
    >
      <div style={{ height: 1200, fontSize: 14, color: 'var(--aero-text-color, #666)' }}>
        <p>Scroll down to see the back-to-top button</p>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} style={{ margin: '12px 0', opacity: 0.5 }}>
            This is line {i + 1}, keep scrolling...
          </p>
        ))}
      </div>
      <div style={{ position: 'sticky', bottom: 20, float: 'right' }}>
        <FloatButton.BackTop
          target={() => containerRef.current!}
          visibilityHeight={100}
          style={{ position: 'relative' }}
        />
      </div>
    </div>
    </ConfigProvider>
  );
};
