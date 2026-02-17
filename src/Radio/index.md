---
title: Radio
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Radio

Used for selecting a single option from a set of mutually exclusive choices, providing clear selection feedback.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Radio.Group

<code src="./en/demos/group.tsx" id="group-en"></code>

## Radio.Group Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Radio.Group Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Radio.Group Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## Radio.Group Button Mode

<code src="./en/demos/button.tsx" id="button-en"></code>

## Radio.Group Button Sizes

<code src="./en/demos/button-size.tsx" id="button-size-en"></code>

## Radio.Group Button Disabled

<code src="./en/demos/button-disabled.tsx" id="button-disabled-en"></code>

## API

### Radio

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| checked | Whether checked (controlled) | `boolean` | - |
| defaultChecked | Whether checked by default (uncontrolled) | `boolean` | `false` |
| disabled | Whether disabled | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| value | Identifier value when used in a Group | `string \| number` | - |
| onChange | Callback when checked state changes | `(checked: boolean) => void` | - |
| children | Label content | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Radio.Group

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Currently selected value (controlled) | `string \| number` | - |
| defaultValue | Default selected value (uncontrolled) | `string \| number` | - |
| onChange | Callback when selection changes | `(value: string \| number) => void` | - |
| options | Option data | `(string \| number \| RadioOptionType)[]` | - |
| optionType | Option display type | `'default' \| 'button'` | `'default'` |
| disabled | Whether to disable all options | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| direction | Layout direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### RadioOptionType

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| value | Option value | `string \| number` | - |
| label | Display content | `ReactNode` | - |
| disabled | Whether to disable this option | `boolean` | `false` |
