import React, { useState, useRef, useEffect, useCallback } from 'react';
import './index.less';

export interface SegmentedOption {
  /** 选项值 */
  value: string | number;
  /** 显示内容 */
  label: React.ReactNode;
  /** 是否禁用该选项 */
  disabled?: boolean;
}

export interface SegmentedProps {
  /** 选项数据，支持字符串数组或对象数组 */
  options: (string | number | SegmentedOption)[];
  /** 当前选中值（受控） */
  value?: string | number;
  /** 默认选中值（非受控） */
  defaultValue?: string | number;
  /** 选中变化回调 */
  onChange?: (value: string | number) => void;
  /** 是否撑满父容器宽度 */
  block?: boolean;
  /** 是否整体禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/** 将简写选项统一为 SegmentedOption 格式 */
function normalizeOption(option: string | number | SegmentedOption): SegmentedOption {
  if (typeof option === 'string' || typeof option === 'number') {
    return { value: option, label: option };
  }
  return option;
}

const Segmented: React.FC<SegmentedProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  block = false,
  disabled = false,
  size = 'medium',
  className,
  style,
}) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(
    defaultValue ?? normalizeOption(options[0]).value,
  );
  const currentValue = isControlled ? value : internalValue;

  const normalizedOptions = options.map(normalizeOption);

  // 滑块定位
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbStyle, setThumbStyle] = useState<React.CSSProperties>({});

  const updateThumb = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeIndex = normalizedOptions.findIndex((o) => o.value === currentValue);
    if (activeIndex < 0) return;
    const items = container.querySelectorAll<HTMLElement>('.aero-segmented-item');
    const activeItem = items[activeIndex];
    if (!activeItem) return;
    setThumbStyle({
      width: activeItem.offsetWidth,
      transform: `translateX(${activeItem.offsetLeft}px)`,
    });
  }, [currentValue, normalizedOptions]);

  useEffect(() => {
    updateThumb();
  }, [updateThumb]);

  // 窗口 resize 时重新计算
  useEffect(() => {
    window.addEventListener('resize', updateThumb);
    return () => window.removeEventListener('resize', updateThumb);
  }, [updateThumb]);

  const handleSelect = (optionValue: string | number, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return;
    if (!isControlled) {
      setInternalValue(optionValue);
    }
    onChange?.(optionValue);
  };

  const classNames = [
    'aero-segmented',
    `aero-segmented--${size}`,
    block ? 'aero-segmented--block' : '',
    disabled ? 'aero-segmented--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style} ref={containerRef}>
      <div className="aero-segmented-thumb" style={thumbStyle} />
      {normalizedOptions.map((option) => {
        const isActive = option.value === currentValue;
        const isItemDisabled = disabled || option.disabled;
        const itemClassNames = [
          'aero-segmented-item',
          isActive ? 'aero-segmented-item--active' : '',
          isItemDisabled ? 'aero-segmented-item--disabled' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <div
            key={option.value}
            className={itemClassNames}
            onClick={() => handleSelect(option.value, option.disabled)}
          >
            <span className="aero-segmented-item-label">{option.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Segmented;
