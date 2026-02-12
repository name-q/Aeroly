---
title: Select 选择器
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# Select 选择器

下拉选择器，支持单选、多选、搜索过滤、分组、键盘导航。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 多选

<code src="./demos/multiple.tsx"></code>

## 搜索

<code src="./demos/search.tsx"></code>

## 分组

<code src="./demos/group.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

### Select

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| options | 选项列表（支持分组） | `SelectOptionType[]` | - |
| value | 当前值（受控） | `string \| number \| (string \| number)[]` | - |
| defaultValue | 默认值 | `string \| number \| (string \| number)[]` | - |
| onChange | 值变化回调 | `(value, option) => void` | - |
| placeholder | 占位文案 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `false` |
| showSearch | 是否可搜索 | `boolean` | `false` |
| filterOption | 自定义搜索过滤 | `(input: string, option: SelectOption) => boolean` | 内置 label 匹配 |
| searchPlaceholder | 搜索框占位文案 | `string` | - |
| multiple | 是否多选 | `boolean` | `false` |
| maxTagCount | 多选时最多显示的标签数 | `number` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| notFoundContent | 无数据时的提示 | `ReactNode` | - |
| open | 下拉面板是否显示（受控） | `boolean` | - |
| onOpenChange | 下拉面板显隐变化回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### SelectOption

| 属性 | 说明 | 类型 |
|------|------|------|
| label | 显示文本 | `ReactNode` |
| value | 选项值 | `string \| number` |
| disabled | 是否禁用 | `boolean` |

### SelectGroupOption

| 属性 | 说明 | 类型 |
|------|------|------|
| label | 分组标题 | `ReactNode` |
| options | 分组下的选项 | `SelectOption[]` |

### 键盘交互

| 按键 | 说明 |
|------|------|
| `↑` `↓` | 在选项间移动高亮 |
| `Enter` | 选中当前高亮项 |
| `Esc` | 关闭下拉面板 |
| `Backspace` | 多选模式下删除最后一个标签 |
