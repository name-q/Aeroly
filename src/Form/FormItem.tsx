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

  const { form, layout, labelWidth, labelAlign, disabled, size, requiredMark, validateTrigger: formValidateTrigger, optionalText } = ctx;
  const { __INTERNAL__: internal } = form;

  const nameKey = name !== undefined ? toNameKey(name) : undefined;

  // Merge validation trigger
  const mergedTrigger = itemValidateTrigger || formValidateTrigger || 'onChange';
  const triggerList = Array.isArray(mergedTrigger) ? mergedTrigger : [mergedTrigger];

  // Determine if required (visual mark)
  const isRequired = required !== undefined ? required : rules?.some((r) => r.required) || false;

  // Save latest props in ref to avoid unnecessary re-renders from useCallback dependency changes
  const latestRef = useRef({ nameKey, name, form, getValueFromEvent, triggerList });
  latestRef.current = { nameKey, name, form, getValueFromEvent, triggerList };

  // Register field
  useEffect(() => {
    if (!nameKey) return;
    return internal.registerField(nameKey, rules || []);
  }, [nameKey, rules, internal]);

  // Subscribe to field state (useSyncExternalStore)
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

  // Re-validate when dependent fields change
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

  // Handle value change — use stable reference, read latest props via ref
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
    [], // Stable reference
  );

  const handleBlur = useCallback(() => {
    const { nameKey: nk, name: n, form: f, triggerList: tl } = latestRef.current;
    if (!nk) return;
    if (tl.includes('onBlur')) {
      f.validateFields([n!]).catch(() => {});
    }
  }, []);

  // Render children
  const renderChild = () => {
    // render props
    if (typeof children === 'function') {
      return children(fieldState);
    }

    // Do not inject props when name is undefined
    if (!nameKey) return children;

    const child = React.Children.only(children) as React.ReactElement<any>;
    if (!React.isValidElement(child)) return children;

    // Detect checkable component
    const childType = child.type as any;
    const isCheckable = childType?.__AERO_CHECKABLE === true;

    // Ensure injected value is always defined to prevent child falling back to uncontrolled mode
    const rawValue = fieldState.value;
    const controlledValue = isCheckable
      ? (rawValue ?? false)
      : (rawValue ?? '');

    const typedChild = child as React.ReactElement<any>;

    const injectedProps: Record<string, any> = {
      [isCheckable ? 'checked' : valuePropName]: controlledValue,
      [trigger]: (...args: any[]) => {
        handleChange(...args);
        typedChild.props[trigger]?.(...args);
      },
      onBlur: (...args: any[]) => {
        handleBlur();
        typedChild.props.onBlur?.(...args);
      },
      disabled: typedChild.props.disabled ?? disabled,
    };

    // Inject status
    if (fieldState.errors.length > 0) {
      injectedProps.status = 'error';
    } else if (fieldState.warnings.length > 0) {
      injectedProps.status = 'warning';
    }

    // Inject size
    if (size && typedChild.props.size === undefined) {
      injectedProps.size = size;
    }

    return React.cloneElement(typedChild, injectedProps);
  };

  // Error / warning messages
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

  // requiredMark=true , always keep asterisk placeholder, use visibility:hidden
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
            <span className="aero-form-item-optional">{optionalText}</span>
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
