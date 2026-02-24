---
title: Icon 图标
order: 0
group:
  title: 通用
  order: 1
nav:
  title: 组件
  path: /components
toc: content
---

# Icon 图标

基于 Lucide React 的图标包装组件，提供统一的尺寸、旋转和动画能力。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 旋转角度

通过 `rotate` 设置图标旋转角度。

```tsx
import { Icon } from 'aeroui';
import { ArrowUp, Navigation } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon icon={ArrowUp} />
    <Icon icon={ArrowUp} rotate={90} />
    <Icon icon={ArrowUp} rotate={180} />
    <Icon icon={Navigation} rotate={45} />
  </div>
);
```

## 旋转动画

通过 `spin` 开启持续旋转动画，常用于加载状态。

```tsx
import { Icon } from 'aeroui';
import { Loader, RefreshCw, Settings } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon icon={Loader} spin />
    <Icon icon={RefreshCw} spin />
    <Icon icon={Settings} spin size={24} />
  </div>
);
```

## 自定义颜色和尺寸

```tsx
import { Icon } from 'aeroui';
import { Heart, Star, AlertCircle } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon icon={Heart} color="#f5222d" />
    <Icon icon={Star} color="#faad14" size={24} />
    <Icon icon={AlertCircle} color="#50b8e7" size={32} strokeWidth={1.5} />
  </div>
);
```

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| icon | Lucide 图标组件 | `LucideIcon` | - |
| size | 图标尺寸 | `number \| string` | `16` |
| color | 图标颜色 | `string` | `currentColor` |
| strokeWidth | 线条粗细 | `number` | `2` |
| rotate | 旋转角度（度） | `number` | - |
| spin | 是否旋转动画 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

## 图标列表

<code src="./demos/gallery.tsx" inline></code>
