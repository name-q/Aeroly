---
title: Tooltip
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Tooltip

A simple text popup tip triggered on hover. Built on Popover, supports 12 directions, auto-flip, and adaptive content height.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Placement

<code src="./en/demos/placement.tsx"></code>

## Rich Content

<code src="./en/demos/richContent.tsx"></code>

## Empty Title Not Shown

<code src="./en/demos/empty.tsx"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| title | Tooltip content | `ReactNode` | - |
| placement | Placement direction | `TooltipPlacement` | `'top'` |
| open | Whether visible (controlled) | `boolean` | - |
| defaultOpen | Whether visible by default | `boolean` | `false` |
| onOpenChange | Callback when visibility changes | `(open: boolean) => void` | - |
| offset | Gap between tooltip and trigger element | `number` | `8` |
| children | Trigger element | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### TooltipPlacement

```ts
type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
```
