import React, { useContext, useEffect, useCallback, useRef, useSyncExternalStore } from 'react';
import { FormContext } from './FormContext';
import type { Rule, NamePath, FieldState } from './FormStore';
import { toNameKey } from './FormStore';

export interface FormItemProps {
  name?: NamePath;
  label?: React.ReactNode;
  rules?: Rule[];
  required?: boolean;
  dependencies?: NamePath[];
  validateTrigger?: string | string[];
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (...args: any[]) => any;
  extra?: React.ReactNode;
  help?: React.ReactNode;
  hidden?: boolean;
  noStyle?: boolean;
  children?: React.ReactNode | ((fieldState: FieldState) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
}

const defaultGetValueFromEvent = (...args: any[]) => args[0];

const EMPTY_FIELD_STATE: FieldState = { value: undefined, errors: [], warnings: [], touched: false, validating: false };

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  rules,
  required,
  dependencies,
  validateTrigger: itemValidateTrigger,
  valuePropName = 'value',
  trigger = 'onChange',
  getValueFromEvent = defaultGetValueFromEvent,
  extra,
  help,
  hidden = false,
  noStyle = false,
  children,
  className,
  style,
}) => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error('Form.Item must be used inside a Form');
  }

  const { form, layout, labelWidth, labelAlign, disabled, size, requiredMark, validateTrigger: formValidateTrigger } = ctx;
  const { __INTERNAL__: internal } = form;

  const nameKey = name !== undefined ? toNameKey(name) : undefined;

  // 合并校验时机
  const mergedTrigger = itemValidateTrigger || formValidateTrigger || 'onChange';
  const triggerList = Array.isArray(mergedTrigger) ? mergedTrigger : [mergedTrigger];

  // 判断是否必填（视觉标记）
  const isRequired = required !== undefined ? required : rules?.some((r) => r.required) || false;

  // 用 ref 保存最新的 props，避免 useCallback 依赖变化导致不必要的重渲染
  const latestRef = useRef({ nameKey, name, form, getValueFromEvent, triggerList });
  latestRef.current = { nameKey, name, form, getValueFromEvent, triggerList };

  // 注册字段
  useEffect(() => {
    if (!nameKey) return;
    return internal.registerField(nameKey, rules || []);
  }, [nameKey, rules, internal]);

  // 订阅字段状态（useSyncExternalStore）
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!nameKey) return () => {};
      return internal.subscribe(nameKey, onStoreChange);
    },
    [nameKey, internal],
  );

  const getSnapshot = useCallback(() => {
    if (!nameKey) return EMPTY_FIELD_STATE;
    return internal.getFieldState(nameKey);
  }, [nameKey, internal]);

  const fieldState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  // 依赖字段变化时重新校验
  useEffect(() => {
    if (!dependencies || !nameKey) return;
    const unsubs = dependencies.map((dep) => {
      const depKey = toNameKey(dep);
      return internal.subscribe(depKey, () => {
        form.validateFields([name!]).catch(() => {});
      });
    });
    return () => unsubs.forEach((fn) => fn());
  }, [dependencies, nameKey, internal, form, name]);

  // 值变化处理 — 使用稳定引用，通过 ref 读取最新 props
  const handleChange = useCallback(
    (...args: any[]) => {
      const { nameKey: nk, name: n, form: f, getValueFromEvent: gve, triggerList: tl } = latestRef.current;
      if (!nk) return;
      const val = gve(...args);
      f.setFieldValue(n!, val);

      if (tl.includes('onChange')) {
        Promise.resolve().then(() => {
          f.validateFields([n!]).catch(() => {});
        });
      }
    },
    [], // 稳定引用
  );

  const handleBlur = useCallback(() => {
    const { nameKey: nk, name: n, form: f, triggerList: tl } = latestRef.current;
    if (!nk) return;
    if (tl.includes('onBlur')) {
      f.validateFields([n!]).catch(() => {});
    }
  }, []);

  // 渲染子元素
  const renderChild = () => {
    // render props
    if (typeof children === 'function') {
      return children(fieldState);
    }

    // 无 name 时不注入 props
    if (!nameKey) return children;

    const child = React.Children.only(children) as React.ReactElement<any>;
    if (!React.isValidElement(child)) return children;

    // 检测 checkable 组件
    const childType = child.type as any;
    const isCheckable = childType?.__AERO_CHECKABLE === true;

    // 确保注入的值始终是 defined，避免子控件回退到非受控模式
    const rawValue = fieldState.value;
    const controlledValue = isCheckable
      ? (rawValue ?? false)
      : (rawValue ?? '');

    const injectedProps: Record<string, any> = {
      [isCheckable ? 'checked' : valuePropName]: controlledValue,
      [trigger]: (...args: any[]) => {
        handleChange(...args);
        child.props[trigger]?.(...args);
      },
      onBlur: (...args: any[]) => {
        handleBlur();
        child.props.onBlur?.(...args);
      },
      disabled: child.props.disabled ?? disabled,
    };

    // 注入 status
    if (fieldState.errors.length > 0) {
      injectedProps.status = 'error';
    } else if (fieldState.warnings.length > 0) {
      injectedProps.status = 'warning';
    }

    // 注入 size
    if (size && child.props.size === undefined) {
      injectedProps.size = size;
    }

    return React.cloneElement(child, injectedProps);
  };

  // 错误/警告信息
  const displayErrors = help !== undefined ? null : fieldState.errors;
  const displayWarnings = help !== undefined ? null : fieldState.warnings;

  if (noStyle) {
    return <>{renderChild()}</>;
  }

  const itemCls = [
    'aero-form-item',
    `aero-form-item--${layout}`,
    fieldState.errors.length > 0 ? 'aero-form-item--error' : '',
    fieldState.warnings.length > 0 && fieldState.errors.length === 0 ? 'aero-form-item--warning' : '',
    hidden ? 'aero-form-item--hidden' : '',
    label === undefined ? 'aero-form-item--no-label' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  const labelStyle: React.CSSProperties | undefined =
    layout === 'horizontal' || layout === 'inline'
      ? {
          width: labelWidth
            ? (typeof labelWidth === 'number' ? `${labelWidth}px` : labelWidth)
            : 90,
          textAlign: labelAlign,
        }
      : labelAlign !== 'left'
        ? { textAlign: labelAlign }
        : undefined;

  // requiredMark=true 时，始终保留星号占位，非必填用 visibility:hidden
  const showRequiredMark = requiredMark === true;

  return (
    <div className={itemCls} style={style}>
      {label !== undefined && (
        <label className="aero-form-item-label" style={labelStyle}>
          {showRequiredMark && (
            <span
              className="aero-form-item-required"
              style={isRequired ? undefined : { visibility: 'hidden' }}
            >*</span>
          )}
          <span className="aero-form-item-label-text">{label}</span>
          {requiredMark === 'optional' && !isRequired && (
            <span className="aero-form-item-optional">（选填）</span>
          )}
        </label>
      )}
      <div className="aero-form-item-control">
        <div className="aero-form-item-control-input">{renderChild()}</div>
        {help !== undefined && (
          <div className="aero-form-item-help">{help}</div>
        )}
        {displayErrors && displayErrors.length > 0 && (
          <div className="aero-form-item-error">
            {displayErrors.map((msg, i) => (
              <div key={i} className="aero-form-item-error-message">{msg}</div>
            ))}
          </div>
        )}
        {displayWarnings && displayWarnings.length > 0 && (
          <div className="aero-form-item-warning">
            {displayWarnings.map((msg, i) => (
              <div key={i} className="aero-form-item-warning-message">{msg}</div>
            ))}
          </div>
        )}
        {extra && <div className="aero-form-item-extra">{extra}</div>}
      </div>
    </div>
  );
};

export default FormItem;
