import React, { useEffect, useRef, useMemo, useCallback, useImperativeHandle, forwardRef } from 'react';
import { FormContext } from './FormContext';
import type { FormContextValue } from './FormContext';
import { useForm, useWatch } from './useForm';
import FormItem from './FormItem';
import FormList from './FormList';
import type { FormInstance } from './FormStore';
import type { FormItemProps } from './FormItem';
import type { FormListProps, FormListField, FormListOperation, FormListMeta } from './FormList';
import { useSize, useLocale } from '../ConfigProvider/useConfig';
import './index.less';

// ---- Types ----

export interface FormProps {
  form?: FormInstance;
  initialValues?: Record<string, any>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelWidth?: number | string;
  labelAlign?: 'left' | 'right';
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  requiredMark?: boolean | 'optional';
  validateTrigger?: string | string[];
  /** Auto scroll to first error field on validation failure */
  scrollToFirstError?: boolean | ScrollIntoViewOptions;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (info: { values: Record<string, any>; errorFields: any[] }) => void;
  onValuesChange?: (changed: Record<string, any>, all: Record<string, any>) => void;
  children?: React.ReactNode | ((form: FormInstance) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
}

// ---- Scroll utilities ----

/** Find nearest scrollable ancestor (for Modal / Drawer scenarios) */
function findScrollParent(el: HTMLElement): HTMLElement | Window {
  let node = el.parentElement;
  while (node && node !== document.body) {
    const { overflow, overflowY } = getComputedStyle(node);
    if (/(auto|scroll)/.test(overflow + overflowY)) {
      return node;
    }
    node = node.parentElement;
  }
  return window;
}

function scrollToElement(target: HTMLElement, options?: ScrollIntoViewOptions) {
  const scrollParent = findScrollParent(target);

  if (scrollParent === window) {
    target.scrollIntoView(options || { behavior: 'smooth', block: 'center' });
    return;
  }

  // Scroll within container
  const container = scrollParent as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  // Target offset relative to container, scroll to center
  const offsetTop = targetRect.top - containerRect.top + container.scrollTop;
  const scrollTo = offsetTop - container.clientHeight / 2 + targetRect.height / 2;

  container.scrollTo({ top: Math.max(0, scrollTo), behavior: 'smooth' });
}

// ---- Form ----

const InternalForm = forwardRef<FormInstance, FormProps>(({
  form: formProp,
  initialValues,
  layout = 'vertical',
  labelWidth,
  labelAlign = 'left',
  disabled = false,
  size: sizeProp,
  requiredMark = true,
  validateTrigger = 'onChange',
  scrollToFirstError = true,
  onFinish,
  onFinishFailed,
  onValuesChange,
  children,
  className,
  style,
}, ref) => {
  const size = useSize(sizeProp);
  const formLocale = useLocale('Form');
  const [form] = useForm(formProp);
  const { __INTERNAL__: internal } = form;
  const initializedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Expose FormInstance via ref for cross-component access
  useImperativeHandle(ref, () => form, [form]);

  // Sync locale to FormStore
  internal.setLocale(formLocale);

  // Hold callbacks in ref to avoid triggering setCallbacks on every render
  const callbacksRef = useRef({ onFinish, onFinishFailed, onValuesChange, scrollToFirstError });
  callbacksRef.current = { onFinish, onFinishFailed, onValuesChange, scrollToFirstError };

  // Set initial values synchronously to ensure values are ready on first render
  if (!initializedRef.current) {
    internal.setInitialValues(initialValues || {}, true);
    initializedRef.current = true;
  }

  // Set callbacks once, invoke latest callbacks indirectly via ref
  useEffect(() => {
    internal.setCallbacks({
      onFinish: (values) => callbacksRef.current.onFinish?.(values),
      onFinishFailed: (info) => {
        callbacksRef.current.onFinishFailed?.(info);
        // Scroll to first error field
        const scrollOpt = callbacksRef.current.scrollToFirstError;
        if (scrollOpt && formRef.current) {
          requestAnimationFrame(() => {
            // Find first visible error field (excluding hidden)
            const allErrors = formRef.current?.querySelectorAll('.aero-form-item--error:not(.aero-form-item--hidden)');
            const target = (allErrors && allErrors.length > 0 ? allErrors[0] : formRef.current) as HTMLElement | null;
            if (target) {
              scrollToElement(target, typeof scrollOpt === 'object' ? scrollOpt : undefined);
            }
          });
        }
      },
      onValuesChange: (changed, all) => callbacksRef.current.onValuesChange?.(changed, all),
    });
  }, [internal]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.submit();
  }, [form]);

  // Stabilize context, only update when relevant props change
  const contextValue: FormContextValue = useMemo(() => ({
    form,
    layout,
    labelWidth,
    labelAlign,
    disabled,
    size,
    requiredMark,
    validateTrigger,
    optionalText: formLocale.optional,
  }), [form, layout, labelWidth, labelAlign, disabled, size, requiredMark, validateTrigger, formLocale.optional]);

  const formCls = [
    'aero-form',
    `aero-form--${layout}`,
    `aero-form--${size}`,
    disabled ? 'aero-form--disabled' : '',
    className || '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <FormContext.Provider value={contextValue}>
      <form ref={formRef} className={formCls} style={style} onSubmit={handleSubmit}>
        {typeof children === 'function' ? children(form) : children}
      </form>
    </FormContext.Provider>
  );
});

// ---- Compound export ----

type FormType = typeof InternalForm & {
  Item: typeof FormItem;
  List: typeof FormList;
  useForm: typeof useForm;
  useWatch: typeof useWatch;
};

const Form = InternalForm as FormType;
Form.Item = FormItem;
Form.List = FormList;
Form.useForm = useForm;
Form.useWatch = useWatch;

export default Form;

export type {
  FormInstance,
  FormItemProps,
  FormListProps,
  FormListField,
  FormListOperation,
  FormListMeta,
};
export type { Rule, NamePath, FieldError, FieldState } from './FormStore';
