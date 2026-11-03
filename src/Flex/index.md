---
title: Flex
group:
  title: Layout
  order: 2
nav:
  title: Components
  path: /components
toc: content
---

# Flex

Flex layout container for setting alignment and spacing between children.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Vertical

<code src="./en/demos/vertical.tsx" id="vertical-en"></code>

## Alignment

<code src="./en/demos/justify.tsx" id="justify-en"></code>

## Wrapping

<code src="./en/demos/wrap.tsx" id="wrap-en"></code>

## Flex Ratio

<code src="./en/demos/flex.tsx" id="flex-en"></code>

## API

Flex lays out horizontally with top alignment by default; with `vertical`, children stretch horizontally. The API matches antd Flex.

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| vertical | Whether the main axis is vertical, i.e. `flex-direction: column` | `boolean` | `false` |
| orientation | Main axis orientation, takes precedence over `vertical` | `'horizontal' \| 'vertical'` | `'horizontal'` |
| wrap | Wrapping behavior, `true` equals `'wrap'` | `boolean \| CSSProperties['flexWrap']` | `'nowrap'` |
| justify | Main axis alignment, i.e. `justify-content` | `CSSProperties['justifyContent']` | `normal` |
| align | Cross axis alignment, i.e. `align-items` | `CSSProperties['alignItems']` | `normal` |
| flex | `flex` CSS shorthand | `CSSProperties['flex']` | - |
| gap | Gap between children | `'small' \| 'medium' \| 'large' \| string \| number` | - |
| component | Custom element type | `React.ElementType` | `'div'` |

Other HTML attributes (`className`, `style`, `onClick`, etc.) are passed to the root element.

### gap presets

| Value | Gap |
|-------|-----|
| `small` | 8px |
| `medium` | 16px |
| `large` | 24px |
