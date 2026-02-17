---
title: Popover
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Popover

Click or hover on an element to display a floating card. Supports 4 directions, auto-flip, and adaptive content.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Click Trigger

<code src="./en/demos/click.tsx"></code>

## Placement

<code src="./en/demos/placement.tsx"></code>

## Custom Content

<code src="./en/demos/custom.tsx"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| content | Popover content | `ReactNode` | - |
| title | Title | `ReactNode` | - |
| trigger | Trigger method | `'hover' \| 'click'` | `'hover'` |
| placement | Placement direction | `PopoverPlacement` | `'top'` |
| open | Whether visible (controlled) | `boolean` | - |
| defaultOpen | Whether visible by default (uncontrolled) | `boolean` | `false` |
| onOpenChange | Callback when visibility changes | `(open: boolean) => void` | - |
| offset | Gap between popover and trigger element | `number` | `8` |
| children | Trigger element | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### PopoverPlacement

```ts
type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';
```
