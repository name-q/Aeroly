---
title: Badge 徽标数
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Badge 徽标数

图标或文字右上角的圆形徽标数字，用于消息提示、状态标记。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 小红点

<code src="./demos/dot.tsx"></code>

## 封顶数字

<code src="./demos/overflow.tsx"></code>

## 光影动画

<code src="./demos/shimmer.tsx"></code>

## 自定义颜色和内容

<code src="./demos/custom.tsx"></code>

## 状态点

<code src="./demos/status.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| count | 展示的数字，0 时隐藏 | `number` | - |
| overflowCount | 封顶数字 | `number` | `99` |
| dot | 只显示小红点 | `boolean` | `false` |
| showZero | count 为 0 时是否显示 | `boolean` | `false` |
| shimmer | 光影掠过动画 | `boolean` | `false` |
| color | 自定义颜色 | `string` | - |
| text | 自定义显示内容 | `ReactNode` | - |
| status | 状态点（独立使用） | `'default' \| 'processing' \| 'success' \| 'warning' \| 'error'` | - |
| statusText | 状态点旁的文本 | `ReactNode` | - |
| offset | 偏移 [right, top] | `[number, number]` | - |
| children | 包裹的子元素 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
