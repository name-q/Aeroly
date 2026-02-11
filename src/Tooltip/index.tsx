import React from 'react';
import Popover from '../Popover';
import type { PopoverPlacement } from '../Popover';
import './index.less';

export type TooltipPlacement = PopoverPlacement;

export interface TooltipProps {
  /** 提示内容 */
  title: React.ReactNode;
  /** 弹出方向 */
  placement?: TooltipPlacement;
  /** 是否显示（受控） */
  open?: boolean;
  /** 默认是否显示 */
  defaultOpen?: boolean;
  /** 显隐变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 弹层与触发元素的间距 */
  offset?: number;
  /** 触发元素 */
  children: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
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
