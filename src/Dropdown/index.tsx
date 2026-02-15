import React, { useCallback } from 'react';
import Popover from '../Popover';
import type { PopoverPlacement } from '../Popover';
import Icon from '../Icon';
import { ChevronRight, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './index.less';

// ---- Types ----

export interface DropdownItem {
  /** 唯一标识 */
  key: string;
  /** 显示文本 */
  label: React.ReactNode;
  /** 图标 */
  icon?: LucideIcon;
  /** 是否禁用 */
  disabled?: boolean;
  /** 危险操作（红色） */
  danger?: boolean;
  /** 分割线 */
  type?: 'divider';
  /** 子菜单 */
  children?: DropdownItem[];
}

export interface DropdownProps {
  /** 菜单项 */
  items: DropdownItem[];
  /** 点击菜单项回调 */
  onSelect?: (key: string) => void;
  /** 当前选中项（高亮） */
  selectedKey?: string;
  /** 触发方式 */
  trigger?: 'hover' | 'click';
  /** 弹出方向 */
  placement?: PopoverPlacement;
  /** 是否显示（受控） */
  open?: boolean;
  /** 显隐变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 触发元素 */
  children: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ---- SubMenu (hover 展开子菜单) ----

const SubMenu: React.FC<{
  item: DropdownItem;
  selectedKey?: string;
  onSelect: (key: string) => void;
}> = ({ item, selectedKey, onSelect }) => {
  return (
    <Popover
      trigger="hover"
      placement="right"
      offset={4}
      raw
      content={
        <div className="aero-dropdown-menu">
          {item.children!.map((child) => (
            <DropdownMenuItem
              key={child.key}
              item={child}
              selectedKey={selectedKey}
              onSelect={onSelect}
            />
          ))}
        </div>
      }
    >
      <div
        className={[
          'aero-dropdown-item',
          'aero-dropdown-item--submenu',
          item.disabled ? 'aero-dropdown-item--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {item.icon && <Icon icon={item.icon} size={15} className="aero-dropdown-item-icon" />}
        <span className="aero-dropdown-item-label">{item.label}</span>
        <Icon icon={ChevronRight} size={13} className="aero-dropdown-item-arrow" />
      </div>
    </Popover>
  );
};

// ---- MenuItem ----

const DropdownMenuItem: React.FC<{
  item: DropdownItem;
  selectedKey?: string;
  onSelect: (key: string) => void;
}> = ({ item, selectedKey, onSelect }) => {
  if (item.type === 'divider') {
    return <div className="aero-dropdown-divider" />;
  }

  if (item.children && item.children.length > 0) {
    return <SubMenu item={item} selectedKey={selectedKey} onSelect={onSelect} />;
  }

  const isSelected = selectedKey === item.key;

  return (
    <div
      className={[
        'aero-dropdown-item',
        item.disabled ? 'aero-dropdown-item--disabled' : '',
        item.danger ? 'aero-dropdown-item--danger' : '',
        isSelected ? 'aero-dropdown-item--selected' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => {
        if (!item.disabled) onSelect(item.key);
      }}
    >
      {item.icon && <Icon icon={item.icon} size={15} className="aero-dropdown-item-icon" />}
      <span className="aero-dropdown-item-label">{item.label}</span>
      {isSelected && <Icon icon={Check} size={14} className="aero-dropdown-item-check" />}
    </div>
  );
};

// ---- Dropdown ----

const Dropdown: React.FC<DropdownProps> = ({
  items,
  onSelect,
  selectedKey,
  trigger = 'hover',
  placement = 'bottom',
  open,
  onOpenChange,
  disabled = false,
  children,
  className,
  style,
}) => {
  const handleSelect = useCallback(
    (key: string) => {
      onSelect?.(key);
      onOpenChange?.(false);
    },
    [onSelect, onOpenChange],
  );

  if (disabled) {
    return <>{children}</>;
  }

  const menu = (
    <div className={['aero-dropdown-menu', className].filter(Boolean).join(' ')} style={style}>
      {items.map((item, index) => (
        <DropdownMenuItem
          key={item.key || `divider-${index}`}
          item={item}
          selectedKey={selectedKey}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );

  return (
    <Popover
      content={menu}
      trigger={trigger}
      placement={placement}
      open={open}
      onOpenChange={onOpenChange}
      raw
      offset={6}
    >
      {children}
    </Popover>
  );
};

export default Dropdown;
