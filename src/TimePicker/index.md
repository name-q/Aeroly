---
title: TimePicker 时间选择框
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# TimePicker 时间选择框

用于选择时间，毛玻璃下拉面板搭配滚动列，操作直观。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 隐藏秒

<code src="./demos/hideSecond.tsx"></code>

## 步长

<code src="./demos/step.tsx"></code>

## 尺寸

<code src="./demos/size.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控，格式 `HH:mm:ss` 或 `HH:mm`） | `string` | - |
| defaultValue | 默认值（非受控） | `string` | - |
| onChange | 变化回调 | `(value: string) => void` | - |
| placeholder | 占位文案 | `string` | `'请选择时间'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `true` |
| showSecond | 是否显示秒列 | `boolean` | `true` |
| hourStep | 小时步长 | `number` | `1` |
| minuteStep | 分钟步长 | `number` | `1` |
| secondStep | 秒步长 | `number` | `1` |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| status | 状态 | `'error' \| 'warning'` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
