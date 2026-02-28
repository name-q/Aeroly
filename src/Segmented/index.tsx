import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export interface SegmentedOption {
  /** Option value */
  value: string | number;
  /** Display content */
  label: React.ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface SegmentedProps {
  /** Options data, supports string array or object array */
  options: (string | number | SegmentedOption)[];
  /** Current selected value (controlled) */
  value?: string | number;
  /** Default selected value (uncontrolled) */
  defaultValue?: string | number;
  /** Selection change callback */
  onChange?: (value: string | number) => void;
  /** Whether to fill parent container width */
  block?: boolean;
  /** Whether to disable all */
  disabled?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

/** Normalize shorthand options to SegmentedOption format */
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
  size: sizeProp,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | number>(
    defaultValue ?? normalizeOption(options[0]).value,
  );
  const currentValue = isControlled ? value : internalValue;

  const normalizedOptions = options.map(normalizeOption);

  // Slider positioning
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

  // Recalculate on window resize
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

(Segmented as any).__AERO_FORM_CONTROL = true;

export default Segmented;
