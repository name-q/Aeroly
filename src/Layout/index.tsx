import React, { useMemo } from 'react';
import './index.less';

// ---- Types ----

export interface LayoutProps {
  /** flex:1 撑满父容器剩余空间 */
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
  return (
    <header className={cls} style={{ height, ...style }}>
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
  return (
    <footer className={cls} style={{ ...(height !== undefined ? { height } : {}), ...style }}>
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
  children,
  className,
  style,
}) => {
  const cls = ['aero-layout-sider', className || ''].filter(Boolean).join(' ');
  return (
    <aside
      className={cls}
      style={{ width, minWidth: width, maxWidth: width, ...style }}
    >
      {children}
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
