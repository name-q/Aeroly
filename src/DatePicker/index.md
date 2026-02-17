---
title: DatePicker
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# DatePicker

Select or input a date. Supports day, month, and year view switching.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx"></code>

## Custom Format

<code src="./en/demos/format.tsx"></code>

## Disabled Dates

<code src="./en/demos/disabledDate.tsx"></code>

## Sizes

<code src="./en/demos/size.tsx"></code>

## Disabled

<code src="./en/demos/disabled.tsx"></code>

## Date & Time Selection

<code src="./en/demos/showTime.tsx"></code>

## Date & Time (Hide Seconds)

<code src="./en/demos/showTimeNoSecond.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Current value (controlled) | `string` | - |
| defaultValue | Default value (uncontrolled) | `string` | - |
| onChange | Callback when value changes | `(value: string) => void` | - |
| placeholder | Placeholder text | `string` | `'Select date'` |
| disabled | Whether disabled | `boolean` | `false` |
| allowClear | Whether to allow clearing | `boolean` | `true` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| format | Display format | `string` | `'YYYY-MM-DD'` |
| disabledDate | Function to determine disabled dates | `(date: Date) => boolean` | - |
| showTime | Whether to show time selection | `boolean \| { showSecond?: boolean }` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
