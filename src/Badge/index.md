---
title: Badge
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Badge

A circular badge number at the top-right corner of an icon or text, used for message notifications and status indicators.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Dot

<code src="./en/demos/dot.tsx"></code>

## Overflow Count

<code src="./en/demos/overflow.tsx"></code>

## Shimmer Animation

<code src="./en/demos/shimmer.tsx"></code>

## Custom Color & Content

<code src="./en/demos/custom.tsx"></code>

## Status Dot

<code src="./en/demos/status.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| count | Number to display, hidden when 0 | `number` | - |
| overflowCount | Max count to show | `number` | `99` |
| dot | Show dot only instead of number | `boolean` | `false` |
| showZero | Whether to show when count is 0 | `boolean` | `false` |
| shimmer | Shimmer sweep animation | `boolean` | `false` |
| color | Custom color | `string` | - |
| text | Custom display content | `ReactNode` | - |
| status | Status dot (standalone usage) | `'default' \| 'processing' \| 'success' \| 'warning' \| 'error'` | - |
| statusText | Text next to status dot | `ReactNode` | - |
| size | Size, affects badge number and dot size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| offset | Offset [right, top] | `[number, number]` | - |
| children | Wrapped child element | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
