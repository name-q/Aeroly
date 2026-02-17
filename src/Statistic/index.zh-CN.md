---
title: Statistic 统计数值
group:
  title: 数据展示
  order: 4
nav:
  title: 组件
  path: /components
toc: content
---

# Statistic 统计数值

突出展示某个或某组数字、带描述的统计类数据。

## 基础用法

<code src="./demos/basic.tsx"></code>

## 前缀与后缀

<code src="./demos/prefix.tsx"></code>

## 数值动画

<code src="./demos/animated.tsx"></code>

## 加载状态

<code src="./demos/loading.tsx"></code>

## 倒计时

<code src="./demos/countdown.tsx"></code>

## API

### Statistic

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| value | 数值 | `number \| string` | - |
| precision | 小数精度 | `number` | - |
| prefix | 前缀（图标或文字） | `ReactNode` | - |
| suffix | 后缀（单位等） | `ReactNode` | - |
| groupSeparator | 千分位分隔符 | `string` | `','` |
| decimalSeparator | 小数点字符 | `string` | `'.'` |
| formatter | 自定义格式化 | `(value: number \| string) => ReactNode` | - |
| animated | 是否开启数值滚动动画 | `boolean` | `false` |
| animationDuration | 动画时长（ms） | `number` | `800` |
| status | 状态色 | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| loading | 是否加载中（骨架屏） | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Statistic.Countdown

| 属性 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 标题 | `ReactNode` | - |
| value | 目标时间戳（ms） | `number` | - |
| format | 格式化模板 | `string` | `'HH:mm:ss'` |
| prefix | 前缀 | `ReactNode` | - |
| suffix | 后缀 | `ReactNode` | - |
| status | 状态色 | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| onFinish | 倒计时结束回调 | `() => void` | - |
| onChange | 变化回调（每秒） | `(remaining: number) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### format 模板

| 占位符 | 说明 |
|--------|------|
| `D` | 天 |
| `DD` | 天（补零） |
| `H` | 小时 |
| `HH` | 小时（补零） |
| `m` | 分钟 |
| `mm` | 分钟（补零） |
| `s` | 秒 |
| `ss` | 秒（补零） |
