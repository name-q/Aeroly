import React, { useCallback } from 'react';
import Popover from '../Popover';
import type { PopoverPlacement } from '../Popover';
import Icon from '../Icon';
import { ChevronRight, Check } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useLiquidGlass, LiquidGlassDecor } from '../liquid-glass';
import './index.less';

// ---- Types ----

export interface DropdownItem {
  /** Unique identifier */
  key: string;
  /** Display text */
  label: React.ReactNode;
  /** Icon */
  icon?: LucideIcon;
  /** Whether disabled */
  disabled?: boolean;
  /** Danger action (red) */
  danger?: boolean;
  /** Divider */
  type?: 'divider';
  /** Submenu */
  children?: DropdownItem[];
}

export interface DropdownProps {
  /** Menu item */
  items: DropdownItem[];
  /** Menu item click callback */
  onSelect?: (key: string) => void;
  /** Current selected item (highlighted) */
  selectedKey?: string;
  /** Trigger mode */
  trigger?: 'hover' | 'click';
  /** Placement */
  placement?: PopoverPlacement;
  /** Whether visible (controlled) */
  open?: boolean;
  /** Visibility change callback */
  onOpenChange?: (open: boolean) => void;
  /** Whether disabled */
  disabled?: boolean;
  /** Trigger element */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

// ---- SubMenu (hover to expand submenu) ----

const SubMenu: React.FC<{
  item: DropdownItem;
  selectedKey?: string;
  onSelect: (key: string) => void;
}> = ({ item, selectedKey, onSelect }) => {
  const lg = useLiquidGlass({ zIndex: 1050 });
  return (
    <Popover
      trigger="hover"
      placement="right"
      offset={4}
      raw
      content={
        <div
          ref={lg.refs.surfaceRef}
          className={`aero-dropdown-menu aero-lg-surface${lg.isFull ? ' aero-lg-surface--full' : ''}`}
          style={lg.vars}
          {...lg.surfaceProps}
        >
          {lg.isFull && <div ref={lg.refs.warpRef} className="aero-lg-warp" />}
          <div className="aero-lg-content">
            {item.children!.map((child) => (
              <DropdownMenuItem
                key={child.key}
                item={child}
                selectedKey={selectedKey}
                onSelect={onSelect}
              />
            ))}
          </div>
          <LiquidGlassDecor refs={lg.refs} zIndex={1050} />
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

  const lg = useLiquidGlass({ zIndex: 1050 });

  if (disabled) {
    return <>{children}</>;
  }

  const menu = (
    <div
      ref={lg.refs.surfaceRef}
      className={`aero-dropdown-menu aero-lg-surface${lg.isFull ? ' aero-lg-surface--full' : ''} ${className || ''}`}
      style={{ ...style, ...lg.vars }}
      {...lg.surfaceProps}
    >
      {lg.isFull && <div ref={lg.refs.warpRef} className="aero-lg-warp" />}
      <div className="aero-lg-content">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={item.key || `divider-${index}`}
            item={item}
            selectedKey={selectedKey}
            onSelect={handleSelect}
          />
        ))}
      </div>
      <LiquidGlassDecor refs={lg.refs} zIndex={1050} />
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
