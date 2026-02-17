---
title: Tag
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Tag

Small labels for marking and categorizing. Supports multiple types, sizes, closable, and clickable.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Closable

<code src="./en/demos/closable.tsx" id="closable-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Custom Color / Round / Borderless

<code src="./en/demos/custom.tsx" id="custom-en"></code>

## Clickable Tags

<code src="./en/demos/clickable.tsx" id="clickable-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| children | Tag content | `ReactNode` | - |
| type | Type | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'small'` |
| closable | Whether closable | `boolean` | `false` |
| onClose | Callback when closed | `() => void` | - |
| visible | Whether visible (controlled) | `boolean` | - |
| color | Custom color | `string` | - |
| round | Round (pill) shape | `boolean` | `false` |
| bordered | Whether bordered | `boolean` | `true` |
| onClick | Callback when clicked | `(e: MouseEvent) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
