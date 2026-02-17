---
title: Skeleton
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Skeleton

Display gray placeholder blocks outlining the content structure before data is loaded, reducing user waiting anxiety.

Provides three atomic shapes: `Block`, `Circle`, and `Text`, which can be freely combined into any skeleton layout.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Loading Toggle

<code src="./en/demos/loading.tsx"></code>

## Shimmer Animation

<code src="./en/demos/active.tsx"></code>

## List Loading

<code src="./en/demos/list.tsx"></code>

## API

### Skeleton

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| active | Enable shimmer animation | `boolean` | `true` |
| children | Skeleton content (Block / Circle / Text combinations) | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Skeleton.Block

Rectangular placeholder block, suitable for images, cards, buttons, and any rectangular area.

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| width | Width | `number \| string` | `'100%'` |
| height | Height | `number \| string` | `16` |
| borderRadius | Border radius | `number \| string` | `8` |
| active | Enable shimmer animation, inherits from parent by default | `boolean` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Skeleton.Circle

Circular placeholder block, suitable for avatars, icons, etc.

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| size | Diameter | `number` | `40` |
| active | Enable shimmer animation, inherits from parent by default | `boolean` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Skeleton.Text

Multi-line text placeholder, last line defaults to 60% width.

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| rows | Number of rows | `number` | `3` |
| widths | Width per row, can pass array to specify individually | `(number \| string)[]` | - |
| lineHeight | Line height | `number` | `16` |
| gap | Row gap | `number` | `12` |
| active | Enable shimmer animation, inherits from parent by default | `boolean` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
