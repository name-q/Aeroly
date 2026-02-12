import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, X } from 'lucide-react';
import Icon from '../Icon';
import './index.less';

// ---- Types ----

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  /** 标题 */
  title: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: LucideIcon;
  /** 单独指定状态，优先级高于 current 推断 */
  status?: StepStatus;
  /** 是否禁用点击 */
  disabled?: boolean;
}

export interface StepsProps {
  /** 步骤数据 */
  items: StepItem[];
  /** 当前步骤（从 1 开始） */
  current?: number;
  /** 当前步骤的状态 */
  status?: StepStatus;
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 尺寸 */
  size?: 'small' | 'medium';
  /** 标签位置（仅水平方向生效） */
  labelPlacement?: 'horizontal' | 'vertical';
  /** 是否可点击切换 */
  clickable?: boolean;
  /** 点击步骤回调（返回从 1 开始的步骤号） */
  onChange?: (current: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

function resolveStatus(
  index: number,
  currentIndex: number,
  globalStatus: StepStatus,
  itemStatus?: StepStatus,
): StepStatus {
  if (itemStatus) return itemStatus;
  if (index < currentIndex) return 'finish';
  if (index === currentIndex) return globalStatus;
  return 'wait';
}

const Steps: React.FC<StepsProps> = ({
  items,
  current = 1,
  status = 'process',
  direction = 'horizontal',
  size = 'medium',
  labelPlacement = 'horizontal',
  clickable = false,
  onChange,
  className,
  style,
}) => {
  const currentIndex = current - 1;
  const isLabelVertical = direction === 'horizontal' && labelPlacement === 'vertical';

  const cls = [
    'aero-steps',
    `aero-steps--${direction}`,
    `aero-steps--${size}`,
    direction === 'horizontal' ? `aero-steps--label-${labelPlacement}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (index: number, disabled?: boolean) => {
    if (!clickable || disabled) return;
    onChange?.(index + 1);
  };

  return (
    <div className={cls} style={style} role="list">
      {items.map((item, index) => {
        const stepStatus = resolveStatus(index, currentIndex, status, item.status);
        const isLast = index === items.length - 1;
        const showTail = !isLast;

        const itemCls = [
          'aero-steps-item',
          `aero-steps-item--${stepStatus}`,
          isLast ? 'aero-steps-item--last' : '',
          clickable && !item.disabled ? 'aero-steps-item--clickable' : '',
          item.disabled ? 'aero-steps-item--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        let iconContent: React.ReactNode;
        if (item.icon) {
          iconContent = <Icon icon={item.icon} size={size === 'small' ? 14 : 16} />;
        } else if (stepStatus === 'finish') {
          iconContent = <Icon icon={Check} size={size === 'small' ? 12 : 14} />;
        } else if (stepStatus === 'error') {
          iconContent = <Icon icon={X} size={size === 'small' ? 12 : 14} />;
        } else {
          iconContent = <span className="aero-steps-item-icon__number">{index + 1}</span>;
        }

        if (direction === 'vertical') {
          // 垂直模式：绝对定位 tail
          return (
            <div
              key={index}
              className={itemCls}
              role="listitem"
              onClick={() => handleClick(index, item.disabled)}
            >
              {showTail && <div className="aero-steps-item-tail" />}
              <div className="aero-steps-item-container">
                <div className="aero-steps-item-icon">{iconContent}</div>
                <div className="aero-steps-item-content">
                  <div className="aero-steps-item-title">{item.title}</div>
                  {item.description && (
                    <div className="aero-steps-item-description">{item.description}</div>
                  )}
                </div>
              </div>
            </div>
          );
        }

        if (isLabelVertical) {
          // 水平 label-vertical：icon 居中，线绝对定位从图标右侧到 item 右边缘
          return (
            <div
              key={index}
              className={itemCls}
              role="listitem"
              onClick={() => handleClick(index, item.disabled)}
            >
              {showTail && <div className="aero-steps-item-tail" />}
              <div className="aero-steps-item-icon-row">
                <div className="aero-steps-item-icon">{iconContent}</div>
              </div>
              <div className="aero-steps-item-content">
                <div className="aero-steps-item-title">{item.title}</div>
                {item.description && (
                  <div className="aero-steps-item-description">{item.description}</div>
                )}
              </div>
            </div>
          );
        }

        // 水平 label-horizontal：icon + [title + tail-inline] + description
        return (
          <div
            key={index}
            className={itemCls}
            role="listitem"
            onClick={() => handleClick(index, item.disabled)}
          >
            <div className="aero-steps-item-container">
              <div className="aero-steps-item-icon">{iconContent}</div>
              <div className="aero-steps-item-content">
                <div className="aero-steps-item-title">
                  <span>{item.title}</span>
                  {showTail && <span className="aero-steps-item-tail-inline" />}
                </div>
                {item.description && (
                  <div className="aero-steps-item-description">{item.description}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
