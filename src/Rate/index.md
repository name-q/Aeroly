---
title: Rate 评分
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# Rate 评分

用于对事物进行快速评级，支持整星和半星选择，星星带有柔和的光晕反馈。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 半选

<code src="./demos/half.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 自定义数量

<code src="./demos/count.tsx"></code>

## 自定义图标

<code src="./demos/custom-icon.tsx"></code>

## 自定义颜色

<code src="./demos/color.tsx"></code>

## 禁用与只读

<code src="./demos/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `number` | - |
| defaultValue | 默认值（非受控） | `number` | `0` |
| count | 星星总数 | `number` | `5` |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| allowClear | 是否允许再次点击清除 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 是否只读 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| icon | 自定义图标 | `ReactNode` | `<Star />` |
| color | 自定义颜色，支持固定色或动态函数 | `string \| ((value: number) => string)` | - |
| onChange | 变化回调 | `(value: number) => void` | - |
| onHoverChange | hover 变化回调 | `(value: number) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
