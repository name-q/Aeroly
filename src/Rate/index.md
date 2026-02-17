---
title: Rate
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Rate

Used for quick rating of items, supporting full and half star selection with a soft glow feedback on stars.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Half Star

<code src="./en/demos/half.tsx" id="half-en"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Size

<code src="./en/demos/size.tsx" id="size-en"></code>

## Custom Count

<code src="./en/demos/count.tsx" id="count-en"></code>

## Custom Icon

<code src="./en/demos/custom-icon.tsx" id="custom-icon-en"></code>

## Custom Color

<code src="./en/demos/color.tsx" id="color-en"></code>

## Disabled and Read Only

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

| Property | Description | Type | Default |
|------|------|------|--------|
| value | Current value (controlled) | `number` | - |
| defaultValue | Default value (uncontrolled) | `number` | `0` |
| count | Total number of stars | `number` | `5` |
| allowHalf | Whether to allow half selection | `boolean` | `false` |
| allowClear | Whether to allow clearing by clicking again | `boolean` | `true` |
| disabled | Whether disabled | `boolean` | `false` |
| readOnly | Whether read only | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| icon | Custom icon | `ReactNode` | `<Star />` |
| color | Custom color, supports fixed color or dynamic function | `string \| ((value: number) => string)` | - |
| onChange | Change callback | `(value: number) => void` | - |
| onHoverChange | Hover change callback | `(value: number) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
