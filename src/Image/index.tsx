import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut, RotateCcw, RotateCw, Maximize, ChevronLeft, ChevronRight, ImageOff, Eye } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

// ─── Types ───

export type ImageFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

type ImageStatus = 'loading' | 'loaded' | 'error';

export interface ImageProps {
  /** 图片地址 */
  src?: string;
  /** 替代文本 */
  alt?: string;
  /** 宽度 */
  width?: number | string;
  /** 高度 */
  height?: number | string;
  /** 适应方式 */
  fit?: ImageFit;
  /** 圆角 */
  borderRadius?: number | string;
  /** 加载中占位 */
  placeholder?: React.ReactNode;
  /** 加载失败兜底 */
  fallback?: React.ReactNode;
  /** 是否可预览 */
  preview?: boolean;
  /** 预览时使用的图片地址（如高清图） */
  previewSrc?: string;
  /** 是否懒加载 */
  lazy?: boolean;
  /** 加载完成回调 */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** 加载失败回调 */
  onError?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface PreviewGroupProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 是否可预览 */
  preview?: boolean;
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

// ─── Preview 预览浮层 ───

interface PreviewInternalProps {
  visible: boolean;
  images: string[];
  current: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

const Preview: React.FC<PreviewInternalProps> = ({ visible, images, current, onClose, onChange }) => {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [visible]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!visible && e.propertyName === 'opacity') {
      setMounted(false);
      setScale(1);
      setRotate(0);
    }
  };

  // Body scroll lock
  useEffect(() => {
    if (visible) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [visible]);

  // Reset transform on image switch
  useEffect(() => {
    setScale(1);
    setRotate(0);
  }, [current]);

  // Keyboard
  useEffect(() => {
    if (!visible) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (current > 0) onChange(current - 1);
          break;
        case 'ArrowRight':
          if (current < images.length - 1) onChange(current + 1);
          break;
        case '+':
        case '=':
          setScale(s => Math.min(s + 0.5, 5));
          break;
        case '-':
          setScale(s => Math.max(s - 0.5, 0.5));
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, current, images.length, onClose, onChange]);

  if (!mounted) return null;

  const rootCls = [
    'aero-image-preview-root',
    animating ? 'aero-image-preview-root--open' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={rootCls} onTransitionEnd={handleTransitionEnd}>
      <div className="aero-image-preview-mask" onClick={onClose} />

      <div className="aero-image-preview-body">
        <img
          className="aero-image-preview-img"
          src={images[current]}
          style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
          alt=""
          draggable={false}
        />
      </div>

      <button type="button" className="aero-image-preview-close" onClick={onClose}>
        <Icon icon={X} size={20} />
      </button>

      {/* Toolbar */}
      <div className="aero-image-preview-toolbar">
        <button type="button" onClick={() => setScale(s => Math.max(s - 0.5, 0.5))} disabled={scale <= 0.5}>
          <Icon icon={ZoomOut} size={18} />
        </button>
        <button type="button" onClick={() => setScale(s => Math.min(s + 0.5, 5))} disabled={scale >= 5}>
          <Icon icon={ZoomIn} size={18} />
        </button>
        <span className="aero-image-preview-toolbar-divider" />
        <button type="button" onClick={() => setRotate(r => r - 90)}>
          <Icon icon={RotateCcw} size={18} />
        </button>
        <button type="button" onClick={() => setRotate(r => r + 90)}>
          <Icon icon={RotateCw} size={18} />
        </button>
        <span className="aero-image-preview-toolbar-divider" />
        <button type="button" onClick={() => { setScale(1); setRotate(0); }}>
          <Icon icon={Maximize} size={18} />
        </button>
      </div>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="aero-image-preview-nav aero-image-preview-nav--prev"
            disabled={current === 0}
            onClick={() => onChange(current - 1)}
          >
            <Icon icon={ChevronLeft} size={24} />
          </button>
          <button
            type="button"
            className="aero-image-preview-nav aero-image-preview-nav--next"
            disabled={current === images.length - 1}
            onClick={() => onChange(current + 1)}
          >
            <Icon icon={ChevronRight} size={24} />
          </button>
        </>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="aero-image-preview-counter">
          {current + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

// ─── Image 主组件 ───

const Image: React.FC<ImageProps> & { PreviewGroup: typeof PreviewGroup } = ({
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
  const [previewOpen, setPreviewOpen] = useState(false);
  const groupContext = useContext(PreviewGroupContext);
  const idRef = useRef(generateId());

  // Reset status when src changes
  useEffect(() => {
    setStatus(src ? 'loading' : 'error');
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
      setPreviewOpen(true);
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
    <>
      <div className={cls} style={wrapStyle} onClick={handleClick}>
        {/* Real image (always rendered for loading detection, hidden when not loaded) */}
        {src && status !== 'error' && (
          <img
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

      {/* Standalone preview (no group) */}
      {!groupContext && (
        <Preview
          visible={previewOpen}
          images={[previewSrc || src || '']}
          current={0}
          onClose={() => setPreviewOpen(false)}
          onChange={() => {}}
        />
      )}
    </>
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

export default Image;
