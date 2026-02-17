---
title: Segmented
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Segmented

Displays multiple options and allows the user to select one. Commonly used for view switching, filtering, and similar scenarios.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx"></code>

## Block Mode

<code src="./en/demos/block.tsx"></code>

## Sizes

<code src="./en/demos/size.tsx"></code>

## Custom Rendering

<code src="./en/demos/custom.tsx"></code>

## Disabled

<code src="./en/demos/disabled.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| options | Option data | `(string \| number \| SegmentedOption)[]` | - |
| value | Currently selected value (controlled) | `string \| number` | - |
| defaultValue | Default selected value (uncontrolled) | `string \| number` | Value of the first option |
| onChange | Callback when selection changes | `(value: string \| number) => void` | - |
| block | Whether to fill parent container width | `boolean` | `false` |
| disabled | Whether to disable all options | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### SegmentedOption

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Option value | `string \| number` | - |
| label | Display content | `ReactNode` | - |
| disabled | Whether to disable this option | `boolean` | `false` |
