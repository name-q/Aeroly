---
title: Masonry
group:
  title: Layout
  order: 2
nav:
  title: Components
  path: /components
toc: content
---

# Masonry

A masonry layout component based on CSS multi-column layout, suitable for image walls, card streams, and other variable-height content arrangements. Supports fixed and responsive column counts, with gap values reusing Grid's semantic tokens.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Custom Columns

<code src="./en/demos/columns.tsx"></code>

## Responsive Columns

<code src="./en/demos/responsive.tsx"></code>

## Custom Content

<code src="./en/demos/custom.tsx"></code>

## API

| Property | Description | Type | Default |
|------|------|------|--------|
| columns | Number of columns, supports responsive object | `number \| Partial<Record<Breakpoint, number>>` | `3` |
| gutter | Gap size, number in px, supports semantic tokens | `number \| 'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` |
| children | Child elements | `ReactNode` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Breakpoint Responsive Breakpoints

| Breakpoint | Width |
|------|------|
| `xs` | >=0px |
| `sm` | >=576px |
| `md` | >=768px |
| `lg` | >=992px |
| `xl` | >=1200px |

Responsive column fallback logic: `{ xs: 1, md: 3 }` at the `sm` breakpoint takes the `xs` value of `1` (falls back to the nearest defined breakpoint below).

### Gutter Semantic Tokens

| Token | Value |
|-------|-----|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
