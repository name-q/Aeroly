---
title: Flex
group:
  title: Layout
  order: 2
nav:
  title: Components
  path: /components
toc: content
---

# Flex

Intent-driven flex layout component. Defaults to horizontal direction with vertical centering. Uses semantic props instead of hand-written flex CSS, making common layouts a one-liner for both AI and humans.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Vertical Direction

<code src="./en/demos/vertical.tsx"></code>

## Main Axis Distribution

<code src="./en/demos/justify.tsx"></code>

## Centering

<code src="./en/demos/center.tsx"></code>

## Wrapping

<code src="./en/demos/wrap.tsx"></code>

## Flex Ratio

<code src="./en/demos/flex.tsx"></code>

## Auto Spacing

<code src="./en/demos/auto.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| direction | Main axis direction | `'row' \| 'column'` | `'row'` |
| justify | Main axis distribution | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | - |
| align | Cross axis alignment | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'` | `'center'` |
| gap | Gap size, number in px | `number \| 'xs' \| 'sm' \| 'md' \| 'lg'` | - |
| wrap | Whether to wrap | `boolean` | `false` |
| center | Horizontal + vertical centering | `boolean` | `false` |
| full | Fill parent container width | `boolean` | `false` |
| inline | Inline flex box | `boolean` | `false` |
| flex | Flex control: number for flex ratio, `"100px"` for fixed width, also supports full syntax like `"0 0 100px"` | `number \| string` | - |
| auto | Margin auto abstraction | `boolean \| 'left' \| 'right' \| 'top' \| 'bottom'` | - |
| component | HTML tag to render | `React.ElementType` | `'div'` |
| children | Child elements | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### gap Semantic Tokens

| Token | Value |
|-------|-------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
