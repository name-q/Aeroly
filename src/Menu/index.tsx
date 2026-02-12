import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  createContext,
  useContext,
} from 'react';
import type { LucideIcon } from 'lucide-react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Icon from '../Icon';
import Popover from '../Popover';
import './index.less';

// ─── Types ───

export interface MenuItemType {
  /** 唯一标识 */
  key: string;
  /** 显示文本 */
  label: React.ReactNode;
  /** 图标 */
  icon?: LucideIcon;
  /** 子菜单 */
  children?: MenuItemType[];
  /** 禁用 */
  disabled?: boolean;
  /** 分组标题（仅作为分组使用，不可选中） */
  type?: 'group' | 'divider';
}

export interface MenuProps {
  /** 菜单项数据 */
  items: MenuItemType[];
  /** 当前选中项（受控） */
  selectedKey?: string;
  /** 默认选中项 */
  defaultSelectedKey?: string;
  /** 当前展开的子菜单（受控） */
  openKeys?: string[];
  /** 默认展开的子菜单 */
  defaultOpenKeys?: string[];
  /** 选中回调 */
  onSelect?: (key: string) => void;
  /** 展开/收起回调 */
  onOpenChange?: (openKeys: string[]) => void;
  /** 模式 */
  mode?: 'vertical' | 'horizontal';
  /** 收起侧栏（仅 vertical） */
  collapsed?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ─── Context ───

interface MenuContextValue {
  mode: 'vertical' | 'horizontal';
  collapsed: boolean;
  selectedKey: string;
  openKeys: string[];
  onSelect: (key: string) => void;
  toggleOpen: (key: string) => void;
  level: number;
}

const MenuContext = createContext<MenuContextValue>({
  mode: 'vertical',
  collapsed: false,
  selectedKey: '',
  openKeys: [],
  onSelect: () => {},
  toggleOpen: () => {},
  level: 0,
});

// ─── 工具：判断 key 是否在子树中 ───

function hasSelectedChild(items: MenuItemType[], selectedKey: string): boolean {
  for (const item of items) {
    if (item.key === selectedKey) return true;
    if (item.children && hasSelectedChild(item.children, selectedKey)) return true;
  }
  return false;
}

// ─── MenuItem ───

const MenuItem: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const ctx = useContext(MenuContext);
  const isActive = ctx.selectedKey === item.key;

  const cls = [
    'aero-menu-item',
    isActive ? 'aero-menu-item--active' : '',
    item.disabled ? 'aero-menu-item--disabled' : '',
  ].filter(Boolean).join(' ');

  const handleClick = () => {
    if (item.disabled) return;
    ctx.onSelect(item.key);
  };

  const indent = ctx.mode === 'vertical' && !ctx.collapsed ? ctx.level * 16 : 0;

  return (
    <li
      className={cls}
      onClick={handleClick}
      style={indent ? { paddingLeft: 16 + indent } : undefined}
      role="menuitem"
      aria-disabled={item.disabled}
    >
      {item.icon && <Icon icon={item.icon} size={16} className="aero-menu-item__icon" />}
      {(!ctx.collapsed || ctx.mode === 'horizontal') && (
        <span className="aero-menu-item__label">{item.label}</span>
      )}
    </li>
  );
};

// ─── SubMenu (vertical inline) ───

const SubMenuInline: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const ctx = useContext(MenuContext);
  const isOpen = ctx.openKeys.includes(item.key);
  const childActive = item.children ? hasSelectedChild(item.children, ctx.selectedKey) : false;
  const contentRef = useRef<HTMLUListElement>(null);
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (isOpen) {
      setHeight(el.scrollHeight);
      const timer = setTimeout(() => setHeight(undefined), 150);
      return () => clearTimeout(timer);
    } else {
      setHeight(el.scrollHeight);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setHeight(0));
      });
    }
  }, [isOpen]);

  const indent = ctx.level * 16;

  const cls = [
    'aero-menu-submenu',
    isOpen ? 'aero-menu-submenu--open' : '',
    childActive ? 'aero-menu-submenu--child-active' : '',
    item.disabled ? 'aero-menu-submenu--disabled' : '',
  ].filter(Boolean).join(' ');

  const handleToggle = () => {
    if (item.disabled) return;
    ctx.toggleOpen(item.key);
  };

  return (
    <li className={cls}>
      <div
        className="aero-menu-submenu__title"
        onClick={handleToggle}
        style={indent ? { paddingLeft: 16 + indent } : undefined}
        role="button"
        aria-expanded={isOpen}
      >
        {item.icon && <Icon icon={item.icon} size={16} className="aero-menu-item__icon" />}
        <span className="aero-menu-item__label">{item.label}</span>
        <Icon icon={ChevronRight} size={14} className="aero-menu-submenu__arrow" />
      </div>
      <ul
        ref={contentRef}
        className="aero-menu-submenu__content"
        style={{
          height: height !== undefined ? height : 'auto',
          overflow: height !== undefined ? 'hidden' : undefined,
        }}
        role="menu"
      >
        <MenuContext.Provider value={{ ...ctx, level: ctx.level + 1 }}>
          {item.children?.map(child => renderItem(child))}
        </MenuContext.Provider>
      </ul>
    </li>
  );
};

