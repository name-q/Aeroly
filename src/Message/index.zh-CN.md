---
title: Message 全局提示
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
toc: content
---

# Message 全局提示

全局展示操作反馈信息。顶部居中显示并自动消失，不打断用户操作的轻量级提示。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 不同类型

<code src="./demos/types.tsx"></code>

## 自定义时长

<code src="./demos/duration.tsx"></code>

## 自定义图标

<code src="./demos/custom.tsx"></code>

## API

命令式调用，直接使用 `message` 对象的方法：

```ts
import { message } from 'aero-ui';

message.info('提示内容');
message.success('提示内容');
message.warning('提示内容');
message.error('提示内容');
```

### 快捷方法

| 方法 | 说明 | 类型 |
|------|------|------|
| message.info | 信息提示 | `(content: ReactNode, duration?: number) => void` |
| message.success | 成功提示 | `(content: ReactNode, duration?: number) => void` |
| message.warning | 警告提示 | `(content: ReactNode, duration?: number) => void` |
| message.error | 错误提示 | `(content: ReactNode, duration?: number) => void` |
| message.open | 自定义配置 | `(config: MessageConfig) => void` |

### MessageConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| content | 提示内容 | `ReactNode` | - |
| type | 提示类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| duration | 自动关闭延时（ms），设为 0 不自动关闭 | `number` | `3000` |
| icon | 自定义图标 | `LucideIcon` | - |
| onClose | 关闭回调 | `() => void` | - |
