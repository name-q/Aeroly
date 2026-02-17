---
title: Notification
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Notification

Display global notification messages that slide in from the screen edge. Supports four corner positions, adaptive content height, and manual close.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Different Types

<code src="./en/demos/types.tsx"></code>

## Custom Duration

<code src="./en/demos/duration.tsx"></code>

## Placement

<code src="./en/demos/placement.tsx"></code>

## With Action Buttons

<code src="./en/demos/footer.tsx"></code>

## API

Imperative API. Use methods on the `notification` object directly:

```ts
import { notification } from 'aero-ui';

notification.info('Title', 'Description');
notification.success('Title', 'Description');
notification.warning('Title', 'Description');
notification.error('Title', 'Description');
```

### Shortcut Methods

| Method | Description | Type |
|--------|-------------|------|
| notification.info | Info notification | `(title, description?, config?) => void` |
| notification.success | Success notification | `(title, description?, config?) => void` |
| notification.warning | Warning notification | `(title, description?, config?) => void` |
| notification.error | Error notification | `(title, description?, config?) => void` |
| notification.open | Custom config | `(config: NotificationConfig) => void` |

### NotificationConfig

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| title | Title | `ReactNode` | - |
| description | Description content | `ReactNode` | - |
| type | Type | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| duration | Auto-close delay in ms, 0 to disable | `number` | `4500` |
| icon | Custom icon | `LucideIcon` | - |
| placement | Placement position | `'topRight' \| 'topLeft' \| 'bottomRight' \| 'bottomLeft'` | `'topRight'` |
| footer | Footer action area | `ReactNode` | - |
| onClose | Callback when closed | `() => void` | - |
