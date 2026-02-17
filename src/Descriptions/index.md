---
title: Descriptions
group:
  title: Data Display
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Descriptions

Display multiple read-only fields in groups, commonly used on detail pages.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Bordered

<code src="./en/demos/bordered.tsx"></code>

## With Actions

<code src="./en/demos/extra.tsx"></code>

## Vertical Layout

<code src="./en/demos/vertical.tsx"></code>

## Size

<code src="./en/demos/size.tsx"></code>

## API

### Descriptions

| Property | Description | Type | Default |
|------|------|------|--------|
| title | Title | `ReactNode` | - |
| extra | Extra action area (top right) | `ReactNode` | - |
| items | Description item list | `DescriptionsItem[]` | - |
| column | Number of columns per row | `number` | `3` |
| layout | Layout direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| bordered | Whether to show border | `boolean` | `false` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| labelAlign | Label alignment | `'left' \| 'right'` | `'left'` |
| colon | Whether to show colon | `boolean` | `true` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### DescriptionsItem

| Property | Description | Type | Default |
|------|------|------|--------|
| label | Label name | `ReactNode` | - |
| children | Content | `ReactNode` | - |
| span | Column span | `number` | `1` |
