/**
 * title: " "
 * description: 页面滚动超过指定高度后显示回到顶部按钮，点击平滑滚动到顶部。在下方容器内滚动试试。
 */
import React from 'react';
import { FloatButton } from 'aeroly';

export default () => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  return (
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
        <p>向下滚动查看回到顶部按钮</p>
        {Array.from({ length: 30 }, (_, i) => (
          <p key={i} style={{ margin: '12px 0', opacity: 0.5 }}>
            这是第 {i + 1} 行内容，继续向下滚动...
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
  );
};
