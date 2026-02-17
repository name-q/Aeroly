---
title: Checkbox
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Checkbox

Used for selecting multiple items from a set of options, providing clear selection feedback.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Checkbox Group

<code src="./en/demos/group.tsx"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx"></code>

## Check All & Indeterminate

<code src="./en/demos/indeterminate.tsx"></code>

## Sizes

<code src="./en/demos/size.tsx"></code>

## Disabled

<code src="./en/demos/disabled.tsx"></code>

## API

### Checkbox

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| checked | Whether checked (controlled) | `boolean` | - |
| defaultChecked | Whether checked by default (uncontrolled) | `boolean` | `false` |
| indeterminate | Whether in indeterminate state (visual only) | `boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| value | Identifier value when used in a Group | `string \| number` | - |
| onChange | Callback when checked state changes | `(checked: boolean) => void` | - |
| children | Label content | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Checkbox.Group

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Currently checked values (controlled) | `(string \| number)[]` | - |
| defaultValue | Default checked values (uncontrolled) | `(string \| number)[]` | `[]` |
| onChange | Callback when checked values change | `(value: (string \| number)[]) => void` | - |
| options | Option data | `(string \| number \| CheckboxOptionType)[]` | - |
| disabled | Whether to disable all options | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| direction | Layout direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### CheckboxOptionType

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Option value | `string \| number` | - |
| label | Display content | `ReactNode` | - |
| disabled | Whether to disable this option | `boolean` | `false` |
