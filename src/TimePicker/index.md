---
title: TimePicker
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# TimePicker

Select a time value. The dropdown panel features scrollable columns for an intuitive experience.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Hide Seconds

<code src="./en/demos/hideSecond.tsx" id="hideSecond-en"></code>

## Step

<code src="./en/demos/step.tsx" id="step-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Current value (controlled, format `HH:mm:ss` or `HH:mm`) | `string` | - |
| defaultValue | Default value (uncontrolled) | `string` | - |
| onChange | Callback when value changes | `(value: string) => void` | - |
| placeholder | Placeholder text | `string` | `'Select time'` |
| disabled | Whether disabled | `boolean` | `false` |
| allowClear | Whether to allow clearing | `boolean` | `true` |
| showSecond | Whether to show seconds column | `boolean` | `true` |
| hourStep | Hour step | `number` | `1` |
| minuteStep | Minute step | `number` | `1` |
| secondStep | Second step | `number` | `1` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
