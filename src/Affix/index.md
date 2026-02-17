---
nav:
  title: Components
  order: 1
group:
  title: Navigation
  order: 2
toc: content
---

# Affix

Pin an element to a fixed position in the viewport. Implemented with `position: sticky`, zero JS positioning calculations.

Automatically detects the nearest scrollable ancestor container. Multiple instances do not interfere with each other.

## Stick to Top

<code src="./en/demos/basic.tsx"></code>

## Stick to Bottom

<code src="./en/demos/bottom.tsx"></code>

## Multiple Instances & Containers

<code src="./en/demos/multiple.tsx"></code>

## API

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| offsetTop | `number` | `0` | Distance from top to fix (px) |
| offsetBottom | `number` | - | Distance from bottom to fix (px). Enables stick-to-bottom mode when set, mutually exclusive with offsetTop |
| onChange | `(affixed: boolean) => void` | - | Affix state change callback |
| target | `() => HTMLElement \| Window` | Auto-detect | Custom scroll container, defaults to finding the nearest scrollable ancestor |
| className | `string` | - | Custom class name |
| style | `React.CSSProperties` | - | Custom style |
