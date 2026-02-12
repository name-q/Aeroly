---
title: Alert 警告提示
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
toc: content
---

# Alert 警告提示

页面内的静态警告提示，不打断用户流程。标题文字默认带有光影掠过效果，吸引用户注意。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 辅助描述

<code src="./demos/description.tsx"></code>

## 可关闭

<code src="./demos/closable.tsx"></code>

## 自定义

<code src="./demos/custom.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| children | 提示内容（标题） | `ReactNode` | - |
| type | 提示类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| description | 辅助描述文字 | `ReactNode` | - |
| closable | 是否可关闭 | `boolean` | `false` |
| onClose | 关闭回调 | `() => void` | - |
| icon | 自定义图标 | `LucideIcon` | - |
| showIcon | 是否显示图标 | `boolean` | `true` |
| shimmer | 是否开启文字光影掠过效果 | `boolean` | `true` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
