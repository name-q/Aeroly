---
title: Drawer
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Drawer

A floating panel that slides in from the edge of the screen, used for temporary content such as forms and details.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Placement

<code src="./en/demos/placement.tsx"></code>

## Footer Actions

<code src="./en/demos/footer.tsx"></code>

## Custom Size

<code src="./en/demos/size.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| open | Whether the drawer is visible | `boolean` | - |
| onOpenChange | Callback when visibility changes | `(open: boolean) => void` | - |
| title | Title | `ReactNode` | - |
| children | Content | `ReactNode` | - |
| placement | Slide-in direction | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |
| width | Width (effective for left/right placement) | `number \| string` | `378` |
| height | Height (effective for top/bottom placement) | `number \| string` | `378` |
| footer | Footer action area | `ReactNode` | - |
| mask | Whether to show the mask | `boolean` | `true` |
| maskClosable | Whether clicking the mask closes the drawer | `boolean` | `true` |
| keyboard | Whether pressing Esc closes the drawer | `boolean` | `true` |
| closeIcon | Custom close icon | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |
