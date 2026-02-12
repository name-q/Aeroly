import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

// ---- Types ----

export interface LayoutProps {
  /** 是否撑满视口高度 */
  full?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface HeaderProps {
  /** 高度，数字为 px */
  height?: number | string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface FooterProps {
  /** 高度，数字为 px */
  height?: number | string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface ContentProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface SiderProps {
  /** 宽度，数字为 px */
  width?: number | string;
  /** 收起后的宽度 */
  collapsedWidth?: number;
  /** 是否可收起 */
  collapsible?: boolean;
  /** 是否收起（受控） */
  collapsed?: boolean;
  /** 默认是否收起 */
  defaultCollapsed?: boolean;
  /** 收起/展开回调 */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** 自定义触发器，传 null 隐藏 */
  trigger?: React.ReactNode | null;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- Header ----

const Header: React.FC<HeaderProps> = ({
  height = 56,
  children,
  className,
  style,
}) => {
  const cls = ['aero-layout-header', className || ''].filter(Boolean).join(' ');
  const s: React.CSSProperties = {
    height: typeof height === 'number' ? height : height,
    ...style,
  };

  return (
    <header className={cls} style={s}>
      {children}
    </header>
  );
};

// ---- Footer ----

const Footer: React.FC<FooterProps> = ({
  height,
  children,
  className,
  style,
}) => {
  const cls = ['aero-layout-footer', className || ''].filter(Boolean).join(' ');
  const s: React.CSSProperties = {
    ...(height !== undefined ? { height: typeof height === 'number' ? height : height } : {}),
    ...style,
  };

  return (
    <footer className={cls} style={s}>
      {children}
    </footer>
  );
};

// ---- Content ----

const Content: React.FC<ContentProps> = ({
  children,
  className,
  style,
}) => {
  const cls = ['aero-layout-content', className || ''].filter(Boolean).join(' ');

  return (
    <main className={cls} style={style}>
      {children}
    </main>
  );
};

// ---- Sider ----

const Sider: React.FC<SiderProps> = ({
  width = 200,
  collapsedWidth = 48,
  collapsible = false,
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  trigger,
  children,
  className,
  style,
}) => {
  const isControlled = collapsedProp !== undefined;
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = isControlled ? collapsedProp! : internalCollapsed;

  const toggle = useCallback(() => {
    const next = !isCollapsed;
    if (!isControlled) setInternalCollapsed(next);
    onCollapsedChange?.(next);
  }, [isCollapsed, isControlled, onCollapsedChange]);

  const resolvedWidth = isCollapsed ? collapsedWidth : (typeof width === 'number' ? width : width);

  const cls = ['aero-layout-sider', className || ''].filter(Boolean).join(' ');
  const s: React.CSSProperties = {
    width: resolvedWidth,
    minWidth: resolvedWidth,
    maxWidth: resolvedWidth,
    position: 'relative',
    ...style,
  };

  const showTrigger = collapsible && trigger !== null;

  return (
    <aside className={cls} style={s}>
      <div className="aero-layout-sider-children">
        {children}
      </div>
      {showTrigger && (
        trigger !== undefined ? (
          <span onClick={toggle}>{trigger}</span>
        ) : (
          <span className="aero-layout-sider-trigger" onClick={toggle}>
            <Icon icon={isCollapsed ? ChevronRight : ChevronLeft} size={14} />
          </span>
        )
      )}
    </aside>
  );
};

// ---- 标记 Sider ----
(Sider as any).__AERO_SIDER = true;

// ---- Layout ----

const InternalLayout: React.FC<LayoutProps> = ({
  full = false,
  children,
  className,
  style,
}) => {
  const hasSider = useMemo(() => {
    let found = false;
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && (child.type as any)?.__AERO_SIDER) {
        found = true;
      }
    });
    return found;
  }, [children]);

  const cls = [
    'aero-layout',
    hasSider ? 'aero-layout--has-sider' : '',
    full ? 'aero-layout--full' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={cls} style={style}>
      {children}
    </section>
  );
};

// ---- Compose ----

type LayoutType = React.FC<LayoutProps> & {
  Header: typeof Header;
  Footer: typeof Footer;
  Content: typeof Content;
  Sider: typeof Sider;
};

const Layout = InternalLayout as LayoutType;
Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;
Layout.Sider = Sider;

export default Layout;
