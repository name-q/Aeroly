---
title: Tree 树形控件
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Tree 树形控件

展现层级关系的树形结构，支持展开收起、选中、勾选（父子联动）、连接线、自定义图标。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 勾选框

<code src="./demos/checkable.tsx"></code>

## 连接线

<code src="./demos/line.tsx"></code>

## 自定义图标

<code src="./demos/icon.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## 拖拽排序

<code src="./demos/draggable.tsx"></code>

## API

### Tree

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| treeData | 树数据 | `TreeNodeData[]` | - |
| expandedKeys | 展开的节点 key（受控） | `string[]` | - |
| defaultExpandedKeys | 默认展开的节点 key | `string[]` | `[]` |
| defaultExpandAll | 是否默认展开所有节点 | `boolean` | `false` |
| onExpand | 展开/收起回调 | `(keys: string[], info) => void` | - |
| selectedKeys | 选中的节点 key（受控） | `string[]` | - |
| defaultSelectedKeys | 默认选中的节点 key | `string[]` | `[]` |
| onSelect | 选中回调 | `(keys: string[], info) => void` | - |
| checkedKeys | 勾选的节点 key（受控） | `string[]` | - |
| defaultCheckedKeys | 默认勾选的节点 key | `string[]` | `[]` |
| onCheck | 勾选回调 | `(keys: string[], info) => void` | - |
| checkable | 是否显示勾选框 | `boolean` | `false` |
| multiple | 是否允许多选 | `boolean` | `false` |
| showLine | 是否显示连接线 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `false` |
| disabled | 是否禁用整棵树 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TreeNodeData

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 唯一标识 | `string` | - |
| title | 显示内容 | `ReactNode` | - |
| children | 子节点 | `TreeNodeData[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| icon | 自定义图标 | `ReactNode` | - |
| isLeaf | 是否为叶子节点 | `boolean` | - |

### Tree.Draggable

继承 Tree 的所有属性，额外支持：

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| onDrop | 拖拽完成回调 | `(info: DropInfo) => void` | - |
| allowDrop | 控制是否允许放置 | `(info: { dragNode, dropNode, dropPosition }) => boolean` | - |

### DropInfo

| 属性 | 说明 | 类型 |
|------|------|------|
| dragNode | 被拖拽的节点 | `TreeNodeData` |
| dropNode | 目标节点 | `TreeNodeData` |
| dropPosition | 放置位置 | `'before' \| 'inside' \| 'after'` |
| treeData | 移动后的新树数据 | `TreeNodeData[]` |
