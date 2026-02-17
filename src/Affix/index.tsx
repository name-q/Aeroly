import React, { useRef, useEffect, useState, useCallback } from 'react';
import './index.less';

export interface AffixProps {
  /** 距顶部固定距离（px） */
  offsetTop?: number;
  /** 距底部固定距离（px），与 offsetTop 互斥 */
  offsetBottom?: number;
  /** 固定StatusChange callback */
  onChange?: (affixed: boolean) => void;
  /** Custom滚动容器，Default自动查找最近可滚动祖先 */
  target?: () => HTMLElement | Window;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/** 向上查找最近的可滚动祖先 */
function findScrollParent(el: HTMLElement): HTMLElement | null {
  let node = el.parentElement;
  while (node && node !== document.body && node !== document.documentElement) {
    const { overflow, overflowY } = getComputedStyle(node);
    if (/(auto|scroll)/.test(overflow + overflowY)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}

const Affix: React.FC<AffixProps> = ({
  offsetTop,
  offsetBottom,
  onChange,
  target,
  className,
  style,
  children,
}) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [affixed, setAffixed] = useState(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  // 确定Direction：有 offsetBottom 时吸底，否则吸顶
  const isBottom = offsetBottom !== undefined;
  const offset = isBottom ? offsetBottom! : (offsetTop ?? 0);

  const getRoot = useCallback((): HTMLElement | null => {
    if (target) {
      const t = target();
      return t instanceof Window ? null : t;
    }
    if (sentinelRef.current) {
      return findScrollParent(sentinelRef.current);
    }
    return null;
  }, [target]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const root = getRoot();

    // rootMargin: 吸顶时，哨兵顶部离开 root 顶部 offset 距离即触发
    // 吸底时，哨兵底部离开 root 底部 offset 距离即触发
    const rootMargin = isBottom
      ? `0px 0px -${offset}px 0px`
      : `-${offset + 1}px 0px 0px 0px`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 哨兵不可见 = sticky 已生效
        const fixed = !entry.isIntersecting;
        setAffixed((prev) => {
          if (prev !== fixed) {
            onChangeRef.current?.(fixed);
          }
          return fixed;
        });
      },
      {
        root: root,
        threshold: 0,
        rootMargin,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [offset, isBottom, getRoot]);

  const stickyStyle: React.CSSProperties = {
    position: 'sticky',
    ...(isBottom ? { bottom: offset } : { top: offset }),
    zIndex: affixed ? 10 : undefined,
    ...style,
  };

  const rootCls = [
    'aero-affix',
    affixed ? 'aero-affix--fixed' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      {/* Sentinel: zero-height element for IntersectionObserver detection */}
      {!isBottom && <div ref={sentinelRef} className="aero-affix-sentinel" />}
      <div ref={stickyRef} className={rootCls} style={stickyStyle}>
        {children}
      </div>
      {isBottom && <div ref={sentinelRef} className="aero-affix-sentinel" />}
    </>
  );
};

export default Affix;
