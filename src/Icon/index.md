---
title: Icon
order: 0
group:
  title: General
  order: 1
nav:
  title: Components
  path: /components
toc: content
---

# Icon

Icon wrapper component based on Lucide React, providing unified size, rotation, and animation capabilities.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Rotation Angle

Set the icon rotation angle via `rotate`.

```tsx
import { Icon } from 'aero-ui';
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

## Spin Animation

Enable continuous spin animation via `spin`, commonly used for loading states.

```tsx
import { Icon } from 'aero-ui';
import { Loader, RefreshCw, Settings } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon icon={Loader} spin />
    <Icon icon={RefreshCw} spin />
    <Icon icon={Settings} spin size={24} />
  </div>
);
```

## Custom Color and Size

```tsx
import { Icon } from 'aero-ui';
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

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| icon | Lucide icon component | `LucideIcon` | - |
| size | Icon size | `number \| string` | `16` |
| color | Icon color | `string` | `currentColor` |
| strokeWidth | Stroke width | `number` | `2` |
| rotate | Rotation angle (degrees) | `number` | - |
| spin | Whether to enable spin animation | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

## Icon Gallery

<code src="./en/demos/gallery.tsx" id="gallery-en" inline></code>
