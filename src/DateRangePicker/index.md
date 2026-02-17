---
title: DateRangePicker
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# DateRangePicker

Select a date range with side-by-side dual calendar panels. Supports time selection.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Date & Time Range

<code src="./en/demos/showTime.tsx" id="showTime-en"></code>

## Disabled Dates

<code src="./en/demos/disabledDate.tsx" id="disabledDate-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Current value (controlled) | `[string, string]` | - |
| defaultValue | Default value (uncontrolled) | `[string, string]` | - |
| onChange | Callback when value changes | `(value: [string, string]) => void` | - |
| placeholder | Placeholder text | `[string, string]` | `['Start date', 'End date']` |
| disabled | Whether disabled | `boolean` | `false` |
| allowClear | Whether to allow clearing | `boolean` | `true` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| format | Display format | `string` | `'YYYY-MM-DD'` |
| disabledDate | Function to determine disabled dates | `(date: Date) => boolean` | - |
| showTime | Whether to show time selection | `boolean \| { showSecond?: boolean }` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
