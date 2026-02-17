---
title: TextArea
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# TextArea

Multi-line text input that auto-resizes to fit content by default. Grows naturally as you type.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Row Range Limit

<code src="./en/demos/autosize.tsx" id="autosize-en"></code>

## Fixed Rows

<code src="./en/demos/fixed.tsx" id="fixed-en"></code>

## Character Count

<code src="./en/demos/count.tsx" id="count-en"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Validation Status

<code src="./en/demos/status.tsx" id="status-en"></code>

## Disabled & ReadOnly

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Input value (controlled) | `string` | - |
| defaultValue | Default value (uncontrolled) | `string` | `''` |
| onChange | Callback when value changes | `(value: string) => void` | - |
| placeholder | Placeholder text | `string` | - |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Validation status | `'error' \| 'warning'` | - |
| disabled | Whether disabled | `boolean` | `false` |
| readOnly | Whether read-only | `boolean` | `false` |
| autoSize | Auto-resize height | `boolean \| { minRows?: number; maxRows?: number }` | `true` |
| rows | Fixed rows (effective when `autoSize` is off) | `number` | `3` |
| resize | Whether to allow manual drag resizing (effective when `autoSize` is off) | `boolean` | `false` |
| maxLength | Maximum length | `number` | - |
| showCount | Whether to show character count | `boolean` | `false` |
| autoFocus | Auto focus | `boolean` | `false` |
| onFocus | Callback when focused | `(e: FocusEvent) => void` | - |
| onBlur | Callback when blurred | `(e: FocusEvent) => void` | - |
| onKeyDown | Callback when key is pressed | `(e: KeyboardEvent) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
