import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import Icon from '../Icon';
import type { LucideIcon } from 'lucide-react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export type TabsVariant = 'line' | 'card' | 'pill';
export type TabsSize = 'small' | 'medium' | 'large';

export interface TabItem {
  /** Unique identifier */
  key: string;
  /** Label text */
  label: React.ReactNode;
  /** Icon */
  icon?: LucideIcon;
  /** Panel content */
  children?: React.ReactNode;
  /** Disabled */
  disabled?: boolean;
  /** Closable */
  closable?: boolean;
}

export interface TabsProps {
  /** Tab items data */
  items: TabItem[];
  /** Current active key (controlled) */
  activeKey?: string;
  /** Default active key (uncontrolled) */
  defaultActiveKey?: string;
  /** Change callback */
  onChange?: (key: string) => void;
  /** Style variant */
  variant?: TabsVariant;
  /** Size */
  size?: TabsSize;
  /** Center aligned */
  centered?: boolean;
  /** Close tab callback */
  onClose?: (key: string) => void;
  /** Extra content on the right of tab bar */
  extra?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey,
  defaultActiveKey,
  onChange,
  variant = 'line',
  size: sizeProp,
  centered = false,
  onClose,
  extra,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = activeKey !== undefined;
  const [internalKey, setInternalKey] = useState<string>(
    defaultActiveKey ?? items[0]?.key ?? '',
  );
  const currentKey = isControlled ? activeKey! : internalKey;

  const navRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

  const activeIndex = items.findIndex((item) => item.key === currentKey);

  const scrollActiveTabIntoView = useCallback((nav: HTMLElement, activeTab: HTMLElement) => {
    const navRect = nav.getBoundingClientRect();
    const tabRect = activeTab.getBoundingClientRect();

    if (tabRect.right > navRect.right) {
      nav.scrollLeft += tabRect.right - navRect.right + 8;
    } else if (tabRect.left < navRect.left) {
      nav.scrollLeft -= navRect.left - tabRect.left + 8;
    }
  }, []);

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const tabs = nav.querySelectorAll<HTMLElement>('.aero-tabs-tab');
    const activeTab = tabs[activeIndex];
    if (!activeTab) return;

    scrollActiveTabIntoView(nav, activeTab);

    if (variant === 'line') {
      const label = activeTab.querySelector<HTMLElement>('.aero-tabs-tab__label');
      if (!label) return;
      setIndicatorStyle({
        width: label.offsetWidth,
        transform: `translateX(${activeTab.offsetLeft + (activeTab.offsetWidth - label.offsetWidth) / 2}px)`,
      });
    } else {
      setIndicatorStyle({
        width: activeTab.offsetWidth,
        transform: `translateX(${activeTab.offsetLeft}px)`,
      });
    }
  }, [activeIndex, variant, scrollActiveTabIntoView]);

  useEffect(() => {
    updateIndicator();
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const handleSelect = (key: string, disabled?: boolean) => {
    if (disabled) return;
    if (!isControlled) setInternalKey(key);
    onChange?.(key);
  };

  const handleClose = (e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    onClose?.(key);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    const enabledItems = items.filter((item) => !item.disabled);
    const currentIdx = enabledItems.findIndex((item) => item.key === currentKey);
    if (currentIdx < 0) return;

    let nextIdx: number;
    if (e.key === 'ArrowRight') {
      nextIdx = (currentIdx + 1) % enabledItems.length;
    } else {
      nextIdx = (currentIdx - 1 + enabledItems.length) % enabledItems.length;
    }
    const nextKey = enabledItems[nextIdx].key;
    handleSelect(nextKey);

    // Focus corresponding tab
    const nav = navRef.current;
    if (nav) {
      const tabs = nav.querySelectorAll<HTMLElement>('.aero-tabs-tab');
      const targetIndex = items.findIndex((item) => item.key === nextKey);
      tabs[targetIndex]?.focus();
    }
  };

  const activeItem = items.find((item) => item.key === currentKey);

  const rootCls = [
    'aero-tabs',
    `aero-tabs--${variant}`,
    `aero-tabs--${size}`,
    centered ? 'aero-tabs--centered' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootCls} style={style}>
      <div className="aero-tabs-header">
        <div className="aero-tabs-nav" ref={navRef} role="tablist" onKeyDown={handleKeyDown}>
          {variant === 'line' && (
            <div className="aero-tabs-indicator" style={indicatorStyle} />
          )}
          {(variant === 'pill' || variant === 'card') && (
            <div className="aero-tabs-thumb" style={indicatorStyle} />
          )}
          {items.map((item) => {
            const isActive = item.key === currentKey;
            const tabCls = [
              'aero-tabs-tab',
              isActive ? 'aero-tabs-tab--active' : '',
              item.disabled ? 'aero-tabs-tab--disabled' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <div
                key={item.key}
                className={tabCls}
                role="tab"
                aria-selected={isActive}
                aria-disabled={item.disabled}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleSelect(item.key, item.disabled)}
              >
                <span className="aero-tabs-tab__label">
                  {item.icon && <Icon icon={item.icon} size={15} />}
                  {item.label}
                </span>
                {item.closable && (
                  <span
                    className="aero-tabs-tab__close"
                    onClick={(e) => handleClose(e, item.key)}
                  >
                    <Icon icon={X} size={14} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
        {extra && <div className="aero-tabs-extra">{extra}</div>}
      </div>
      <div className="aero-tabs-panel" role="tabpanel" key={currentKey}>
        {activeItem?.children}
      </div>
    </div>
  );
};

export default Tabs;
