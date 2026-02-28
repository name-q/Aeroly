import React, { useState } from 'react';
import { useSize } from '../ConfigProvider/useConfig';
import './index.less';

export interface SwitchProps {
  /** Whether开启（Controlled） */
  checked?: boolean;
  /** DefaultWhether开启（uncontrolled) */
  defaultChecked?: boolean;
  /** Whether disabled */
  disabled?: boolean;
  /** Whether loading */
  loading?: boolean;
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** 开启时的文案 */
  checkedText?: React.ReactNode;
  /** 关闭时的文案 */
  uncheckedText?: React.ReactNode;
  /** Change callback */
  onChange?: (checked: boolean) => void;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  disabled = false,
  loading = false,
  size: sizeProp,
  checkedText,
  uncheckedText,
  onChange,
  className,
  style,
}) => {
  const size = useSize(sizeProp);
  const isControlled = checked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = isControlled ? checked! : internalChecked;
  const isDisabled = disabled || loading;

  const handleClick = () => {
    if (isDisabled) return;
    const next = !isChecked;
    if (!isControlled) {
      setInternalChecked(next);
    }
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const classNames = [
    'aero-switch',
    `aero-switch--${size}`,
    isChecked ? 'aero-switch--checked' : '',
    isDisabled ? 'aero-switch--disabled' : '',
    loading ? 'aero-switch--loading' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const hasText = checkedText !== undefined || uncheckedText !== undefined;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      className={classNames}
      style={style}
      disabled={isDisabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {hasText && (
        <span className="aero-switch-text">
          {/* Render both labels, grid overlap takes the wider one to set width */}
          <span className={`aero-switch-text-inner${isChecked ? ' aero-switch-text-inner--active' : ''}`}>
            {checkedText}
          </span>
          <span className={`aero-switch-text-inner${!isChecked ? ' aero-switch-text-inner--active' : ''}`}>
            {uncheckedText}
          </span>
        </span>
      )}
      <span className="aero-switch-handle">
        {loading && <span className="aero-switch-spinner" />}
      </span>
    </button>
  );
};

(Switch as any).__AERO_CHECKABLE = true;
(Switch as any).__AERO_FORM_CONTROL = true;

export default Switch;
