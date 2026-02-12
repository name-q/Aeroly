---
title: Radio 单选框
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# Radio 单选框

用于在一组互斥选项中选择一个，毛玻璃圆形指示器提供清晰的选中反馈。

## 基础用法

<code src="./demos/basic.tsx"></code>

## Radio.Group 单选框组

<code src="./demos/group.tsx"></code>

## Radio.Group 受控模式

<code src="./demos/controlled.tsx"></code>

## Radio.Group 尺寸

<code src="./demos/size.tsx"></code>

## Radio.Group 禁用

<code src="./demos/disabled.tsx"></code>

## Radio.Group 按钮模式

<code src="./demos/button.tsx"></code>

## Radio.Group 按钮尺寸

<code src="./demos/button-size.tsx"></code>

## Radio.Group 按钮禁用

<code src="./demos/button-disabled.tsx"></code>

## API

### Radio

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 默认是否选中（非受控） | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| value | 在 Group 中使用时的标识值 | `string \| number` | - |
| onChange | 选中状态变化回调 | `(checked: boolean) => void` | - |
| children | 标签内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Radio.Group

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前选中值（受控） | `string \| number` | - |
| defaultValue | 默认选中值（非受控） | `string \| number` | - |
| onChange | 选中变化回调 | `(value: string \| number) => void` | - |
| options | 选项数据 | `(string \| number \| RadioOptionType)[]` | - |
| optionType | 选项展示类型 | `'default' \| 'button'` | `'default'` |
| disabled | 是否整体禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### RadioOptionType

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 选项值 | `string \| number` | - |
| label | 显示内容 | `ReactNode` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |
