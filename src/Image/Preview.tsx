import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ZoomIn, ZoomOut, RotateCcw, RotateCw, Maximize, ChevronLeft, ChevronRight, FlipHorizontal2, FlipVertical2 } from 'lucide-react';
import Icon from '../Icon';

// ─── Preview 预览浮层 ───

export interface PreviewInternalProps {
  visible: boolean;
  images: string[];
  current: number;
  onClose: () => void;
  onChange: (index: number) => void;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const WHEEL_STEP = 0.15;
const DRAG_THRESHOLD = 3;

const Preview: React.FC<PreviewInternalProps> = ({ visible, images, current, onClose, onChange }) => {
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  // 拖拽相关 ref
  const dragStartRef = useRef({ x: 0, y: 0 });
  const posStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  // 用 ref 跟踪最新 scale，供 wheel handler 读取（避免闭包陈旧值）
  const scaleRef = useRef(scale);
  scaleRef.current = scale;
  const posRef = useRef(position);
  posRef.current = position;

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
      setFlipX(false);
      setFlipY(false);
      setPosition({ x: 0, y: 0 });
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
    setFlipX(false);
    setFlipY(false);
    setPosition({ x: 0, y: 0 });
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
          setScale(s => Math.min(s + 0.5, MAX_SCALE));
          break;
        case '-':
          setScale(s => {
            const next = Math.max(s - 0.5, MIN_SCALE);
            if (next <= 1) setPosition({ x: 0, y: 0 });
            return next;
          });
          break;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, current, images.length, onClose, onChange]);

  // ─── 拖拽平移 ───
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (scaleRef.current <= 1) return;
    e.preventDefault();
    hasDraggedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    posStartRef.current = posRef.current;
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      if (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD) {
        hasDraggedRef.current = true;
      }
      setPosition({ x: posStartRef.current.x + dx, y: posStartRef.current.y + dy });
    };
    const handleMouseUp = () => setDragging(false);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  // 点击 body 关闭（兼容拖拽：拖拽过不关闭）
  const handleBodyClick = useCallback((e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) return;
    if (hasDraggedRef.current) { hasDraggedRef.current = false; return; }
    onClose();
  }, [onClose]);

  // ─── 滚轮缩放（中心跟随鼠标） ───
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el || !visible) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const oldScale = scaleRef.current;
      const delta = e.deltaY > 0 ? -WHEEL_STEP : WHEEL_STEP;
      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, oldScale + delta));
      if (newScale === oldScale) return;

      // 缩放中心跟随鼠标：保持鼠标指向的图片内容点不变
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left - rect.width / 2;
      const my = e.clientY - rect.top - rect.height / 2;
      const ratio = newScale / oldScale;
      const oldPos = posRef.current;
      const nx = mx - (mx - oldPos.x) * ratio;
      const ny = my - (my - oldPos.y) * ratio;

      setScale(newScale);
      setPosition(newScale <= 1 ? { x: 0, y: 0 } : { x: nx, y: ny });
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [visible]);

  // 工具栏缩放时重置 position（缩回 1x 时归零）
  const handleZoomIn = useCallback(() => {
    setScale(s => {
      const next = Math.min(s + 0.5, MAX_SCALE);
      return next;
    });
  }, []);
  const handleZoomOut = useCallback(() => {
    setScale(s => {
      const next = Math.max(s - 0.5, MIN_SCALE);
      if (next <= 1) setPosition({ x: 0, y: 0 });
      return next;
    });
  }, []);
  const handleReset = useCallback(() => {
    setScale(1); setRotate(0); setFlipX(false); setFlipY(false); setPosition({ x: 0, y: 0 });
  }, []);

  if (!mounted) return null;

  const rootCls = [
    'aero-image-preview-root',
    animating ? 'aero-image-preview-root--open' : '',
  ].filter(Boolean).join(' ');

  return createPortal(
    <div className={rootCls} onTransitionEnd={handleTransitionEnd}>
      <div className="aero-image-preview-mask" />

      <div
        ref={bodyRef}
        className={`aero-image-preview-body${scale > 1 ? (dragging ? ' aero-image-preview-body--grabbing' : ' aero-image-preview-body--grab') : ''}`}
        onMouseDown={handleMouseDown}
        onClick={handleBodyClick}
      >
        <img
          className="aero-image-preview-img"
          src={images[current]}
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotate}deg) scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})` }}
          alt=""
          draggable={false}
        />
      </div>

      <button type="button" className="aero-image-preview-close" onClick={onClose}>
        <Icon icon={X} size={20} />
      </button>

      {/* Toolbar */}
      <div className="aero-image-preview-toolbar">
        <button type="button" onClick={handleZoomOut} disabled={scale <= MIN_SCALE}>
          <Icon icon={ZoomOut} size={18} />
        </button>
        <button type="button" onClick={handleZoomIn} disabled={scale >= MAX_SCALE}>
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
        <button type="button" onClick={() => setFlipX(f => !f)}>
          <Icon icon={FlipHorizontal2} size={18} />
        </button>
        <button type="button" onClick={() => setFlipY(f => !f)}>
          <Icon icon={FlipVertical2} size={18} />
        </button>
        <span className="aero-image-preview-toolbar-divider" />
        <button type="button" onClick={handleReset}>
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
    </div>,
    document.body,
  );
};

export default Preview;