// ─── SubMenu (collapsed / horizontal → Popover 弹出) ───

const SubMenuPopover: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const ctx = useContext(MenuContext);
  const childActive = item.children ? hasSelectedChild(item.children, ctx.selectedKey) : false;
  const [popOpen, setPopOpen] = useState(false);

  const cls = [
    'aero-menu-submenu',
    childActive ? 'aero-menu-submenu--child-active' : '',
    item.disabled ? 'aero-menu-submenu--disabled' : '',
  ].filter(Boolean).join(' ');

  const isHorizontalRoot = ctx.mode === 'horizontal' && ctx.level === 0;
  const placement = isHorizontalRoot ? 'bottom' : 'right';

  // 选中后关闭弹出层
  const handleChildSelect = useCallback((key: string) => {
    ctx.onSelect(key);
    setPopOpen(false);
  }, [ctx.onSelect]);

  const popContent = (
    <ul className="aero-menu-popup" role="menu">
      <MenuContext.Provider value={{ ...ctx, mode: 'vertical', collapsed: false, level: 0, onSelect: handleChildSelect }}>
        {item.children?.map(child => renderItem(child))}
      </MenuContext.Provider>
    </ul>
  );

  const titleContent = (
    <div className="aero-menu-submenu__title">
      {item.icon && <Icon icon={item.icon} size={16} className="aero-menu-item__icon" />}
      {(!ctx.collapsed || ctx.mode === 'horizontal') && (
        <span className="aero-menu-item__label">{item.label}</span>
      )}
      {!ctx.collapsed && (
        <Icon
          icon={isHorizontalRoot ? ChevronDown : ChevronRight}
          size={14}
          className="aero-menu-submenu__arrow"
        />
      )}
    </div>
  );

  if (item.disabled) {
    return <li className={cls}>{titleContent}</li>;
  }

  return (
    <li className={cls}>
      <Popover
        content={popContent}
        trigger="hover"
        placement={placement}
        offset={4}
        raw
        open={popOpen}
        onOpenChange={setPopOpen}
        popupClassName="aero-menu-popup-popover"
      >
        {titleContent}
      </Popover>
    </li>
  );
};

// ─── Divider ───

const MenuDivider: React.FC = () => <li className="aero-menu-divider" role="separator" />;

// ─── Group ───

const MenuGroup: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const ctx = useContext(MenuContext);
  if (ctx.collapsed) return null;
  return (
    <li className="aero-menu-group">
      <div className="aero-menu-group__title">{item.label}</div>
      {item.children && (
        <ul className="aero-menu-group__list" role="group">
          {item.children.map(child => renderItem(child))}
        </ul>
      )}
    </li>
  );
};

// ─── 渲染分发 ───

function renderItem(item: MenuItemType): React.ReactNode {
  if (item.type === 'divider') return <MenuDivider key={item.key} />;
  if (item.type === 'group') return <MenuGroup key={item.key} item={item} />;
  if (item.children && item.children.length > 0) {
    return <SubMenuSwitch key={item.key} item={item} />;
  }
  return <MenuItem key={item.key} item={item} />;
}

// 根据 context 决定用 inline 还是 popover
const SubMenuSwitch: React.FC<{ item: MenuItemType }> = ({ item }) => {
  const ctx = useContext(MenuContext);
  if (ctx.mode === 'horizontal' || ctx.collapsed) {
    return <SubMenuPopover item={item} />;
  }
  return <SubMenuInline item={item} />;
};

// ─── Menu 主组件 ───

const Menu: React.FC<MenuProps> = ({
  items,
  selectedKey,
  defaultSelectedKey = '',
  openKeys,
  defaultOpenKeys = [],
  onSelect,
  onOpenChange,
  mode = 'vertical',
  collapsed = false,
  className,
  style,
}) => {
  // selected
  const isSelectedControlled = selectedKey !== undefined;
  const [internalSelected, setInternalSelected] = useState(defaultSelectedKey);
  const currentSelected = isSelectedControlled ? selectedKey! : internalSelected;

  // openKeys
  const isOpenControlled = openKeys !== undefined;
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenKeys);
  const currentOpen = isOpenControlled ? openKeys! : internalOpen;

  const handleSelect = useCallback((key: string) => {
    if (!isSelectedControlled) setInternalSelected(key);
    onSelect?.(key);
  }, [isSelectedControlled, onSelect]);

  const toggleOpen = useCallback((key: string) => {
    const next = currentOpen.includes(key)
      ? currentOpen.filter(k => k !== key)
      : [...currentOpen, key];
    if (!isOpenControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [currentOpen, isOpenControlled, onOpenChange]);

  const ctxValue = useMemo<MenuContextValue>(() => ({
    mode,
    collapsed: mode === 'vertical' && collapsed,
    selectedKey: currentSelected,
    openKeys: currentOpen,
    onSelect: handleSelect,
    toggleOpen,
    level: 0,
  }), [mode, collapsed, currentSelected, currentOpen, handleSelect, toggleOpen]);

  const cls = [
    'aero-menu',
    `aero-menu--${mode}`,
    collapsed && mode === 'vertical' ? 'aero-menu--collapsed' : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <ul className={cls} style={style} role="menu">
      <MenuContext.Provider value={ctxValue}>
        {items.map(item => renderItem(item))}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;
