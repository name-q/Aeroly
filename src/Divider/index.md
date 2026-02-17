---
title: Divider
group:
  title: Layout
  order: 2
nav:
  title: Components
  path: /components
toc: content
---

# Divider

A divider line to separate content. Supports horizontal and vertical directions; horizontal dividers can embed text.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## With Text

<code src="./en/demos/text.tsx"></code>

## Vertical Divider

<code src="./en/demos/vertical.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| direction | Divider direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| type | Line style | `'solid' \| 'dashed' \| 'fade'` | `'solid'` |
| orientation | Text position (horizontal only) | `'left' \| 'center' \| 'right'` | `'center'` |
| children | Embedded text | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
