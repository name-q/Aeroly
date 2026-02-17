---
title: Modal 对话框
group:
  title: 反馈
  order: 5
nav:
  title: 组件
  path: /components
toc: content
---

# Modal 对话框

模态对话框，在当前页面打开一个浮层，承载确认、表单、提示等交互。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 异步关闭

<code src="./demos/async.tsx"></code>

## 自定义底部

<code src="./demos/footer.tsx"></code>

## 居中显示

<code src="./demos/centered.tsx"></code>

## 命令式调用

<code src="./demos/confirm.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| open | 是否显示 | `boolean` | - |
| onOpenChange | 显隐变化回调 | `(open: boolean) => void` | - |
| title | 标题 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| footer | 底部操作区，传 `null` 隐藏 | `ReactNode \| null` | 默认确定/取消按钮 |
| okText | 确认按钮文案 | `ReactNode` | `'确定'` |
| cancelText | 取消按钮文案 | `ReactNode` | `'取消'` |
| onOk | 确认回调，返回 Promise 时按钮自动 loading | `() => void \| Promise<void>` | - |
| onCancel | 取消回调 | `() => void` | - |
| width | 宽度 | `number \| string` | `420` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| keyboard | 按 Esc 是否关闭 | `boolean` | `true` |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| centered | 是否垂直居中 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### 命令式方法

| 方法 | 说明 |
|------|------|
| Modal.confirm(config) | 确认对话框（带取消按钮） |
| Modal.info(config) | 信息提示 |
| Modal.success(config) | 成功提示 |
| Modal.warning(config) | 警告提示 |
| Modal.error(config) | 错误提示 |

### ConfirmConfig

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| content | 内容 | `ReactNode` | - |
| okText | 确认按钮文案 | `ReactNode` | `'确定'` |
| cancelText | 取消按钮文案 | `ReactNode` | `'取消'` |
| onOk | 确认回调 | `() => void \| Promise<void>` | - |
| onCancel | 取消回调 | `() => void` | - |
| mask | 是否显示遮罩 | `boolean` | `true` |
| icon | 自定义图标 | `LucideIcon` | - |
