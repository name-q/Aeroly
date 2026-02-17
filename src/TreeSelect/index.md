---
title: TreeSelect
group:
  title: Data Entry
  order: 3
nav:
  title: Components
  path: /components
toc: content
---

# TreeSelect

A tree-structured dropdown selector supporting single selection, multiple selection (checkbox with parent-child linkage), search filtering, and leaf-only selection.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Multiple Selection

<code src="./en/demos/multiple.tsx"></code>

## Search

<code src="./en/demos/search.tsx"></code>

## Size

<code src="./en/demos/size.tsx"></code>

## Disabled

<code src="./en/demos/disabled.tsx"></code>

## API

### TreeSelect

| Property | Description | Type | Default |
|------|------|------|--------|
| treeData | Tree data | `TreeSelectNodeData[]` | - |
| value | Current value (controlled) | `string \| string[]` | - |
| defaultValue | Default value | `string \| string[]` | - |
| onChange | Callback when value changes | `(value, nodes) => void` | - |
| placeholder | Placeholder text | `string` | - |
| disabled | Whether disabled | `boolean` | `false` |
| allowClear | Whether to allow clearing | `boolean` | `false` |
| showSearch | Whether searchable | `boolean` | `false` |
| filterTreeNode | Custom search filter | `(input: string, node: TreeSelectNodeData) => boolean` | Built-in title matching |
| searchPlaceholder | Search input placeholder | `string` | - |
| multiple | Whether multiple selection (checkbox mode) | `boolean` | `false` |
| maxTagCount | Maximum number of tags displayed in multiple mode | `number` | - |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | Status | `'error' \| 'warning'` | - |
| notFoundContent | Content when no data | `ReactNode` | - |
| defaultExpandAll | Whether to expand all nodes by default | `boolean` | `false` |
| defaultExpandedKeys | Default expanded node keys | `string[]` | `[]` |
| treeLeafOnly | Whether only leaf nodes are selectable (single select) | `boolean` | `false` |
| open | Whether the dropdown is visible (controlled) | `boolean` | - |
| onOpenChange | Callback when dropdown visibility changes | `(open: boolean) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### TreeSelectNodeData

| Property | Description | Type | Default |
|------|------|------|--------|
| key | Unique identifier | `string` | - |
| title | Display content | `ReactNode` | - |
| children | Child nodes | `TreeSelectNodeData[]` | - |
| disabled | Whether disabled | `boolean` | `false` |
| isLeaf | Whether it is a leaf node | `boolean` | - |

### Keyboard Interaction

| Key | Description |
|------|------|
| `↓` / `Enter` | Open dropdown |
| `Esc` | Close dropdown |
| `Backspace` | Remove last tag in multiple mode |
