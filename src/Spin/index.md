---
nav:
  title: 组件
  order: 1
group:
  title: 反馈
  order: 4
title: Spin 加载中
order: 3
---

# Spin 加载中

用于页面和区块的加载状态，支持独立使用和包裹内容两种模式。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 提示文字

<code src="./demos/tip.tsx"></code>

## 容器模式

<code src="./demos/wrapper.tsx"></code>

## 延迟显示

<code src="./demos/delay.tsx"></code>

## 自定义指示器

<code src="./demos/custom.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spinning | 是否为加载状态 | `boolean` | `true` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| tip | 提示文字 | `ReactNode` | - |
| delay | 延迟显示（ms），防闪烁 | `number` | - |
| indicator | 自定义指示器 | `ReactNode` | - |
| children | 包裹内容（容器模式） | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
