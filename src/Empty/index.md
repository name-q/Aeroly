---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 3
title: Empty 空状态
order: 9
---

# Empty 空状态

数据为空时的占位提示，内置 6 种场景预设，开箱即用。

## 基础用法

<code src="./demos/basic.tsx" description="零配置即可使用，默认展示「暂无数据」。"></code>

## 场景预设

<code src="./demos/presets.tsx" description="通过 preset 快速切换场景，自动匹配图标和文案。"></code>

## 带操作按钮

<code src="./demos/action.tsx" description="通过 extra 添加操作区，引导用户下一步行为。"></code>

## 自定义图标

<code src="./demos/custom.tsx" description="传入 Lucide 图标或任意 ReactNode 自定义视觉。"></code>

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| preset | `EmptyPreset` | `'default'` | 场景预设 |
| icon | `LucideIcon \| ReactNode \| null` | - | 自定义图标，null 隐藏 |
| iconSize | `number` | `48` | 图标大小 |
| title | `ReactNode` | - | 主文案，覆盖预设 |
| description | `ReactNode` | - | 描述文案，覆盖预设 |
| extra | `ReactNode` | - | 操作区 |
| image | `ReactNode` | - | 自定义图片区域，覆盖 icon |
| imageSize | `number` | `120` | 图片区域尺寸 |
| className | `string` | - | 自定义类名 |
| style | `CSSProperties` | - | 自定义样式 |

### EmptyPreset

| 值 | 图标 | 默认文案 |
|------|------|--------|
| `default` | Inbox | 暂无数据 |
| `search` | Search | 未找到结果 |
| `noData` | PackageOpen | 暂无数据 |
| `noPermission` | ShieldX | 无访问权限 |
| `networkError` | WifiOff | 网络异常 |
| `noContent` | FileX2 | 暂无内容 |
