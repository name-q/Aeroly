import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload as UploadIcon, X, Plus, File as FileIcon, Image, FileText, FileAudio, FileVideo, FileArchive, Loader, RotateCcw, Sparkles, Eye } from 'lucide-react';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import type { LucideIcon } from 'lucide-react';
import { useLocale } from '../ConfigProvider/useConfig';
import './index.less';

export type UploadStatus = 'pending' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  /** Unique identifier */
  uid: string;
  /** 文件名 */
  name: string;
  /** 文件大小（字节） */
  size?: number;
  /** MIME Type */
  type?: string;
  /** 上传Status */
  status: UploadStatus;
  /** 上传进度 0-100 */
  percent?: number;
  /** 预览地址（图片） */
  thumbUrl?: string;
  /** 远程地址 */
  url?: string;
  /** Errors信息 */
  error?: string;
  /** 原始 File 对象 */
  originFile?: File;
  /** AI 分析结果（预留） */
  aiMeta?: Record<string, any>;
}

export interface UploadProps {
  /** 文件列表（Controlled） */
  fileList?: UploadFile[];
  /** Default file list（uncontrolled) */
  defaultFileList?: UploadFile[];
  /** File list change callback */
  onChange?: (fileList: UploadFile[]) => void;
  /** Custom upload implementation，返回 abort 函数 */
  customRequest?: (options: CustomRequestOptions) => { abort: () => void } | void;
  /** Accepted file types（同 input accept） */
  accept?: string;
  /** Whether to support multiple */
  multiple?: boolean;
  /** Max file count量 */
  maxCount?: number;
  /** 单文件大小限制（字节） */
  maxSize?: number;
  /** 上传前Validation，返回 false 或 Promise.reject 阻止上传 */
  beforeUpload?: (file: File, fileList: File[]) => boolean | Promise<boolean>;
  /** 移除文件Callback，返回 false 阻止移除 */
  onRemove?: (file: UploadFile) => boolean | Promise<boolean> | void;
  /** 点击文件Callback */
  onPreview?: (file: UploadFile) => void;
  /** 拖拽Mode */
  drag?: boolean;
  /** 展示方式 */
  listType?: 'text' | 'picture' | 'picture-card';
  /** Whether disabled */
  disabled?: boolean;
  /** 拖拽区域CustomContent */
  children?: React.ReactNode;
  /** Tooltip text */
  tip?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** AI 处理钩子：文件Select后触发，可用于分析/标注/转换 */
  onProcess?: (file: UploadFile, originFile: File) => Promise<Partial<UploadFile>> | void;
}

export interface CustomRequestOptions {
  file: File;
  onProgress: (percent: number) => void;
  onSuccess: (response?: any) => void;
  onError: (error: Error) => void;
}

let uid = 0;
const genUid = () => `aero-upload-${++uid}`;

const FILE_ICONS: Record<string, LucideIcon> = {
  image: Image,
  audio: FileAudio,
  video: FileVideo,
  text: FileText,
  application: FileArchive,
};

function getFileIcon(type?: string): LucideIcon {
  if (!type) return FileIcon;
  const category = type.split('/')[0];
  return FILE_ICONS[category] || FileIcon;
}

