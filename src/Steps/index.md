---
title: Steps 步骤条
group:
  title: 导航
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Steps 步骤条

引导用户按流程完成任务，清晰展示当前所处步骤和整体进度。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 迷你版本

<code src="./demos/small.tsx"></code>

## 自定义图标

<code src="./demos/icon.tsx"></code>

## 可点击切换

<code src="./demos/clickable.tsx"></code>

## 标签垂直排列

<code src="./demos/label-vertical.tsx"></code>

## 垂直步骤条

<code src="./demos/vertical.tsx"></code>

## 错误状态

<code src="./demos/error.tsx"></code>

## API

### Steps

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| items | 步骤数据 | `StepItem[]` | - |
| current | 当前步骤（从 1 开始） | `number` | `1` |
| status | 当前步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 尺寸 | `'small' \| 'medium'` | `'medium'` |
| labelPlacement | 标签位置（仅水平方向） | `'horizontal' \| 'vertical'` | `'horizontal'` |
| clickable | 是否可点击切换 | `boolean` | `false` |
| onChange | 点击步骤回调 | `(current: number) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### StepItem

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| icon | 自定义图标（Lucide 图标组件） | `LucideIcon` | - |
| status | 单独指定状态，优先级高于 current 推断 | `'wait' \| 'process' \| 'finish' \| 'error'` | - |
| disabled | 是否禁用点击 | `boolean` | `false` |
