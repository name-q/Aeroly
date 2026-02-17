---
title: Cascader
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# Cascader

A multi-column cascading selector that expands submenus level by level, supporting multiple selection, search, and selection at any level.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Multiple Selection

<code src="./en/demos/multiple.tsx"></code>

## Search

<code src="./en/demos/search.tsx"></code>

## Select Any Level

<code src="./en/demos/trigger.tsx"></code>

## Size

<code src="./en/demos/size.tsx"></code>

## Disabled

<code src="./en/demos/disabled.tsx"></code>

## API

### Cascader

| Property | Description | Type | Default |
|------|------|------|--------|
| options | Cascading option data | `CascaderOption[]` | - |
| value | Current value (controlled) | `CascaderValueType \| CascaderValueType[]` | - |
| defaultValue | Default value | `CascaderValueType \| CascaderValueType[]` | - |
| onChange | Callback when value changes | `(value, selectedOptions) => void` | - |
| placeholder | Placeholder text | `string` | - |
| disabled | Whether disabled | `boolean` | `false` |
| allowClear | Whether to allow clearing | `boolean` | `false` |
| showSearch | Whether searchable | `boolean` | `false` |
| searchPlaceholder | Search input placeholder | `string` | - |
| multiple | Whether multiple selection | `boolean` | `false` |
| maxTagCount | Maximum number of tags displayed in multiple mode | `number` | - |
| changeOnSelect | Trigger onChange when selecting any level | `boolean` | `false` |
| displaySeparator | Display text separator | `string` | `' / '` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| notFoundContent | Content when no data | `ReactNode` | - |
| open | Whether the dropdown is visible (controlled) | `boolean` | - |
| onOpenChange | Callback when dropdown visibility changes | `(open: boolean) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### CascaderOption

| Property | Description | Type |
|------|------|------|
| value | Option value | `string \| number` |
| label | Display text | `ReactNode` |
| children | Sub-options | `CascaderOption[]` |
| disabled | Whether disabled | `boolean` |
| isLeaf | Whether it is a leaf node | `boolean` |

### CascaderValueType

`(string | number)[]` — A path array from root to leaf, e.g. `['zhejiang', 'hangzhou', 'xihu']`.
