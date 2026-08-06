/**
 * title: " "
 * description: 滚动内容经过默认按钮时，可以观察到背景在玻璃层中的模糊和折射变化。
 */
import React from 'react';
import { Button } from 'aeroly';

const paragraphs = [
  '向下滚动内容，文字会穿过固定在中央的玻璃按钮。',
  '按钮保持自己的尺寸，背景图片和内容始终在玻璃层下方流动。',
  '透明表面、边缘光和背景模糊共同形成轻量的液态玻璃效果。',
  '在不同背景和主题下，按钮文字会自动使用清晰的对比色。',
  '继续滚动可以观察图片细节、文字和按钮边缘光的变化。',
];

export default () => (
  <div
    style={{
      position: 'relative',
      height: 280,
      overflow: 'hidden',
      borderRadius: 16,
      backgroundImage: 'url(https://images.unsplash.com/photo-1506744038136-46273834b3fb)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
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
      {[...paragraphs, ...paragraphs].map((text, index) => (
        <p key={`${text}-${index}`} style={{ margin: 0 }}>
          {text}
        </p>
      ))}
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
        <Button pill style={{ minWidth: 132 }}>
          查看详情
        </Button>
      </div>
    </div>
  </div>
);
