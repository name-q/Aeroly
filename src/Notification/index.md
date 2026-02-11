---
title: Notification 通知提醒框
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
---

# Notification 通知提醒框

全局展示通知提醒信息，从屏幕边缘滑入，支持四个角定位、自适应内容高度、手动关闭。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 不同类型

<code src="./demos/types.tsx"></code>

## 自定义时长

<code src="./demos/duration.tsx"></code>

## 弹出位置

<code src="./demos/placement.tsx"></code>

## 带操作按钮

<code src="./demos/footer.tsx"></code>

## API

命令式调用，直接使用 `notification` 对象的方法：

```ts
import { notification } from 'aero-ui';

notification.info('标题', '描述内容');
notification.success('标题', '描述内容');
notification.warning('标题', '描述内容');
notification.error('标题', '描述内容');
```

### 快捷方法

| 方法 | 说明 | 类型 |
|------|------|------|
| notification.info | 信息通知 | `(title, description?, config?) => void` |
| notification.success | 成功通知 | `(title, description?, config?) => void` |
| notification.warning | 警告通知 | `(title, description?, config?) => void` |
| notification.error | 错误通知 | `(title, description?, config?) => void` |
| notification.open | 自定义配置 | `(config: NotificationConfig) => void` |

### NotificationConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| description | 描述内容 | `ReactNode` | - |
| type | 类型 | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| duration | 自动关闭延时（ms），0 不自动关闭 | `number` | `4500` |
| icon | 自定义图标 | `LucideIcon` | - |
| placement | 弹出位置 | `'topRight' \| 'topLeft' \| 'bottomRight' \| 'bottomLeft'` | `'topRight'` |
| footer | 底部操作区 | `ReactNode` | - |
| onClose | 关闭回调 | `() => void` | - |
