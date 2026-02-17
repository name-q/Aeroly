---
title: Tree
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Tree

A hierarchical tree structure. Supports expand/collapse, selection, checkboxes (with parent-child association), connecting lines, and custom icons.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Checkable

<code src="./en/demos/checkable.tsx" id="checkable-en"></code>

## Connecting Lines

<code src="./en/demos/line.tsx" id="line-en"></code>

## Custom Icons

<code src="./en/demos/icon.tsx" id="icon-en"></code>

## Controlled Mode

<code src="./en/demos/controlled.tsx" id="controlled-en"></code>

## Disabled

<code src="./en/demos/disabled.tsx" id="disabled-en"></code>

## Drag & Drop

<code src="./en/demos/draggable.tsx" id="draggable-en"></code>

## API

### Tree

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| treeData | Tree data | `TreeNodeData[]` | - |
| expandedKeys | Expanded node keys (controlled) | `string[]` | - |
| defaultExpandedKeys | Default expanded node keys | `string[]` | `[]` |
| defaultExpandAll | Whether to expand all nodes by default | `boolean` | `false` |
| onExpand | Callback when expand/collapse | `(keys: string[], info) => void` | - |
| selectedKeys | Selected node keys (controlled) | `string[]` | - |
| defaultSelectedKeys | Default selected node keys | `string[]` | `[]` |
| onSelect | Callback when selected | `(keys: string[], info) => void` | - |
| checkedKeys | Checked node keys (controlled) | `string[]` | - |
| defaultCheckedKeys | Default checked node keys | `string[]` | `[]` |
| onCheck | Callback when checked | `(keys: string[], info) => void` | - |
| checkable | Whether to show checkboxes | `boolean` | `false` |
| multiple | Whether to allow multiple selection | `boolean` | `false` |
| showLine | Whether to show connecting lines | `boolean` | `false` |
| showIcon | Whether to show icons | `boolean` | `false` |
| disabled | Whether to disable the entire tree | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### TreeNodeData

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| key | Unique identifier | `string` | - |
| title | Display content | `ReactNode` | - |
| children | Child nodes | `TreeNodeData[]` | - |
| disabled | Whether disabled | `boolean` | `false` |
| icon | Custom icon | `ReactNode` | - |
| isLeaf | Whether it is a leaf node | `boolean` | - |

### Tree.Draggable

Inherits all Tree properties, with additional support for:

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| onDrop | Callback when drop completes | `(info: DropInfo) => void` | - |
| allowDrop | Control whether drop is allowed | `(info: { dragNode, dropNode, dropPosition }) => boolean` | - |

### DropInfo

| Property | Description | Type |
|----------|-------------|------|
| dragNode | The dragged node | `TreeNodeData` |
| dropNode | The target node | `TreeNodeData` |
| dropPosition | Drop position | `'before' \| 'inside' \| 'after'` |
| treeData | New tree data after move | `TreeNodeData[]` |
