import React from 'react';
import Popover from '../Popover';
import type { PopoverPlacement } from '../Popover';
import './index.less';

export type TooltipPlacement = PopoverPlacement;

export interface TooltipProps {
  /** Tooltip content */
  title: React.ReactNode;
  /** Placement */
  placement?: TooltipPlacement;
  /** Whether visible (controlled) */
  open?: boolean;
  /** DefaultWhether visible */
  defaultOpen?: boolean;
  /** Visibility change callback */
  onOpenChange?: (open: boolean) => void;
  /** Gap between popup and trigger */
  offset?: number;
  /** Trigger element */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  open,
  defaultOpen,
  onOpenChange,
  offset = 8,
  children,
  className,
  style,
}) => {
  if (!title && title !== 0) return <>{children}</>;

  const cls = ['aero-tooltip', className].filter(Boolean).join(' ');

  return (
    <Popover
      content={<span className="aero-tooltip-text">{title}</span>}
      placement={placement}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      offset={offset}
      className={cls}
      style={style}
    >
      {children}
    </Popover>
  );
};

export default Tooltip;