function formatSize(bytes?: number): string {
  if (bytes == null) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageType(type?: string): boolean {
  return !!type && type.startsWith('image/');
}

function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

const Upload: React.FC<UploadProps> = ({
  fileList: controlledFileList,
  defaultFileList,
  onChange,
  customRequest,
  accept,
  multiple = false,
  maxCount,
  maxSize,
  beforeUpload,
  onRemove,
  onPreview,
  drag = false,
  listType = 'text',
  disabled = false,
  children,
  tip,
  className,
  style,
  onProcess,
}) => {
  const localeUpload = useLocale('Upload');
  const isControlled = controlledFileList !== undefined && Array.isArray(controlledFileList);
  const [internalFileList, setInternalFileList] = useState<UploadFile[]>(defaultFileList || []);
  const fileList = isControlled ? controlledFileList : internalFileList;

  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const abortMap = useRef<Map<string, () => void>>(new Map());
  const fileListRef = useRef(fileList);
  fileListRef.current = fileList;

  // 同步更新文件列表
  const updateFileList = useCallback(
    (updater: (prev: UploadFile[]) => UploadFile[]) => {
      if (isControlled) {
        const next = updater(fileListRef.current);
        fileListRef.current = next; // Update immediately to prevent loss during consecutive calls
        onChange?.(next);
      } else {
        setInternalFileList((prev) => {
          const next = updater(prev);
          onChange?.(next);
          return next;
        });
      }
    },
    [isControlled, onChange],
  );

  // 更新单个文件
  const updateFile = useCallback(
    (uid: string, patch: Partial<UploadFile>) => {
      updateFileList((prev) =>
        prev.map((f) => (f.uid === uid ? { ...f, ...patch } : f)),
      );
    },
    [updateFileList],
  );

  // 上传单个文件
  const doUpload = useCallback(
    (item: UploadFile, file: File) => {
      if (!customRequest) return;

      const result = customRequest({
        file,
        onProgress: (percent) => {
          updateFile(item.uid, { percent, status: 'uploading' });
        },
        onSuccess: (response) => {
          abortMap.current.delete(item.uid);
          updateFile(item.uid, {
            status: 'success',
            percent: 100,
            url: response?.url,
          });
        },
        onError: (error) => {
          abortMap.current.delete(item.uid);
          updateFile(item.uid, {
            status: 'error',
            error: error.message,
          });
        },
      });

      if (result?.abort) {
        abortMap.current.set(item.uid, result.abort);
      }
    },
    [customRequest, updateFile],
  );

  // 处理文件Selection
  const handleFiles = useCallback(
    async (files: File[]) => {
      if (disabled) return;

      // maxCount 限制（只计算有效文件，超出部分直接丢弃）
      let incoming = files;
      if (maxCount) {
        const validCount = fileListRef.current.filter((f) => f.status !== 'error').length;
        const remaining = maxCount - validCount;
        incoming = remaining <= 0 ? [] : files.slice(0, remaining);
      }

      const newUploadFiles: UploadFile[] = [];
      const errorFiles: UploadFile[] = [];

      for (const file of incoming) {
        // maxSize Validation — 超限文件标记为 error 并Hint
        if (maxSize && file.size > maxSize) {
          errorFiles.push({
            uid: genUid(),
            name: file.name,
            size: file.size,
            type: file.type,
            status: 'error',
            percent: 0,
            error: localeUpload.sizeExceed.replace('{maxSize}', formatSize(maxSize)),
          });
          continue;
        }

        // beforeUpload Validation
        if (beforeUpload) {
          try {
            const result = beforeUpload(file, incoming);
            if (result === false) continue;
            if (result instanceof Promise) {
              const ok = await result;
              if (!ok) continue;
            }
          } catch {
            continue;
          }
        }

        const uploadItem: UploadFile = {
          uid: genUid(),
          name: file.name,
          size: file.size,
          type: file.type,
          status: customRequest ? 'uploading' : 'pending',
          percent: 0,
          originFile: file,
        };

        // 图片预览缩略图
        if (isImageType(file.type) && (listType === 'picture' || listType === 'picture-card')) {
          uploadItem.thumbUrl = await readAsDataURL(file);
        }

        // AI 处理钩子
        if (onProcess) {
          try {
            uploadItem.status = 'uploading';
            const aiResult = await onProcess(uploadItem, file);
            if (aiResult) Object.assign(uploadItem, aiResult);
          } catch {
            // AI 处理失败不阻塞上传
          }
        }

        newUploadFiles.push(uploadItem);
      }

      // 正常文件在前，校验失败的在后
      const allFiles = [...newUploadFiles, ...errorFiles];
      if (allFiles.length === 0) return;

      updateFileList((prev) => [...prev, ...allFiles]);

      // 只对非 error 的文件触发上传
      if (customRequest) {
        newUploadFiles.forEach((uf) => {
          if (uf.originFile) doUpload(uf, uf.originFile);
        });
      }
    },
    [disabled, maxCount, maxSize, beforeUpload, customRequest, listType, onProcess, updateFileList, doUpload],
  );

  // 点击触发
  const handleTriggerClick = () => {
    if (disabled) return;
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
    // Reset input 以允许重复Selection同一文件
    e.target.value = '';
  };

  // 拖拽
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // 移除文件
  const handleRemove = async (file: UploadFile) => {
    // 校验失败的文件（无 originFile）直接移除，不触发 onRemove
    if (file.originFile && onRemove) {
      const result = onRemove(file);
      if (result === false) return;
      if (result instanceof Promise) {
        try {
          const ok = await result;
          if (ok === false) return;
        } catch {
          return;
        }
      }
    }
    // 中止上传
    const abort = abortMap.current.get(file.uid);
    if (abort) {
      abort();
      abortMap.current.delete(file.uid);
    }
    updateFileList((prev) => prev.filter((f) => f.uid !== file.uid));
  };

  // 重试
  const handleRetry = (file: UploadFile) => {
    if (!file.originFile || !customRequest) return;
    updateFile(file.uid, { status: 'uploading', percent: 0, error: undefined });
    doUpload(file, file.originFile);
  };

  // 清理 abort
  useEffect(() => {
    return () => {
      abortMap.current.forEach((abort) => abort());
      abortMap.current.clear();
    };
  }, []);

  const rootCls = [
    'aero-upload',
    `aero-upload--${listType}`,
    drag ? 'aero-upload--drag' : '',
    disabled ? 'aero-upload--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const hasCustomTrigger = !!children;

  const triggerCls = [
    'aero-upload-trigger',
    drag ? 'aero-upload-trigger--drag' : '',
    dragOver ? 'aero-upload-trigger--dragover' : '',
    hasCustomTrigger ? 'aero-upload-trigger--custom' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const validFileCount = fileList.filter((f) => f.status !== 'error').length;
  const reachedMax = maxCount ? validFileCount >= maxCount : false;

  const isPictureCard = listType === 'picture-card';

  return (
    <div className={rootCls} style={style}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="aero-upload-input"
      />

      {isPictureCard ? (
        // picture-card Mode：卡片和触发按钮在同一行
        <div className="aero-upload-card-list">
          {fileList.map((file) => {
            const isSuccess = file.status === 'success';
            const isUploading = file.status === 'uploading';
            const isError = file.status === 'error';
            const thumbSrc = file.thumbUrl || (isSuccess && file.url) || undefined;

            const tipContent = isError && file.error
              ? <>{file.name}{file.size != null && ` (${formatSize(file.size)})`}<br />{file.error}</>
              : file.name;

            return (
              <Tooltip key={file.uid} title={tipContent} placement="top">
                <div
                  className={[
                    'aero-upload-card',
                    isError ? 'aero-upload-card--error' : '',
                    isSuccess ? 'aero-upload-card--success' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                {thumbSrc ? (
                  <img src={thumbSrc} alt={file.name} className="aero-upload-card__img" />
                ) : (
                  <div className="aero-upload-card__placeholder">
                    <Icon icon={isError ? X : getFileIcon(file.type)} size={24} />
                  </div>
                )}

                {/* Upload progress overlay */}
                {isUploading && (
                  <div className="aero-upload-card__mask">
                    <Icon icon={Loader} size={20} spin />
                    <span>{Math.round(file.percent || 0)}%</span>
                  </div>
                )}

                {/* Hover action overlay */}
                {!isUploading && (
                  <div className="aero-upload-card__actions">
                    {isSuccess && onPreview && (
                      <span
                        className="aero-upload-card__action"
                        onClick={() => onPreview(file)}
                      >
                        <Icon icon={Eye} size={16} />
                      </span>
                    )}
                    {isError && file.originFile && (
                      <span
                        className="aero-upload-card__action"
                        onClick={() => handleRetry(file)}
                      >
                        <Icon icon={RotateCcw} size={16} />
                      </span>
                    )}
                    <span
                      className="aero-upload-card__action aero-upload-card__action--delete"
                      onClick={() => handleRemove(file)}
                    >
                      <Icon icon={X} size={16} />
                    </span>
                  </div>
                )}
              </div>
              </Tooltip>
            );
          })}

          {!reachedMax && (
            <div className="aero-upload-card aero-upload-card--trigger" onClick={handleTriggerClick}>
              <Icon icon={Plus} size={24} />
            </div>
          )}
        </div>
      ) : (
        <>
          {!reachedMax && (
            <div
              className={triggerCls}
              onClick={handleTriggerClick}
              onDragOver={drag ? handleDragOver : undefined}
              onDragLeave={drag ? handleDragLeave : undefined}
              onDrop={drag ? handleDrop : undefined}
            >
              {children || (
                <div className="aero-upload-trigger__default">
                  <Icon icon={UploadIcon} size={drag ? 32 : 16} />
                  <span>{drag ? localeUpload.dragText : localeUpload.uploadText}</span>
                </div>
              )}
            </div>
          )}

          {fileList.length > 0 && (
            <div className="aero-upload-list">
              {fileList.map((file) => {
                const isSuccess = file.status === 'success';
                const hasUrl = !!(file.url || file.thumbUrl);
                const isImage = isImageType(file.type);
                const canClick = isSuccess && hasUrl && !!onPreview;

                return (
                  <div
                    key={file.uid}
                    className={[
                      'aero-upload-file',
                      `aero-upload-file--${file.status}`,
                      canClick ? 'aero-upload-file--clickable' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={canClick ? () => onPreview!(file) : undefined}
                  >
                    {/* Thumbnail or icon */}
                    <div className="aero-upload-file__icon">
                      {listType === 'picture' && (file.thumbUrl || (isSuccess && file.url && isImage)) ? (
                        <img src={file.thumbUrl || file.url} alt={file.name} />
                      ) : (
                        <Icon icon={getFileIcon(file.type)} size={20} />
                      )}
                    </div>

                    {/* File info */}
                    <div className="aero-upload-file__info">
                      <div className="aero-upload-file__name">
                        <span>{file.name}</span>
                        {file.aiMeta && (
                          <span className="aero-upload-file__ai-tag">
                            <Icon icon={Sparkles} size={12} />
                          </span>
                        )}
                      </div>
                      {file.status === 'uploading' && (
                        <div className="aero-upload-file__progress">
                          <div
                            className="aero-upload-file__progress-bar"
                            style={{ width: `${file.percent || 0}%` }}
                          />
                        </div>
                      )}
                      {file.status === 'error' && file.error && (
                        <div className="aero-upload-file__error">{file.error}</div>
                      )}
                      {file.aiMeta?.description && (
                        <div className="aero-upload-file__ai-desc">{file.aiMeta.description}</div>
                      )}
                      {file.status !== 'uploading' && !file.aiMeta?.description && file.size != null && (
                        <div className="aero-upload-file__size">{formatSize(file.size)}</div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="aero-upload-file__actions">
                      {file.status === 'uploading' && (
                        <span className="aero-upload-file__loading">
                          <Icon icon={Loader} size={14} spin />
                        </span>
                      )}
                      {file.status === 'error' && file.originFile && (
                        <span
                          className="aero-upload-file__action"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRetry(file);
                          }}
                        >
                          <Icon icon={RotateCcw} size={14} />
                        </span>
                      )}
                      <span
                        className="aero-upload-file__action aero-upload-file__remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(file);
                        }}
                      >
                        <Icon icon={X} size={14} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {tip && <div className="aero-upload-tip">{tip}</div>}
    </div>
  );
};

export default Upload;
