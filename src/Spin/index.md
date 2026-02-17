---
nav:
  title: Components
  order: 1
group:
  title: Feedback
  order: 4
title: Spin
order: 3
toc: content
---

# Spin

Loading indicator for pages and sections, supporting both standalone and wrapper modes.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Tip Text

<code src="./en/demos/tip.tsx" id="tip-en"></code>

## Wrapper Mode

<code src="./en/demos/wrapper.tsx" id="wrapper-en"></code>

## Delayed Display

<code src="./en/demos/delay.tsx" id="delay-en"></code>

## Custom Indicator

<code src="./en/demos/custom.tsx" id="custom-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| spinning | Whether in loading state | `boolean` | `true` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| tip | Tip text | `ReactNode` | - |
| delay | Delay display (ms), prevents flashing | `number` | - |
| indicator | Custom indicator | `ReactNode` | - |
| children | Wrapped content (wrapper mode) | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
