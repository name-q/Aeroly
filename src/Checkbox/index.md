---
title: Checkbox 复选框
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
---

# Checkbox 复选框

用于在一组选项中进行多项选择，毛玻璃风格指示器提供清晰的选中反馈。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 复选框组

<code src="./demos/group.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 全选与半选

<code src="./demos/indeterminate.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

### Checkbox

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 默认是否选中（非受控） | `boolean` | `false` |
| indeterminate | 是否为半选状态（仅视觉） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| value | 在 Group 中使用时的标识值 | `string \| number` | - |
| onChange | 选中状态变化回调 | `(checked: boolean) => void` | - |
| children | 标签内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Checkbox.Group

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前选中值（受控） | `(string \| number)[]` | - |
| defaultValue | 默认选中值（非受控） | `(string \| number)[]` | `[]` |
| onChange | 选中变化回调 | `(value: (string \| number)[]) => void` | - |
| options | 选项数据 | `(string \| number \| CheckboxOptionType)[]` | - |
| disabled | 是否整体禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### CheckboxOptionType

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项值 | `string \| number` | - |
| label | 显示内容 | `ReactNode` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
