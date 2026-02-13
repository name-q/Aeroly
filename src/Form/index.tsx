import React, { useEffect, useRef, useMemo, useCallback, useImperativeHandle, forwardRef } from 'react';
import { FormContext } from './FormContext';
import type { FormContextValue } from './FormContext';
import { useForm } from './useForm';
import FormItem from './FormItem';
import FormList from './FormList';
import type { FormInstance } from './FormStore';
import type { FormItemProps } from './FormItem';
import type { FormListProps, FormListField, FormListOperation, FormListMeta } from './FormList';
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
  /** 提交校验失败时自动滚动到第一个错误字段 */
  scrollToFirstError?: boolean | ScrollIntoViewOptions;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (info: { values: Record<string, any>; errorFields: any[] }) => void;
  onValuesChange?: (changed: Record<string, any>, all: Record<string, any>) => void;
  children?: React.ReactNode | ((form: FormInstance) => React.ReactNode);
  className?: string;
  style?: React.CSSProperties;
}

// ---- 滚动工具 ----

/** 向上查找最近的可滚动祖先（适配 Modal / Drawer 等场景） */
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

  // 容器内滚动
  const container = scrollParent as HTMLElement;
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  // 目标相对于容器的偏移，滚动到容器中间
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
  size = 'medium',
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
  const [form] = useForm(formProp);
  const { __INTERNAL__: internal } = form;
  const initializedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // 通过 ref 暴露 FormInstance，支持跨组件操作
  useImperativeHandle(ref, () => form, [form]);

  // 用 ref 持有回调和配置，避免每次 render 都触发 setCallbacks
  const callbacksRef = useRef({ onFinish, onFinishFailed, onValuesChange, scrollToFirstError });
  callbacksRef.current = { onFinish, onFinishFailed, onValuesChange, scrollToFirstError };

  // 设置初始值 — 同步执行，确保首次 render 时 values 已就绪
  if (!initializedRef.current) {
    internal.setInitialValues(initialValues || {}, true);
    initializedRef.current = true;
  }

  // 设置回调 — 只注册一次，通过 ref 间接调用最新回调
  useEffect(() => {
    internal.setCallbacks({
      onFinish: (values) => callbacksRef.current.onFinish?.(values),
      onFinishFailed: (info) => {
        callbacksRef.current.onFinishFailed?.(info);
        // 滚动到第一个错误字段
        const scrollOpt = callbacksRef.current.scrollToFirstError;
        if (scrollOpt && formRef.current) {
          requestAnimationFrame(() => {
            // 找第一个可见的错误字段（排除 hidden）
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

  // 稳定化 context，只在相关 props 变化时更新
  const contextValue: FormContextValue = useMemo(() => ({
    form,
    layout,
    labelWidth,
    labelAlign,
    disabled,
    size,
    requiredMark,
    validateTrigger,
  }), [form, layout, labelWidth, labelAlign, disabled, size, requiredMark, validateTrigger]);

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

// ---- 复合导出 ----

type FormType = typeof InternalForm & {
  Item: typeof FormItem;
  List: typeof FormList;
  useForm: typeof useForm;
};

const Form = InternalForm as FormType;
Form.Item = FormItem;
Form.List = FormList;
Form.useForm = useForm;

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
