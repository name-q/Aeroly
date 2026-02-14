---
title: Skeleton 骨架屏
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
---

# Skeleton 骨架屏

在数据加载完成前，用灰色占位块勾勒出内容的大致结构，减少用户等待焦虑。

提供 `Block`、`Circle`、`Text` 三种原子形状，可自由组合出任意骨架布局。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 加载切换

<code src="./demos/loading.tsx"></code>

## 光影动画

<code src="./demos/active.tsx"></code>

## 列表加载

<code src="./demos/list.tsx"></code>

## API

### Skeleton

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| active | 是否启用光影动画 | `boolean` | `true` |
| children | 骨架内容（Block / Circle / Text 组合） | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Skeleton.Block

矩形占位块，适用于图片、卡片、按钮等任意矩形区域。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| width | 宽度 | `number \| string` | `'100%'` |
| height | 高度 | `number \| string` | `16` |
| borderRadius | 圆角 | `number \| string` | `8` |
| active | 是否启用光影动画，默认继承父级 | `boolean` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Skeleton.Circle

圆形占位块，适用于头像、图标等。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| size | 直径 | `number` | `40` |
| active | 是否启用光影动画，默认继承父级 | `boolean` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Skeleton.Text

多行文本占位，最后一行默认 60% 宽度。

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| rows | 行数 | `number` | `3` |
| widths | 每行宽度，可传数组分别指定 | `(number \| string)[]` | - |
| lineHeight | 行高 | `number` | `16` |
| gap | 行间距 | `number` | `12` |
| active | 是否启用光影动画，默认继承父级 | `boolean` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
