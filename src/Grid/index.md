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

24-column grid system. Combine `Row` and `Col` for responsive layouts. `gutter` supports semantic tokens, and `Col` supports both `span` and `flex` modes.

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

### Row

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| gutter | Grid spacing, supports semantic tokens, array `[horizontal, vertical]` | `number \| 'xs' \| 'sm' \| 'md' \| 'lg' \| [h, v]` | - |
| justify | Main axis alignment | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - |
| align | Cross axis alignment | `'start' \| 'center' \| 'end' \| 'stretch'` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Col

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| span | Number of grid columns to occupy (out of 24), 0 to hide | `number` | - |
| offset | Number of columns to offset from the left | `number` | - |
| flex | Flex control: number for flex ratio, `"100px"` for fixed width, also supports full syntax; overrides span when set | `number \| string` | - |
| xs | >=0px responsive | `number \| { span, offset }` | - |
| sm | >=576px responsive | `number \| { span, offset }` | - |
| md | >=768px responsive | `number \| { span, offset }` | - |
| lg | >=992px responsive | `number \| { span, offset }` | - |
| xl | >=1200px responsive | `number \| { span, offset }` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### gutter Semantic Tokens

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
