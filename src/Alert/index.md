---
title: Alert
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Alert

Static alert messages within a page that do not interrupt user workflow. The title text features a shimmer sweep effect by default to draw user attention.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## With Description

<code src="./en/demos/description.tsx" id="description-en"></code>

## Closable

<code src="./en/demos/closable.tsx" id="closable-en"></code>

## Custom

<code src="./en/demos/custom.tsx" id="custom-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| children | Alert content (title) | `ReactNode` | - |
| type | Alert type | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| description | Supplementary description text | `ReactNode` | - |
| closable | Whether the alert can be closed | `boolean` | `false` |
| onClose | Callback when closed | `() => void` | - |
| icon | Custom icon | `LucideIcon` | - |
| showIcon | Whether to show the icon | `boolean` | `true` |
| size | Size, affects padding, font size, and icon size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| shimmer | Whether to enable the text shimmer sweep effect | `boolean` | `true` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
