---
title: Statistic
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Statistic

Display statistic numbers or data with descriptions prominently.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Prefix & Suffix

<code src="./en/demos/prefix.tsx" id="prefix-en"></code>

## Animated Value

<code src="./en/demos/animated.tsx" id="animated-en"></code>

## Loading State

<code src="./en/demos/loading.tsx" id="loading-en"></code>

## Countdown

<code src="./en/demos/countdown.tsx" id="countdown-en"></code>

## API

### Statistic

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| title | Title | `ReactNode` | - |
| value | Value | `number \| string` | - |
| precision | Decimal precision | `number` | - |
| prefix | Prefix (icon or text) | `ReactNode` | - |
| suffix | Suffix (unit, etc.) | `ReactNode` | - |
| groupSeparator | Thousands separator | `string` | `','` |
| decimalSeparator | Decimal point character | `string` | `'.'` |
| formatter | Custom formatter | `(value: number \| string) => ReactNode` | - |
| animated | Enable value scroll animation | `boolean` | `false` |
| animationDuration | Animation duration (ms) | `number` | `800` |
| status | Status color | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| loading | Loading state (skeleton) | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Statistic.Countdown

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| title | Title | `ReactNode` | - |
| value | Target timestamp (ms) | `number` | - |
| format | Format template | `string` | `'HH:mm:ss'` |
| prefix | Prefix | `ReactNode` | - |
| suffix | Suffix | `ReactNode` | - |
| status | Status color | `'default' \| 'success' \| 'warning' \| 'error'` | `'default'` |
| onFinish | Countdown finish callback | `() => void` | - |
| onChange | Change callback (every second) | `(remaining: number) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Format Template

| Placeholder | Description |
|-------------|-------------|
| `D` | Days |
| `DD` | Days (zero-padded) |
| `H` | Hours |
| `HH` | Hours (zero-padded) |
| `m` | Minutes |
| `mm` | Minutes (zero-padded) |
| `s` | Seconds |
| `ss` | Seconds (zero-padded) |
