---
title: Input
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Input

Text input with clear interaction feedback. Supports prefix/suffix, clearable, password toggle, character count, and more.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Sizes

<code src="./en/demos/size.tsx"></code>

## Prefix & Suffix

<code src="./en/demos/prefix-suffix.tsx"></code>

## Clearable

<code src="./en/demos/clear.tsx"></code>

## Password Input

<code src="./en/demos/password.tsx"></code>

## Character Count

<code src="./en/demos/count.tsx"></code>

## Addon Before & After

<code src="./en/demos/addon.tsx"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx"></code>

## Validation Status

<code src="./en/demos/status.tsx"></code>

## Disabled & ReadOnly

<code src="./en/demos/disabled.tsx"></code>

## API

### Input

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Input value (controlled) | `string` | - |
| defaultValue | Default value (uncontrolled) | `string` | `''` |
| onChange | Callback when value changes | `(value: string) => void` | - |
| placeholder | Placeholder text | `string` | - |
| type | Input type | `'text' \| 'password' \| 'number' \| 'email' \| 'tel' \| 'url'` | `'text'` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Validation status | `'error' \| 'warning'` | - |
| disabled | Whether disabled | `boolean` | `false` |
| readOnly | Whether read-only | `boolean` | `false` |
| loading | Whether loading | `boolean` | `false` |
| allowClear | Whether clearable | `boolean` | `false` |
| maxLength | Maximum length | `number` | - |
| showCount | Whether to show character count | `boolean` | `false` |
| prefixIcon | Prefix icon (Lucide icon component) | `LucideIcon` | - |
| suffixIcon | Suffix icon (Lucide icon component) | `LucideIcon` | - |
| prefix | Prefix content | `ReactNode` | - |
| suffix | Suffix content | `ReactNode` | - |
| addonBefore | Addon content before input | `ReactNode` | - |
| addonAfter | Addon content after input | `ReactNode` | - |
| autoFocus | Auto focus | `boolean` | `false` |
| onPressEnter | Callback when Enter is pressed | `(e: KeyboardEvent) => void` | - |
| onFocus | Callback when focused | `(e: FocusEvent) => void` | - |
| onBlur | Callback when blurred | `(e: FocusEvent) => void` | - |
| onKeyDown | Callback when key is pressed | `(e: KeyboardEvent) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
