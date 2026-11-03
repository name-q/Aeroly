---
title: Grid
group:
  title: Layout
  order: 2
nav:
  title: Components
  path: /components
toc: content
---

# Grid

24-column grid system. Combine `Row` and `Col` for responsive layouts.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Gutter

<code src="./en/demos/gutter.tsx" id="gutter-en"></code>

## Offset

<code src="./en/demos/offset.tsx" id="offset-en"></code>

## Alignment

<code src="./en/demos/align.tsx" id="align-en"></code>

## Flex Layout

<code src="./en/demos/flex.tsx" id="flex-en"></code>

## Responsive

<code src="./en/demos/responsive.tsx" id="responsive-en"></code>

## API

The API matches antd Grid.

### Row

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| gutter | Spacing between grids; a number, CSS string or responsive object `{ xs: 8, md: 16 }`. Use `[horizontal, vertical]` for both directions | `number \| string \| object \| array` | `0` |
| align | Vertical alignment, supports responsive objects | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` |
| justify | Horizontal arrangement, supports responsive objects | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` |
| wrap | Whether to wrap automatically | `boolean` | `true` |

### Col

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| span | Number of cells to occupy, 0 means `display: none` | `number` | - |
| offset | Number of cells to the left of the grid | `number` | `0` |
| order | Raster order | `number` | `0` |
| push | Number of cells the grid moves to the right | `number` | `0` |
| pull | Number of cells the grid moves to the left | `number` | `0` |
| flex | Flex layout. A number maps to `flex: n n auto`, a length like `'100px'` maps to `flex: 0 0 100px`, other strings pass through | `string \| number` | - |
| xs | `screen < 576px`, a span number or an object with other properties | `number \| ColSize` | - |
| sm | `screen ≥ 576px` | `number \| ColSize` | - |
| md | `screen ≥ 768px` | `number \| ColSize` | - |
| lg | `screen ≥ 992px` | `number \| ColSize` | - |
| xl | `screen ≥ 1200px` | `number \| ColSize` | - |
| xxl | `screen ≥ 1600px` | `number \| ColSize` | - |
| xxxl | `screen ≥ 1920px` | `number \| ColSize` | - |

`ColSize` is `{ span, offset, order, push, pull, flex }`. Other HTML attributes are passed to the root element.
