---
title: Message
group:
  title: Feedback
  order: 5
nav:
  title: Components
  path: /components
toc: content
---

# Message

Global message notifications for operation feedback. Displayed at the top center and auto-dismissed, providing lightweight prompts without interrupting user workflow.

## Basic Usage

<code src="./en/demos/basic.tsx" id="basic-en"></code>

## Different Types

<code src="./en/demos/types.tsx" id="types-en"></code>

## Custom Duration

<code src="./en/demos/duration.tsx" id="duration-en"></code>

## Custom Icon

<code src="./en/demos/custom.tsx" id="custom-en"></code>

## API

Imperative API -- use methods on the `message` object directly:

```ts
import { message } from 'aeroly';

message.info('Info message');
message.success('Success message');
message.warning('Warning message');
message.error('Error message');
```

### Shortcut Methods

| Method | Description | Type |
|--------|-------------|------|
| message.info | Info message | `(content: ReactNode, duration?: number) => void` |
| message.success | Success message | `(content: ReactNode, duration?: number) => void` |
| message.warning | Warning message | `(content: ReactNode, duration?: number) => void` |
| message.error | Error message | `(content: ReactNode, duration?: number) => void` |
| message.open | Custom configuration | `(config: MessageConfig) => void` |

### MessageConfig

| Property | Description | Type | Default |
|----------|-------------|------|---------|
| content | Message content | `ReactNode` | - |
| type | Message type | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` |
| duration | Auto-close delay (ms), set to 0 to disable auto-close | `number` | `3000` |
| icon | Custom icon | `LucideIcon` | - |
| onClose | Callback when closed | `() => void` | - |
