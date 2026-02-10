---
title: Divider 分割线
group:
  title: 通用
  order: 1
nav:
  title: 组件
  path: /components
---

# Divider 分割线

区隔内容的分割线，支持水平与垂直方向，水平方向可嵌入文字。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 带文字

<code src="./demos/text.tsx"></code>

## 垂直分割线

<code src="./demos/vertical.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| direction | 分割线方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| orientation | 文字位置（仅水平有效） | `'left' \| 'center' \| 'right'` | `'center'` |
| children | 嵌入文字 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
