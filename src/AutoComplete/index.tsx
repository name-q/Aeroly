import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Search, Loader } from 'lucide-react';
import Icon from '../Icon';
import { useDropdownPosition } from '../utils';
import { useSize, useLocale } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface AutoCompleteOption {
  /** Option value */
  value: string;
  /** Display text (defaults to value) */
  label?: React.ReactNode;
  /** Whether disabled */
  disabled?: boolean;
}

export interface AutoCompleteProps {
  /** Current value (controlled) */
  value?: string;
  /** Default value */
  defaultValue?: string;
  /** Value change callback (triggered by input or selection) */
  onChange?: (value: string) => void;
  /** Selection callback */
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  /** Options list */
  options?: AutoCompleteOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Whether disabled */
  disabled?: boolean;
  /** Allow clear */
  allowClear?: boolean;
  /** Loading */
  loading?: boolean;
  /** Content when no match found */
  notFoundContent?: React.ReactNode;
  /** Custom filter (default prefix match, pass false to disable built-in filter) */
  filterOption?: boolean | ((input: string, option: AutoCompleteOption) => boolean);
  /** Size */
  size?: 'small' | 'medium' | 'large';
  /** Status */
  status?: 'error' | 'warning';
  /** Prefix icon */
  prefix?: React.ReactNode;
  /** Custom class name */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Blur callback */
  onBlur?: () => void;
  /** Focus callback */
  onFocus?: () => void;
}

// ---- Default filter ----

const defaultFilter = (input: string, option: AutoCompleteOption): boolean => {
  const text = typeof option.label === 'string' ? option.label : option.value;
  return text.toLowerCase().includes(input.toLowerCase());
};

// ---- AutoComplete ----

const AutoComplete: React.FC<AutoCompleteProps> = ({
  value,
  defaultValue = '',
  onChange,
  onSelect,
  options = [],
  placeholder,
  disabled = false,
  allowClear = false,
  loading = false,
  notFoundContent,
  filterOption = true,
  size: sizeProp,
  status,
  prefix,
  className,
  style,
  onBlur,
  onFocus,
}) => {
  const size = useSize(sizeProp);
  const localeAutoComplete = useLocale('AutoComplete');
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = isControlled ? value! : internalValue;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const { placement, alignment } = useDropdownPosition(wrapRef, dropdownRef, mounted);

  // ---- Filter options ----
  const filteredOptions = useMemo(() => {
    if (!currentValue || filterOption === false) return options;
    const fn = typeof filterOption === 'function' ? filterOption : defaultFilter;
    return options.filter((opt) => fn(currentValue, opt));
  }, [options, currentValue, filterOption]);

  // ---- Update value ----
  const updateValue = useCallback(
    (val: string) => {
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    },
    [isControlled, onChange],
  );

  // ---- Open/close animation ----
  useEffect(() => {
    if (open) {
      setMounted(true);
      setActiveIndex(-1);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
    }
  }, [open]);

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    if (!open && e.propertyName === 'opacity') {
      setMounted(false);
    }
  };

  // ---- Click outside to close ----
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // ---- Input ----
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updateValue(val);
    if (!open) setOpen(true);
  };

  // ---- Select ----
  const handleSelect = useCallback(
    (opt: AutoCompleteOption) => {
      if (opt.disabled) return;
      updateValue(opt.value);
      onSelect?.(opt.value, opt);
      setOpen(false);
      inputRef.current?.blur();
    },
    [updateValue, onSelect],
  );

  // ---- Clear ----
  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateValue('');
    inputRef.current?.focus();
  };

  // ---- Keyboard navigation ----
  const navigable = useMemo(
    () => filteredOptions.filter((o) => !o.disabled),
    [filteredOptions],
  );

  const scrollToActive = useCallback((index: number) => {
    const container = optionsRef.current;
    if (!container) return;
    const items = container.querySelectorAll('[data-selectable]');
    const target = items[index] as HTMLElement | undefined;
    if (target) target.scrollIntoView({ block: 'nearest' });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        const next = activeIndex < navigable.length - 1 ? activeIndex + 1 : 0;
        setActiveIndex(next);
        scrollToActive(next);
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        if (!open) { setOpen(true); return; }
        const prev = activeIndex > 0 ? activeIndex - 1 : navigable.length - 1;
        setActiveIndex(prev);
        scrollToActive(prev);
        break;
      }
      case 'Enter': {
        if (open && activeIndex >= 0 && activeIndex < navigable.length) {
          e.preventDefault();
          handleSelect(navigable[activeIndex]);
        }
        break;
      }
      case 'Escape': {
        if (open) {
          e.preventDefault();
          setOpen(false);
        }
        break;
      }
    }
  };

  // ---- Whether to show dropdown ----
  const showDropdown = open && (filteredOptions.length > 0 || loading || notFoundContent);

  const iconSize = size === 'small' ? 14 : size === 'large' ? 18 : 16;

  const rootCls = [
    'aero-autocomplete',
    `aero-autocomplete--${size}`,
    open ? 'aero-autocomplete--open' : '',
    disabled ? 'aero-autocomplete--disabled' : '',
    status ? `aero-autocomplete--${status}` : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootCls} style={style} ref={wrapRef}>
      <div className="aero-autocomplete-input">
        {prefix && <span className="aero-autocomplete-prefix">{prefix}</span>}
        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleInput}
          onFocus={() => {
            if (!disabled && filteredOptions.length > 0) setOpen(true);
            onFocus?.();
          }}
          onBlur={() => onBlur?.()}
          onKeyDown={handleKeyDown}
          className="aero-autocomplete-input-inner"
          autoComplete="off"
        />
        {loading && (
          <span className="aero-autocomplete-suffix">
            <Icon icon={Loader} size={iconSize - 2} spin />
          </span>
        )}
        {allowClear && currentValue && !loading && !disabled && (
          <span className="aero-autocomplete-suffix aero-autocomplete-clear" onClick={handleClear}>
            ×
          </span>
        )}
      </div>

      {mounted && (
        <div
          ref={dropdownRef}
          className={[
            'aero-autocomplete-dropdown',
            `aero-autocomplete-dropdown--${placement}`,
            `aero-autocomplete-dropdown--${alignment}`,
            animating && showDropdown ? 'aero-autocomplete-dropdown--open' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          onTransitionEnd={handleTransitionEnd}
        >
          <div className="aero-autocomplete-options" ref={optionsRef}>
            {loading ? (
              <div className="aero-autocomplete-loading">
                <Icon icon={Loader} size={14} spin />
                <span>{localeAutoComplete.searching}</span>
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const navIdx = navigable.indexOf(opt);
                const active = navIdx >= 0 && navIdx === activeIndex;

                return (
                  <div
                    key={opt.value}
                    data-selectable={!opt.disabled ? '' : undefined}
                    className={[
                      'aero-autocomplete-option',
                      active ? 'aero-autocomplete-option--active' : '',
                      opt.disabled ? 'aero-autocomplete-option--disabled' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleSelect(opt)}
                    onMouseEnter={() => {
                      if (!opt.disabled && navIdx >= 0) setActiveIndex(navIdx);
                    }}
                  >
                    {opt.label ?? opt.value}
                  </div>
                );
              })
            ) : notFoundContent ? (
              <div className="aero-autocomplete-empty">{notFoundContent}</div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
