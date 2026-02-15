import React, { useState, useCallback, useRef } from 'react';
import { Star } from 'lucide-react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export interface RateProps {
  /** 当前值（受控） */
  value?: number;
  /** 默认值（非受控） */
  defaultValue?: number;
  /** 星星总数 */
  count?: number;
  /** 是否允许半选 */
  allowHalf?: boolean;
  /** 是否允许再次点击清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 自定义颜色，字符串或根据当前值动态返回颜色的函数 */
  color?: string | ((value: number) => string);
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 变化回调 */
  onChange?: (value: number) => void;
  /** hover 变化回调 */
  onHoverChange?: (value: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const sizeMap = { small: 16, medium: 22, large: 28 };

const Rate: React.FC<RateProps> = ({
  value,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  readOnly = false,
  size: sizeProp,
  color,
  icon,
  onChange,
  onHoverChange,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  // null = 没有 hover，number = hover 中的值（含 0）
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const currentValue = isControlled ? value! : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;
  const isInteractive = !disabled && !readOnly;
  const starRefs = useRef<(HTMLDivElement | null)[]>([]);

  const updateValue = useCallback(
    (val: number) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  const handleClick = (index: number, isLeft: boolean) => {
    if (!isInteractive) return;
    const newVal = allowHalf && isLeft ? index + 0.5 : index + 1;
    if (allowClear && newVal === currentValue) {
      updateValue(0);
    } else {
      updateValue(newVal);
    }
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    if (!isInteractive) return;
    if (allowHalf) {
      const el = starRefs.current[index];
      if (el) {
        const { left, width } = el.getBoundingClientRect();
        const isLeft = e.clientX - left < width / 2;
        const val = isLeft ? index + 0.5 : index + 1;
        setHoverValue(val);
        onHoverChange?.(val);
      }
    } else {
      setHoverValue(index + 1);
      onHoverChange?.(index + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!isInteractive) return;
    setHoverValue(null);
    onHoverChange?.(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isInteractive) return;
    const step = allowHalf ? 0.5 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      updateValue(Math.min(currentValue + step, count));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      updateValue(Math.max(currentValue - step, 0));
    }
  };

  const iconSize = sizeMap[size];

  // 解析颜色
  const resolvedColor = color
    ? typeof color === 'function' ? color(displayValue) : color
    : undefined;

  const classNames = [
    'aero-rate',
    `aero-rate--${size}`,
    disabled ? 'aero-rate--disabled' : '',
    readOnly ? 'aero-rate--readonly' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const renderStar = (index: number) => {
    const full = displayValue >= index + 1;
    const half = !full && displayValue >= index + 0.5;
    const active = full || half;

    const starCls = [
      'aero-rate-star',
      full ? 'aero-rate-star--full' : '',
      half ? 'aero-rate-star--half' : '',
      active ? 'aero-rate-star--active' : '',
    ]
      .filter(Boolean)
      .join(' ');

    const starIcon = icon || <Star size={iconSize} />;

    const secondStyle: React.CSSProperties | undefined = resolvedColor
      ? { color: resolvedColor }
      : undefined;

    return (
      <div
        key={index}
        ref={(el) => { starRefs.current[index] = el; }}
        className={starCls}
        onClick={(e) => {
          if (!isInteractive) return;
          const el = starRefs.current[index];
          if (el && allowHalf) {
            const { left, width } = el.getBoundingClientRect();
            handleClick(index, e.clientX - left < width / 2);
          } else {
            handleClick(index, false);
          }
        }}
        onMouseMove={(e) => handleMouseMove(e, index)}
      >
        <span className="aero-rate-star-first" aria-hidden="true">{starIcon}</span>
        <span className="aero-rate-star-second" style={secondStyle} aria-hidden="true">{starIcon}</span>
      </div>
    );
  };

  return (
    <div
      className={classNames}
      style={style}
      role="radiogroup"
      aria-label="rating"
      aria-valuenow={currentValue}
      aria-valuemin={0}
      aria-valuemax={count}
      tabIndex={isInteractive ? 0 : undefined}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      {Array.from({ length: count }, (_, i) => renderStar(i))}
    </div>
  );
};

export default Rate;
