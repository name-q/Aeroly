import React, { useMemo } from 'react';
import './index.less';

// ---- Types ----

export interface LayoutProps {
  /** flex:1 to fill remaining parent space */
  full?: boolean;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface HeaderProps {
  /** Height, number in px */
  height?: number | string;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface FooterProps {
  /** Height, number in px */
  height?: number | string;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface ContentProps {
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

export interface SiderProps {
  /** Width, number in px */
  width?: number | string;
  /** Children */
  children?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
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

// ---- Mark Sider ----
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
