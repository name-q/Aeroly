---
title: Steps
group:
  title: Navigation
  order: 4
nav:
  title: Components
  path: /components
toc: content
---

# Steps

Guides users through a workflow step by step, clearly showing the current step and overall progress.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Small Size

<code src="./en/demos/small.tsx" id="small-en"></code>

## Custom Icons

<code src="./en/demos/icon.tsx" id="icon-en"></code>

## Clickable

<code src="./en/demos/clickable.tsx" id="clickable-en"></code>

## Vertical Label Placement

<code src="./en/demos/label-vertical.tsx" id="label-vertical-en"></code>

## Vertical Steps

<code src="./en/demos/vertical.tsx" id="vertical-en"></code>

## Error Status

<code src="./en/demos/error.tsx" id="error-en"></code>

## API

### Steps

| Property | Description | Type | Default |
|------|------|------|--------|
| items | Step data | `StepItem[]` | - |
| current | Current step (starting from 1) | `number` | `1` |
| status | Status of the current step | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| direction | Layout direction | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | Size | `'small' \| 'medium' \| 'large'` | `'medium'` |
| labelPlacement | Label position (horizontal direction only) | `'horizontal' \| 'vertical'` | `'horizontal'` |
| clickable | Whether steps are clickable | `boolean` | `false` |
| onChange | Click step callback | `(current: number) => void` | - |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### StepItem

| Property | Description | Type | Default |
|------|------|------|--------|
| title | Title | `ReactNode` | - |
| description | Description | `ReactNode` | - |
| icon | Custom icon (Lucide icon component) | `LucideIcon` | - |
| status | Individually specified status, takes priority over current inference | `'wait' \| 'process' \| 'finish' \| 'error'` | - |
| disabled | Whether click is disabled | `boolean` | `false` |
