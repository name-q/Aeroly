---
title: Button
order: 1
group:
  title: General
  order: 1
nav:
  title: Components
  path: /components
toc: content
---

# Button

Interactive element for triggering actions. Provides three styles: pill, primary, and text.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Icon Button

<code src="./en/demos/icon.tsx" id="icon-en"></code>

## Sizes

<code src="./en/demos/size.tsx" id="size-en"></code>

## Loading & Disabled

<code src="./en/demos/loading.tsx" id="loading-en"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| type | Button type | `'primary' \| 'default' \| 'text'` | `'default'` |
| size | Button size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| pill | Whether to keep pill-shaped border radius; follows global border radius by default | `boolean` | `false` |
| disabled | Whether the button is disabled | `boolean` | `false` |
| loading | Whether the button is in loading state | `boolean` | `false` |
| icon | Icon (Lucide icon component) | `LucideIcon` | - |
| onClick | Click event handler | `(e: MouseEvent) => void` | - |
| htmlType | Native button type | `'button' \| 'submit' \| 'reset'` | `'button'` |
| children | Button content | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
