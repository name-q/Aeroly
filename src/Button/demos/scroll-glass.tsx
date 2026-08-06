/**
 * title: " "
 * description: 滚动内容经过默认按钮时，可以观察到背景在玻璃层中的模糊和折射变化。
 */
import React from 'react';
import { Button } from 'aeroly';

const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb';
const scrollItems = [
  { type: 'image', src: `${imageUrl}?auto=format&fit=crop&w=900&h=180&q=80`, alt: '山谷湖泊' },
  { type: 'text', text: '向下滚动内容，图片和文字会穿过固定在中央的玻璃按钮。' },
  { type: 'space' },
  { type: 'image', src: `${imageUrl}?auto=format&fit=crop&w=900&h=220&crop=entropy&q=80`, alt: '湖畔山景' },
  { type: 'text', text: '观察图片细节、文字和按钮边缘光在玻璃层下方交替经过。' },
] as const;

export default () => (
  <div
    style={{
      position: 'relative',
      height: 280,
      overflow: 'hidden',
      borderRadius: 16,
      background: '#102033',
      isolation: 'isolate',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(255, 255, 255, 0.08)',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflowY: 'auto',
        padding: '24px 24px 180px',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        color: '#fff',
        fontSize: 18,
        fontWeight: 600,
        lineHeight: 1.55,
      }}
    >
      {[...scrollItems, ...scrollItems].map((item, index) => {
        if (item.type === 'image') {
          return <img key={`${item.type}-${index}`} src={item.src} alt={item.alt} style={{ display: 'block', width: '100%', height: 150, flexShrink: 0, objectFit: 'cover', borderRadius: 14 }} />;
        }
        if (item.type === 'space') {
          return <div key={`${item.type}-${index}`} aria-hidden="true" style={{ height: 72, flexShrink: 0 }} />;
        }
        return <p key={`${item.type}-${index}`} style={{ margin: 0 }}>{item.text}</p>;
      })}
    </div>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto' }}>
        <Button pill style={{ '--aero-lg-blur': '12px' } as React.CSSProperties}>
          查看详情
        </Button>
      </div>
    </div>
  </div>
);
