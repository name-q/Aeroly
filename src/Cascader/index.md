---
title: Cascader 级联选择
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
---

# Cascader 级联选择

多列级联选择器，逐级展开子菜单选择，支持多选、搜索、选择任意层级。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 多选

<code src="./demos/multiple.tsx"></code>

## 搜索

<code src="./demos/search.tsx"></code>

## 选择任意层级

<code src="./demos/trigger.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

### Cascader

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 级联选项数据 | `CascaderOption[]` | - |
| value | 当前值（受控） | `CascaderValueType \| CascaderValueType[]` | - |
| defaultValue | 默认值 | `CascaderValueType \| CascaderValueType[]` | - |
| onChange | 值变化回调 | `(value, selectedOptions) => void` | - |
| placeholder | 占位文案 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `false` |
| showSearch | 是否可搜索 | `boolean` | `false` |
| searchPlaceholder | 搜索框占位文案 | `string` | - |
| multiple | 是否多选 | `boolean` | `false` |
| maxTagCount | 多选时最多显示的标签数 | `number` | - |
| changeOnSelect | 选择任意层级即触发 onChange | `boolean` | `false` |
| displaySeparator | 显示文本的分隔符 | `string` | `' / '` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| notFoundContent | 无数据时的提示 | `ReactNode` | - |
| open | 下拉面板是否显示（受控） | `boolean` | - |
| onOpenChange | 下拉面板显隐变化回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### CascaderOption

| 属性 | 说明 | 类型 |
|------|------|------|
| value | 选项值 | `string \| number` |
| label | 显示文本 | `ReactNode` |
| children | 子选项 | `CascaderOption[]` |
| disabled | 是否禁用 | `boolean` |
| isLeaf | 是否为叶子节点 | `boolean` |

### CascaderValueType

`(string | number)[]` — 从根到叶的路径数组，如 `['zhejiang', 'hangzhou', 'xihu']`。
