---
nav:
  title: 组件
  order: 1
group:
  title: 数据录入
  order: 4
toc: content
---

# Upload 上传

文件上传组件，支持点击、拖拽、图片预览、进度展示、AI 处理钩子。

## 基础用法

<code src="./demos/basic.tsx" description="点击按钮选择文件上传，带进度条和状态反馈。"></code>

## 拖拽上传

<code src="./demos/drag.tsx" description="设置 drag 开启拖拽区域，支持拖入文件上传。"></code>

## 图片模式

<code src="./demos/picture.tsx" description="listType='picture' 展示缩略图预览。"></code>

## 数量与大小限制

<code src="./demos/limit.tsx" description="maxCount 限制文件数量，maxSize 限制单文件大小。达到上限后触发区域自动隐藏。"></code>

## 受控模式

<code src="./demos/controlled.tsx" description="通过 fileList + onChange 完全控制文件列表，支持预设文件和错误重试。"></code>

## AI 处理

<code src="./demos/ai.tsx" description="通过 onProcess 钩子在上传前对文件进行 AI 分析，结果写入 aiMeta 字段。"></code>

## 联调实战

<code src="./demos/real.tsx"></code>

## API

### UploadProps

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fileList | `UploadFile[]` | - | 文件列表（受控） |
| defaultFileList | `UploadFile[]` | - | 默认文件列表（非受控） |
| onChange | `(fileList: UploadFile[]) => void` | - | 文件列表变化回调 |
| customRequest | `(options: CustomRequestOptions) => { abort } \| void` | - | 自定义上传实现 |
| accept | `string` | - | 接受的文件类型 |
| multiple | `boolean` | `false` | 是否多选 |
| maxCount | `number` | - | 最大文件数量 |
| maxSize | `number` | - | 单文件大小限制（字节） |
| beforeUpload | `(file, fileList) => boolean \| Promise<boolean>` | - | 上传前校验 |
| onRemove | `(file: UploadFile) => boolean \| Promise \| void` | - | 移除回调 |
| onPreview | `(file: UploadFile) => void` | - | 点击文件回调 |
| drag | `boolean` | `false` | 拖拽模式 |
| listType | `'text' \| 'picture'` | `'text'` | 展示方式 |
| disabled | `boolean` | `false` | 禁用 |
| children | `ReactNode` | - | 自定义触发区域 |
| tip | `ReactNode` | - | 提示文字 |
| onProcess | `(file, originFile) => Promise<Partial<UploadFile>> \| void` | - | AI 处理钩子 |

### UploadFile

| 属性 | 类型 | 说明 |
|------|------|------|
| uid | `string` | 唯一标识 |
| name | `string` | 文件名 |
| size | `number` | 文件大小（字节） |
| type | `string` | MIME 类型 |
| status | `'pending' \| 'uploading' \| 'success' \| 'error'` | 上传状态 |
| percent | `number` | 上传进度 0-100 |
| thumbUrl | `string` | 缩略图地址 |
| url | `string` | 远程地址 |
| error | `string` | 错误信息 |
| originFile | `File` | 原始 File 对象 |
| aiMeta | `Record<string, any>` | AI 分析结果 |

### CustomRequestOptions

| 属性 | 类型 | 说明 |
|------|------|------|
| file | `File` | 原始文件 |
| onProgress | `(percent: number) => void` | 进度回调 |
| onSuccess | `(response?: any) => void` | 成功回调 |
| onError | `(error: Error) => void` | 失败回调 |
