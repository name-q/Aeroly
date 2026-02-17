import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Check, X } from 'lucide-react';
import Icon from '../Icon';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

export interface StepItem {
  /** Title */
  title: React.ReactNode;
  /** Description */
  description?: React.ReactNode;
  /** Icon */
  icon?: LucideIcon;
  /** 单独指定Status，优先级高于 current 推断 */
  status?: StepStatus;
  /** Whether disabled点击 */
  disabled?: boolean;
}

export interface StepsProps {
  /** 步骤数据 */
  items: StepItem[];
  /** Current step（从 1 开始） */
  current?: number;
  /** Current step的Status */
  status?: StepStatus;
  /** Direction */
  direction?: 'horizontal' | 'vertical';
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Label placement（仅水平Direction生效） */
  labelPlacement?: 'horizontal' | 'vertical';
  /** Whether clickable切换 */
  clickable?: boolean;
  /** 点击步骤Callback（返回从 1 开始的步骤号） */
  onChange?: (current: number) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
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
  size: sizeProp,
  labelPlacement = 'horizontal',
  clickable = false,
  onChange,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
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
          iconContent = <Icon icon={item.icon} size={size === 'small' ? 14 : size === 'large' ? 20 : 16} />;
        } else if (stepStatus === 'finish') {
          iconContent = <Icon icon={Check} size={size === 'small' ? 12 : size === 'large' ? 18 : 14} />;
        } else if (stepStatus === 'error') {
          iconContent = <Icon icon={X} size={size === 'small' ? 12 : size === 'large' ? 18 : 14} />;
        } else {
          iconContent = <span className="aero-steps-item-icon__number">{index + 1}</span>;
        }

        if (direction === 'vertical') {
          // 垂直Mode：绝对定位 tail
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
          // 水平 label-vertical：icon 居中，线绝对定位从Icon右侧到 item 右边缘
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
