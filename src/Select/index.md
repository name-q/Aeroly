---
title: Select
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Select

Dropdown selector. Supports single select, multiple select, search filtering, grouping, and keyboard navigation.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Multiple Selection

<code src="./en/demos/multiple.tsx" id="multiple-en"></code>

## Search

<code src="./en/demos/search.tsx" id="search-en"></code>

## Grouping

<code src="./en/demos/group.tsx" id="group-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## API

### Select

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| options | Option list (supports grouping) | `SelectOptionType[]` | - |
| value | Current value (controlled) | `string \| number \| (string \| number)[]` | - |
| defaultValue | Default value | `string \| number \| (string \| number)[]` | - |
| onChange | Callback when value changes | `(value, option) => void` | - |
| placeholder | Placeholder text | `string` | - |
| disabled | Whether disabled | `boolean` | `false` |
| allowClear | Whether to allow clearing | `boolean` | `false` |
| showSearch | Whether searchable | `boolean` | `false` |
| filterOption | Custom search filter | `(input: string, option: SelectOption) => boolean` | Built-in label matching |
| searchPlaceholder | Search input placeholder | `string` | - |
| multiple | Whether multiple selection | `boolean` | `false` |
| maxTagCount | Max number of tags to display in multiple mode | `number` | - |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| notFoundContent | Content when no data | `ReactNode` | - |
| open | Whether dropdown is visible (controlled) | `boolean` | - |
| onOpenChange | Callback when dropdown visibility changes | `(open: boolean) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### SelectOption

| Property | Description | Type |
|----------|-------------|------|
| label | Display text | `ReactNode` |
| value | Option value | `string \| number` |
| disabled | Whether disabled | `boolean` |

### SelectGroupOption

| Property | Description | Type |
|----------|-------------|------|
| label | Group title | `ReactNode` |
| options | Options in the group | `SelectOption[]` |

### Keyboard Interaction

| Key | Description |
|-----|-------------|
| `↑` `↓` | Move highlight between options |
| `Enter` | Select the highlighted option |
| `Esc` | Close the dropdown |
| `Backspace` | Remove the last tag in multiple mode |
