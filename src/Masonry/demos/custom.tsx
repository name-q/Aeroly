/**
 * title: " "
 * description: 不仅限于图片，任意不等高内容都可以使用瀑布流排列。
 */
import React from 'react';
import { Masonry } from 'aero-ui';

const cards = [
  { title: '设计系统', desc: '统一的设计语言和组件库，让产品体验一致。' },
  { title: '毛玻璃效果', desc: '使用 backdrop-filter 实现现代化的磨砂玻璃视觉效果，层次分明，质感通透。' },
  { title: '响应式布局', desc: '自适应不同屏幕尺寸。' },
  { title: '暗色模式', desc: '内置亮色和暗色两套主题，自动跟随系统偏好切换，也支持手动控制。' },
  { title: '无障碍', desc: '遵循 WAI-ARIA 规范，支持键盘导航和屏幕阅读器。' },
  { title: '动画', desc: '流畅自然的过渡动画，基于 CSS transition 和 cubic-bezier 缓动函数，不依赖 JS 动画库。' },
  { title: 'TypeScript', desc: '完整的类型定义。' },
  { title: '按需加载', desc: '支持 tree-shaking，只打包用到的组件，减小产物体积。' },
];

const cardStyle: React.CSSProperties = {
  padding: '16px 20px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.6)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.3)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

export default () => (
  <Masonry columns={3} gutter="md">
    {cards.map((card, i) => (
      <div key={i} style={cardStyle}>
        <h4 style={{ margin: '0 0 8px' }}>{card.title}</h4>
        <p style={{ margin: 0, fontSize: 14, color: '#666', lineHeight: 1.6 }}>
          {card.desc}
        </p>
      </div>
    ))}
  </Masonry>
);
