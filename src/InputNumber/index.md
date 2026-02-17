---
title: InputNumber
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# InputNumber

Enter a number via mouse or keyboard. Supports stepping, range limits, precision control, and formatting.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Sizes

<code src="./en/demos/size.tsx"></code>

## Step & Precision

<code src="./en/demos/step.tsx"></code>

## Formatter

<code src="./en/demos/formatter.tsx"></code>

## Disabled & ReadOnly

<code src="./en/demos/disabled.tsx"></code>

## API

### InputNumber

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Current value (controlled) | `number \| null` | - |
| defaultValue | Default value | `number \| null` | `null` |
| onChange | Callback when value changes | `(value: number \| null) => void` | - |
| min | Minimum value | `number` | `-Infinity` |
| max | Maximum value | `number` | `Infinity` |
| step | Step size | `number` | `1` |
| precision | Decimal precision | `number` | Derived from step |
| disabled | Whether disabled | `boolean` | `false` |
| readOnly | Whether read-only | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| placeholder | Placeholder text | `string` | - |
| controls | Whether to show step buttons | `boolean` | `true` |
| prefix | Prefix content | `ReactNode` | - |
| formatter | Format display value | `(value: number \| undefined) => string` | - |
| parser | Parse display value to number | `(displayValue: string) => number` | - |
| keyboard | Whether to support keyboard up/down keys | `boolean` | `true` |
| onStep | Callback when stepping | `(value: number, info) => void` | - |
| onPressEnter | Callback when Enter is pressed | `(e) => void` | - |
| onFocus | Callback when focused | `(e) => void` | - |
| onBlur | Callback when blurred | `(e) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
