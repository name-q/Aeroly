---
title: Modal
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Modal

A modal dialog that opens a floating layer on the current page for confirmations, forms, prompts, and other interactions.

## Basic Usage

<code src="./en/demos/basic.tsx"></code>

## Async Close

<code src="./en/demos/async.tsx"></code>

## Custom Footer

<code src="./en/demos/footer.tsx"></code>

## Centered

<code src="./en/demos/centered.tsx"></code>

## Imperative API

<code src="./en/demos/confirm.tsx"></code>

## API

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| open | Whether the modal is visible | `boolean` | - |
| onOpenChange | Callback when visibility changes | `(open: boolean) => void` | - |
| title | Title | `ReactNode` | - |
| children | Content | `ReactNode` | - |
| footer | Footer action area, pass `null` to hide | `ReactNode \| null` | Default OK/Cancel buttons |
| okText | OK button text | `ReactNode` | `'OK'` |
| cancelText | Cancel button text | `ReactNode` | `'Cancel'` |
| onOk | OK callback, button shows loading automatically when returning a Promise | `() => void \| Promise<void>` | - |
| onCancel | Cancel callback | `() => void` | - |
| width | Width | `number \| string` | `420` |
| mask | Whether to show the mask | `boolean` | `true` |
| maskClosable | Whether clicking the mask closes the modal | `boolean` | `true` |
| keyboard | Whether pressing Esc closes the modal | `boolean` | `true` |
| closeIcon | Custom close icon | `ReactNode` | - |
| centered | Whether to vertically center the modal | `boolean` | `false` |
| className | Custom class name | `string` | - |
| style | Custom style | `CSSProperties` | - |

### Imperative Methods

| Method | Description |
|--------|-------------|
| Modal.confirm(config) | Confirmation dialog (with cancel button) |
| Modal.info(config) | Info prompt |
| Modal.success(config) | Success prompt |
| Modal.warning(config) | Warning prompt |
| Modal.error(config) | Error prompt |

### ConfirmConfig

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| title | Title | `ReactNode` | - |
| content | Content | `ReactNode` | - |
| okText | OK button text | `ReactNode` | `'OK'` |
| cancelText | Cancel button text | `ReactNode` | `'Cancel'` |
| onOk | OK callback | `() => void \| Promise<void>` | - |
| onCancel | Cancel callback | `() => void` | - |
| mask | Whether to show the mask | `boolean` | `true` |
| icon | Custom icon | `LucideIcon` | - |
