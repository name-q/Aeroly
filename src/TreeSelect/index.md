---
title: TreeSelect 树选择
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# TreeSelect 树选择

树形结构的下拉选择器，支持单选、多选（勾选框 + 父子联动）、搜索过滤、仅选叶子节点。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 多选

<code src="./demos/multiple.tsx"></code>

## 搜索

<code src="./demos/search.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

### TreeSelect

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| treeData | 树数据 | `TreeSelectNodeData[]` | - |
| value | 当前值（受控） | `string \| string[]` | - |
| defaultValue | 默认值 | `string \| string[]` | - |
| onChange | 值变化回调 | `(value, nodes) => void` | - |
| placeholder | 占位文案 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `false` |
| showSearch | 是否可搜索 | `boolean` | `false` |
| filterTreeNode | 自定义搜索过滤 | `(input: string, node: TreeSelectNodeData) => boolean` | 内置 title 匹配 |
| searchPlaceholder | 搜索框占位文案 | `string` | - |
| multiple | 是否多选（勾选框模式） | `boolean` | `false` |
| maxTagCount | 多选时最多显示的标签数 | `number` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | 状态 | `'error' \| 'warning'` | - |
| notFoundContent | 无数据时的提示 | `ReactNode` | - |
| defaultExpandAll | 默认展开所有节点 | `boolean` | `false` |
| defaultExpandedKeys | 默认展开的节点 key | `string[]` | `[]` |
| treeLeafOnly | 是否只能选择叶子节点（单选） | `boolean` | `false` |
| open | 下拉面板是否显示（受控） | `boolean` | - |
| onOpenChange | 下拉面板显隐变化回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TreeSelectNodeData

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 唯一标识 | `string` | - |
| title | 显示内容 | `ReactNode` | - |
| children | 子节点 | `TreeSelectNodeData[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| isLeaf | 是否为叶子节点 | `boolean` | - |

### 键盘交互

| 按键 | 说明 |
|------|------|
| `↓` / `Enter` | 打开下拉面板 |
| `Esc` | 关闭下拉面板 |
| `Backspace` | 多选模式下删除最后一个标签 |
