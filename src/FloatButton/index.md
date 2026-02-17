---
nav:
  title: Components
  order: 1
group:
  title: General
  order: 0
toc: content
---

# FloatButton

A shortcut action entry fixed at the edge of the page. Supports single button, expandable/collapsible button group, and back-to-top. Built-in Tooltip and Badge.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Button Group

<code src="./en/demos/group.tsx"></code>

## Back to Top

<code src="./en/demos/backtop.tsx"></code>

## API

### FloatButton

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| icon | `LucideIcon` | - | Icon |
| description | `ReactNode` | - | Description text (below icon) |
| tooltip | `ReactNode` | - | Tooltip content |
| tooltipPlacement | `'top' \| 'bottom' \| 'left' \| 'right'` | `'left'` | Tooltip direction |
| badge | `number` | - | Badge count |
| dot | `boolean` | - | Badge dot |
| shape | `'circle' \| 'square'` | `'circle'` | Button shape |
| type | `'default' \| 'primary'` | `'default'` | Button type |
| onClick | `(e: MouseEvent) => void` | - | Click callback |
| href | `string` | - | Link URL |
| target | `string` | - | Link target |
| className | `string` | - | Custom class name |
| style | `React.CSSProperties` | - | Custom style |

### FloatButton.Group

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| icon | `LucideIcon` | `Plus` | Trigger button icon |
| closeIcon | `LucideIcon` | - | Close icon when expanded, rotates icon 45 degrees if not provided |
| trigger | `'hover' \| 'click'` | `'click'` | Trigger mode |
| open | `boolean` | - | Whether expanded (controlled) |
| onOpenChange | `(open: boolean) => void` | - | Expand change callback |
| shape | `'circle' \| 'square'` | `'circle'` | Button shape |
| tooltip | `ReactNode` | - | Trigger button Tooltip |
| type | `'default' \| 'primary'` | `'default'` | Trigger button type |
| className | `string` | - | Custom class name |
| style | `React.CSSProperties` | - | Custom style |

### FloatButton.BackTop

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| visibilityHeight | `number` | `400` | Show when scroll height reaches this value |
| target | `() => HTMLElement \| Window` | `window` | Scroll target |
| shape | `'circle' \| 'square'` | `'circle'` | Button shape |
| icon | `LucideIcon` | `ArrowUp` | Icon |
| tooltip | `ReactNode` | `'Back to Top'` | Tooltip content |
| onClick | `() => void` | - | Click callback |
| className | `string` | - | Custom class name |
| style | `React.CSSProperties` | - | Custom style |
