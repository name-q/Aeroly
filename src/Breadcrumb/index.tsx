import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, Ellipsis } from 'lucide-react';
import Icon from '../Icon';
import Popover from '../Popover';
import './index.less';

// ─── Types ───

export interface BreadcrumbItemType {
  /** Unique identifier */
  key?: string;
  /** Display text */
  label: React.ReactNode;
  /** Link URL */
  href?: string;
  /** 链接打开方式 */
  target?: '_blank' | '_self' | '_parent' | '_top';
  /** Icon */
  icon?: LucideIcon;
  /** Click callback（同时存在 href 时，会阻止Default跳转，仅执行Callback） */
  onClick?: (e: React.MouseEvent) => void;
  /** Dropdown items */
  menu?: { label: React.ReactNode; href?: string; target?: string; onClick?: (e: React.MouseEvent) => void }[];
}

export interface BreadcrumbProps {
  /** Breadcrumb items */
  items: BreadcrumbItemType[];
  /** Custom separator */
  separator?: React.ReactNode;
  /** 超过此数量时折叠中间项 */
  maxItems?: number;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ─── 单个面包屑项 ───

const BreadcrumbItem: React.FC<{
  item: BreadcrumbItemType;
  isLast: boolean;
}> = ({ item, isLast }) => {
  const content = (
    <>
      {item.icon && <Icon icon={item.icon} size={14} className="aero-breadcrumb-item__icon" />}
      <span>{item.label}</span>
    </>
  );

  const cls = [
    'aero-breadcrumb-item__link',
    isLast ? 'aero-breadcrumb-item__link--active' : '',
  ].filter(Boolean).join(' ');

  if (item.href && !isLast) {
    return (
      <a
        className={cls}
        href={item.href}
        target={item.target}
        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(e); } : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={cls} onClick={!isLast ? item.onClick : undefined}>
      {content}
    </span>
  );
};

// ─── 带下拉的面包屑项 ───

const BreadcrumbItemWithMenu: React.FC<{
  item: BreadcrumbItemType;
  isLast: boolean;
}> = ({ item, isLast }) => {
  const menuContent = (
    <ul className="aero-breadcrumb-menu">
      {item.menu!.map((opt, i) => (
        <li key={i} className="aero-breadcrumb-menu__item">
          {opt.href ? (
            <a
              href={opt.href}
              target={opt.target}
              rel={opt.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={opt.onClick ? (e) => { e.preventDefault(); opt.onClick!(e); } : undefined}
            >{opt.label}</a>
          ) : (
            <span onClick={opt.onClick}>{opt.label}</span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <Popover content={menuContent} trigger="hover" placement="bottom" offset={4} raw>
      <span className="aero-breadcrumb-item__trigger">
        <BreadcrumbItem item={item} isLast={isLast} />
      </span>
    </Popover>
  );
};

// ─── 折叠省略项 ───

const BreadcrumbEllipsis: React.FC<{ items: BreadcrumbItemType[] }> = ({ items }) => {
  const menuContent = (
    <ul className="aero-breadcrumb-menu">
      {items.map((item, i) => (
        <li key={item.key ?? i} className="aero-breadcrumb-menu__item">
          {item.href ? (
            <a
              href={item.href}
              target={item.target}
              rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
              onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick!(e); } : undefined}
            >
              {item.icon && <Icon icon={item.icon} size={14} />}
              {item.label}
            </a>
          ) : (
            <span onClick={item.onClick}>
              {item.icon && <Icon icon={item.icon} size={14} />}
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <Popover content={menuContent} trigger="hover" placement="bottom" offset={4} raw>
      <span className="aero-breadcrumb-item__link aero-breadcrumb-ellipsis">
        <Icon icon={Ellipsis} size={16} />
      </span>
    </Popover>
  );
};

// ─── Breadcrumb Main component ───

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  maxItems,
  className,
  style,
}) => {
  const cls = ['aero-breadcrumb', className || ''].filter(Boolean).join(' ');

  const sep = separator ?? <Icon icon={ChevronRight} size={12} className="aero-breadcrumb-separator" />;

  // 折叠逻辑：保留首尾各 1 项，中间折叠
  let renderItems: React.ReactNode[];

  if (maxItems && maxItems > 1 && items.length > maxItems) {
    const head = items.slice(0, 1);
    const tail = items.slice(-(maxItems - 1));
    const collapsed = items.slice(1, items.length - (maxItems - 1));

    renderItems = [];
    // 首项
    renderItems.push(
      <li key={head[0].key ?? 'head'} className="aero-breadcrumb-item">
        {head[0].menu ? (
          <BreadcrumbItemWithMenu item={head[0]} isLast={false} />
        ) : (
          <BreadcrumbItem item={head[0]} isLast={false} />
        )}
      </li>
    );
    // 省略
    renderItems.push(
      <li key="__ellipsis" className="aero-breadcrumb-item">
        <span className="aero-breadcrumb-separator">{sep}</span>
        <BreadcrumbEllipsis items={collapsed} />
      </li>
    );
    // 尾部
    tail.forEach((item, i) => {
      const isLast = i === tail.length - 1;
      renderItems.push(
        <li key={item.key ?? `tail-${i}`} className="aero-breadcrumb-item">
          <span className="aero-breadcrumb-separator">{sep}</span>
          {item.menu ? (
            <BreadcrumbItemWithMenu item={item} isLast={isLast} />
          ) : (
            <BreadcrumbItem item={item} isLast={isLast} />
          )}
        </li>
      );
    });
  } else {
    renderItems = items.map((item, i) => {
      const isLast = i === items.length - 1;
      return (
        <li key={item.key ?? i} className="aero-breadcrumb-item">
          {i > 0 && <span className="aero-breadcrumb-separator">{sep}</span>}
          {item.menu ? (
            <BreadcrumbItemWithMenu item={item} isLast={isLast} />
          ) : (
            <BreadcrumbItem item={item} isLast={isLast} />
          )}
        </li>
      );
    });
  }

  return (
    <nav className={cls} style={style} aria-label="breadcrumb">
      <ol className="aero-breadcrumb-list">
        {renderItems}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
