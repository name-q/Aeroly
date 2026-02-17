---
title: Switch
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Switch

Toggle between two states. A track with a solid thumb provides clear on/off perception.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Text Labels

<code src="./en/demos/text.tsx" id="text-en"></code>

## Loading

<code src="./en/demos/loading.tsx" id="loading-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| checked | Whether turned on (controlled) | `boolean` | - |
| defaultChecked | Whether turned on by default (uncontrolled) | `boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| loading | Whether in loading state | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| checkedText | Text label when on | `ReactNode` | - |
| uncheckedText | Text label when off | `ReactNode` | - |
| onChange | Callback when state changes | `(checked: boolean) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
