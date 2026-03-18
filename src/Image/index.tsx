import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ImageOff, Eye } from 'lucide-react';
import Icon from '../Icon';
import Preview from './Preview';
import { openPreview as openGlobalPreview } from './previewManager';
import './index.less';

// ─── Types ───

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

type ImageStatus = 'loading' | 'loaded' | 'error';

export interface ImageProps {
  /** Image URL */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Width */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 适应方式 */
  fit?: ImageFit;
  /** 圆角 */
  borderRadius?: number | string;
  /** Loading占位 */
  placeholder?: React.ReactNode;
  /** 加载失败兜底 */
  fallback?: React.ReactNode;
  /** Whether previewable */
  preview?: boolean;
  /** 预览时使用的Image URL（如高清图） */
  previewSrc?: string;
  /** Whether lazy load */
  lazy?: boolean;
  /** 加载Finish callback */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** 加载失败Callback */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface PreviewGroupProps {
  /** Children */
  children?: React.ReactNode;
  /** Whether previewable */
  preview?: boolean;
}

export interface ImagePreviewProps {
  /** Whether visible */
  open: boolean;
  /** Visibility change callback */
  onOpenChange: (open: boolean) => void;
  /** 单图地址（与 images 二选一） */
  src?: string;
  /** 多图地址列表（与 src 二选一） */
  images?: string[];
  /** Default展示第几张（从 0 开始） */
  defaultCurrent?: number;
}

// ─── Context ───

interface PreviewGroupContextValue {
  register: (id: string, src: string) => void;
  unregister: (id: string) => void;
  openPreview: (id: string) => void;
  groupPreview: boolean;
}

const PreviewGroupContext = createContext<PreviewGroupContextValue | null>(null);

let idCounter = 0;
const generateId = () => `aero-img-${++idCounter}`;

// ─── Image Main component ───

const Image: React.FC<ImageProps> & {
  PreviewGroup: typeof PreviewGroup;
  Preview: typeof StandalonePreview;
} = ({
  src,
  alt,
  width,
  height,
  fit = 'cover',
  borderRadius = 8,
  placeholder,
  fallback,
  preview = true,
  previewSrc,
  lazy = false,
  onLoad,
  onError,
  className,
  style,
}) => {
  const [status, setStatus] = useState<ImageStatus>(src ? 'loading' : 'error');
  const groupContext = useContext(PreviewGroupContext);
  const idRef = useRef(generateId());
  const imgRef = useRef<HTMLImageElement>(null);

  // Reset status when src changes
  useEffect(() => {
    if (!src) {
      setStatus('error');
      return;
    }
    // 浏览器缓存命中时 onLoad 会在 useEffect 之前同步触发，
    // 此时直接检查 img.complete 避免覆盖已经 loaded 的状态
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setStatus('loaded');
    } else {
      setStatus('loading');
    }
  }, [src]);

  // Register with group
  useEffect(() => {
    if (groupContext) {
      groupContext.register(idRef.current, previewSrc || src || '');
      return () => groupContext.unregister(idRef.current);
    }
  }, [src, previewSrc, groupContext]);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus('loaded');
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setStatus('error');
    onError?.(e);
  };

  const canPreview = groupContext ? groupContext.groupPreview : preview;

  const handleClick = () => {
    if (!canPreview || status === 'error') return;
    if (groupContext) {
      groupContext.openPreview(idRef.current);
    } else {
      openGlobalPreview({ images: [previewSrc || src || ''] });
    }
  };

  const cls = [
    'aero-image',
    canPreview && status === 'loaded' ? 'aero-image--clickable' : '',
    className || '',
  ].filter(Boolean).join(' ');

  const wrapStyle: React.CSSProperties = {
    width,
    height,
    borderRadius,
    ...style,
  };

  return (
    <div className={cls} style={wrapStyle} onClick={handleClick}>
      {/* Real image (always rendered for loading detection, hidden when not loaded) */}
      {src && status !== 'error' && (
        <img
          ref={imgRef}
          className="aero-image-inner"
          src={src}
          alt={alt}
          style={{ objectFit: fit, opacity: status === 'loaded' ? 1 : 0 }}
          loading={lazy ? 'lazy' : undefined}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Loading placeholder */}
      {status === 'loading' && (
        <div className="aero-image-placeholder">
          {placeholder || <Icon icon={ImageOff} size={24} />}
        </div>
      )}

      {/* Error fallback */}
      {status === 'error' && (
        <div className="aero-image-error">
          {fallback || (
            <>
              <Icon icon={ImageOff} size={24} />
            </>
          )}
        </div>
      )}

      {/* Hover preview hint */}
      {canPreview && status === 'loaded' && (
        <div className="aero-image-hover">
          <Icon icon={Eye} size={16} />
        </div>
      )}
    </div>
  );
};

// ─── PreviewGroup ───

const PreviewGroup: React.FC<PreviewGroupProps> = ({ children, preview = true }) => {
  const imagesRef = useRef(new Map<string, string>());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const register = useCallback((id: string, src: string) => {
    imagesRef.current.set(id, src);
  }, []);

  const unregister = useCallback((id: string) => {
    imagesRef.current.delete(id);
  }, []);

  const openPreview = useCallback((id: string) => {
    if (!preview) return;
    setCurrentId(id);
    setPreviewOpen(true);
    document.dispatchEvent(new CustomEvent('aero-overlay-open'));
  }, [preview]);

  const images = Array.from(imagesRef.current.values());
  const keys = Array.from(imagesRef.current.keys());
  const currentIndex = Math.max(keys.indexOf(currentId), 0);

  const contextValue: PreviewGroupContextValue = {
    register,
    unregister,
    openPreview,
    groupPreview: preview,
  };

  return (
    <PreviewGroupContext.Provider value={contextValue}>
      {children}
      <Preview
        visible={previewOpen}
        images={images}
        current={currentIndex}
        onClose={() => setPreviewOpen(false)}
        onChange={(i) => setCurrentId(keys[i])}
      />
    </PreviewGroupContext.Provider>
  );
};

Image.PreviewGroup = PreviewGroup;

// ─── StandalonePreview 独立预览 ───

const StandalonePreview: React.FC<ImagePreviewProps> = ({
  open,
  onOpenChange,
  src,
  images,
  defaultCurrent = 0,
}) => {
  const list = images || (src ? [src] : []);
  const [current, setCurrent] = useState(defaultCurrent);

  // Reset to defaultCurrent when open
  useEffect(() => {
    if (open) setCurrent(defaultCurrent);
  }, [open, defaultCurrent]);

  return (
    <Preview
      visible={open}
      images={list}
      current={current}
      onClose={() => onOpenChange(false)}
      onChange={setCurrent}
    />
  );
};

Image.Preview = StandalonePreview;

export default Image;
