---
nav:
  title: Components
  order: 2
group:
  title: 数据展示
  order: 4
toc: content
---

# VideoPlayer 视频播放器

支持弹幕、清晰度切换的视频播放器。

## Basic Usage

## 基础用法

<code src="./demos/basic.tsx"></code>

## 弹幕

<code src="./demos/danmaku.tsx"></code>

## 清晰度切换

<code src="./demos/quality.tsx"></code>

## API

### VideoPlayer

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| src | 视频地址 | `string` | - |
| sources | 多清晰度源 | `VideoSource[]` | - |
| poster | 封面图 | `string` | - |
| width | 宽度 | `number \| string` | - |
| height | 高度 | `number \| string` | - |
| autoPlay | 自动播放 | `boolean` | `false` |
| loop | 循环播放 | `boolean` | `false` |
| muted | 默认静音 | `boolean` | `false` |
| fit | 适应方式 | `'contain' \| 'cover' \| 'fill'` | `'contain'` |
| borderRadius | 圆角 | `number \| string` | - |
| danmaku | 弹幕数据 | `DanmakuItem[]` | - |
| defaultDanmakuVisible | 默认显示弹幕 | `boolean` | `true` |
| onDanmakuLike | 弹幕点赞回调 | `(item: DanmakuItem) => void` | - |
| onPlay | 播放回调 | `() => void` | - |
| onPause | 暂停回调 | `() => void` | - |
| onEnded | 播放结束回调 | `() => void` | - |
| onError | 错误回调 | `(e) => void` | - |
| onTimeUpdate | 时间更新回调 | `(currentTime, duration) => void` | - |
| onQualityChange | 清晰度切换回调 | `(source: VideoSource) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### VideoSource

| Property | Description | Type |
| --- | --- | --- |
| label | 清晰度标签 | `string` |
| src | 视频地址 | `string` |
| default | 是否默认 | `boolean` |

### DanmakuItem

| Property | Description | Type |
| --- | --- | --- |
| id | 唯一标识 | `string \| number` |
| time | 出现时间（秒） | `number` |
| text | 文字内容 | `string` |
| color | 颜色 | `string` |
| image | 图片表情 URL | `string` |
| likes | 点赞数 | `number` |

### Ref Methods

| Method | Description | Type |
| --- | --- | --- |
| play | 播放 | `() => void` |
| pause | 暂停 | `() => void` |
| seek | 跳转到指定时间 | `(time: number) => void` |
| sendDanmaku | 追加弹幕 | `(item: DanmakuItem) => void` |
| getVideoElement | 获取 video 元素 | `() => HTMLVideoElement \| null` |
