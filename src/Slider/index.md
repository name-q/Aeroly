---
title: Slider 滑动输入条
group:
  title: 数据录入
  order: 3
nav:
  title: 组件
  path: /components
toc: content
---

# Slider 滑动输入条

通过拖动滑块在一个区间内选择值，支持单值和范围选择。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 受控模式

<code src="./demos/controlled.tsx"></code>

## 范围选择

<code src="./demos/range.tsx"></code>

## 步长

<code src="./demos/step.tsx"></code>

## 刻度标记

<code src="./demos/marks.tsx"></code>

## 提示气泡

<code src="./demos/tooltip.tsx"></code>

## 动画

<code src="./demos/animated.tsx"></code>

## 垂直模式

<code src="./demos/vertical.tsx"></code>

## 禁用

<code src="./demos/disabled.tsx"></code>

## API

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `number \| [number, number]` | - |
| defaultValue | 默认值（非受控） | `number \| [number, number]` | `0` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长，设为 `null` 时只能选择 marks 的值 | `number \| null` | `1` |
| marks | 刻度标记 | `Record<number, ReactNode>` | - |
| disabled | 是否禁用（灰显 + 不可操作） | `boolean` | `false` |
| readOnly | 是否只读（正常样式但不可操作） | `boolean` | `false` |
| range | 是否为范围选择 | `boolean` | `false` |
| vertical | 是否垂直 | `boolean` | `false` |
| tooltipVisible | 是否始终显示 tooltip | `boolean` | - |
| tipFormatter | 自定义 tooltip 格式化，设为 `null` 隐藏 | `((value: number) => ReactNode) \| null` | `(v) => v` |
| animated | 是否开启 track 光泽流动动画 | `boolean` | `true` |
| onChange | 变化回调 | `(value: number \| [number, number]) => void` | - |
| onChangeComplete | 拖拽结束回调 | `(value: number \| [number, number]) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
