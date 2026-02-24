// ---- Types ----

export type NamePath = string | number | (string | number)[];

export interface Rule {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  type?: 'email' | 'url' | 'number' | 'integer';
  whitespace?: boolean;
  validator?: (value: any, formValues: Record<string, any>) => void | Promise<void>;
  message?: string;
  trigger?: 'onChange' | 'onBlur' | 'onSubmit';
  warningOnly?: boolean;
}

export interface FieldError {
  name: NamePath;
  errors: string[];
  warnings: string[];
}

export interface FieldState {
  value: any;
  errors: string[];
  warnings: string[];
  touched: boolean;
  validating: boolean;
}

export interface FormInstance {
  getFieldValue: (name: NamePath) => any;
  getFieldsValue: (names?: NamePath[]) => Record<string, any>;
  setFieldValue: (name: NamePath, value: any) => void;
  setFieldsValue: (values: Record<string, any>) => void;
  getFieldError: (name: NamePath) => string[];
  getFieldWarning: (name: NamePath) => string[];
  validateFields: (names?: NamePath[]) => Promise<Record<string, any>>;
  resetFields: (names?: NamePath[]) => void;
  submit: () => void;
  isFieldTouched: (name: NamePath) => boolean;
  isFieldValidating: (name: NamePath) => boolean;
  /** Internal methods */
  __INTERNAL__: {
    subscribe: (key: string, listener: () => void) => () => void;
    subscribeGlobal: (listener: (changed: Record<string, any>, all: Record<string, any>) => void) => () => void;
    registerField: (key: string, rules: Rule[]) => () => void;
    getFieldState: (key: string) => FieldState;
    setInitialValues: (values: Record<string, any>, init: boolean) => void;
    setCallbacks: (cbs: StoreCallbacks) => void;
    setLocale: (locale: FormLocale) => void;
  };
}

export interface StoreCallbacks {
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (info: { values: Record<string, any>; errorFields: FieldError[] }) => void;
  onValuesChange?: (changed: Record<string, any>, all: Record<string, any>) => void;
}

// ---- NamePath utilities ----

export function toNameKey(name: NamePath): string {
  if (Array.isArray(name)) return name.join('.');
  return String(name);
}

function getNestedValue(obj: any, key: string): any {
  const parts = key.split('.');
  let cur = obj;
  for (const p of parts) {
    if (cur == null) return undefined;
    cur = cur[p];
  }
  return cur;
}

function setNestedValue(obj: any, key: string, value: any): any {
  const parts = key.split('.');
  const root = { ...obj };
  let cur: any = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const next = parts[i + 1];
    const isNextIndex = /^\d+$/.test(next);
    cur[p] = Array.isArray(cur[p]) ? [...cur[p]] : { ...(cur[p] || (isNextIndex ? [] : {})) };
    cur = cur[p];
  }
  cur[parts[parts.length - 1]] = value;
  return root;
}

function deleteNestedValue(obj: any, key: string): any {
  const parts = key.split('.');
  const root = { ...obj };
  let cur: any = root;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    cur[p] = Array.isArray(cur[p]) ? [...cur[p]] : { ...(cur[p] || {}) };
    cur = cur[p];
  }
  delete cur[parts[parts.length - 1]];
  return root;
}

// ---- FormStore ----

export interface FormLocale {
  required: string;
  whitespace: string;
  min: string;
  max: string;
  minLength: string;
  maxLength: string;
  pattern: string;
  validateFailed: string;
  email: string;
  url: string;
  number: string;
  integer: string;
}

const DEFAULT_LOCALE: FormLocale = {
  required: '此项为必填项',
  whitespace: '不能只包含空格',
  min: '不能小于 {min}',
  max: '不能大于 {max}',
  minLength: '长度不能少于 {minLength}',
  maxLength: '长度不能超过 {maxLength}',
  pattern: '格式不正确',
  validateFailed: '校验失败',
  email: '请输入有效的邮箱地址',
  url: '请输入有效的 URL',
  number: '请输入数字',
  integer: '请输入整数',
};

export class FormStore {
  private values: Record<string, any> = {};
  private initialValues: Record<string, any> = {};
  private fieldRules: Map<string, Rule[]> = new Map();
  private errors: Map<string, string[]> = new Map();
  private warnings: Map<string, string[]> = new Map();
  private touched: Set<string> = new Set();
  private validating: Set<string> = new Set();

  private listeners: Map<string, Set<() => void>> = new Map();
  private globalListeners: Set<(changed: Record<string, any>, all: Record<string, any>) => void> = new Set();
  private snapshots: Map<string, FieldState> = new Map();

  private callbacks: StoreCallbacks = {};
  private locale: FormLocale = DEFAULT_LOCALE;

  getForm(): FormInstance {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      setFieldsValue: this.setFieldsValue,
      getFieldError: this.getFieldError,
      getFieldWarning: this.getFieldWarning,
      validateFields: this.validateFields,
      resetFields: this.resetFields,
      submit: this.submit,
      isFieldTouched: this.isFieldTouched,
      isFieldValidating: this.isFieldValidating,
      __INTERNAL__: {
        subscribe: this.subscribe,
        subscribeGlobal: this.subscribeGlobal,
        registerField: this.registerField,
        getFieldState: this.getFieldState,
        setInitialValues: this.setInitialValues,
        setCallbacks: this.setCallbacks,
        setLocale: this.setLocale,
      },
    };
  }

  // ---- Value operations ----

  private getFieldValue = (name: NamePath): any => {
    return getNestedValue(this.values, toNameKey(name));
  };

  private getFieldsValue = (names?: NamePath[]): Record<string, any> => {
    if (!names) return { ...this.values };
    const result: Record<string, any> = {};
    for (const n of names) {
      const key = toNameKey(n);
      result[key] = getNestedValue(this.values, key);
    }
    return result;
  };

  private setFieldValue = (name: NamePath, value: any): void => {
    const key = toNameKey(name);
    this.values = setNestedValue(this.values, key, value);
    this.touched.add(key);
    this.invalidateSnapshot(key);
    this.notifyField(key);
    this.notifyGlobal({ [key]: value });
  };

  private setFieldsValue = (values: Record<string, any>): void => {
    const changed: Record<string, any> = {};
    for (const [k, v] of Object.entries(values)) {
      this.values = setNestedValue(this.values, k, v);
      changed[k] = v;
      this.invalidateSnapshot(k);
      this.notifyField(k);
    }
    this.notifyGlobal(changed);
  };

  // ---- Errors ----

  private getFieldError = (name: NamePath): string[] => {
    return this.errors.get(toNameKey(name)) || [];
  };

  private getFieldWarning = (name: NamePath): string[] => {
    return this.warnings.get(toNameKey(name)) || [];
  };

  // ---- Status ----

  private isFieldTouched = (name: NamePath): boolean => {
    return this.touched.has(toNameKey(name));
  };

  private isFieldValidating = (name: NamePath): boolean => {
    return this.validating.has(toNameKey(name));
  };

  // ---- Validation ----

  private validateField = async (key: string): Promise<FieldError | null> => {
    const rules = this.fieldRules.get(key);
    if (!rules || rules.length === 0) {
      const hadErrors = this.errors.has(key);
      const hadWarnings = this.warnings.has(key);
      this.errors.delete(key);
      this.warnings.delete(key);
      if (hadErrors || hadWarnings) {
        this.invalidateSnapshot(key);
        this.notifyField(key);
      }
      return null;
    }

    const value = getNestedValue(this.values, key);
    const allValues = this.values;
    const errors: string[] = [];
    const warnings: string[] = [];

    // Skip intermediate validating state notification to avoid unnecessary re-render
    let hasAsync = false;

    for (const rule of rules) {
      try {
        // required
        if (rule.required) {
          if (
            value === undefined || value === null || value === ''
            || (Array.isArray(value) && (value.length === 0 || value.some((v: any) => v === undefined || v === null || v === '')))
          ) {
            throw new Error(rule.message || this.locale.required);
          }
        }

        // Subsequent rules only checked when value exists
        if (value !== undefined && value !== null && value !== '') {
          // whitespace
          if (rule.whitespace && typeof value === 'string' && value.trim() === '') {
            throw new Error(rule.message || this.locale.whitespace);
          }

          // type
          if (rule.type) {
            validateType(value, rule.type, rule.message, this.locale);
          }

          // min / max
          if (rule.min !== undefined) {
            const num = typeof value === 'number' ? value : Number(value);
            if (num < rule.min) {
              throw new Error(rule.message || this.locale.min.replace('{min}', String(rule.min)));
            }
          }
          if (rule.max !== undefined) {
            const num = typeof value === 'number' ? value : Number(value);
            if (num > rule.max) {
              throw new Error(rule.message || this.locale.max.replace('{max}', String(rule.max)));
            }
          }

          // minLength / maxLength
          if (rule.minLength !== undefined) {
            const len = typeof value === 'string' ? value.length : Array.isArray(value) ? value.length : 0;
            if (len < rule.minLength) {
              throw new Error(rule.message || this.locale.minLength.replace('{minLength}', String(rule.minLength)));
            }
          }
          if (rule.maxLength !== undefined) {
            const len = typeof value === 'string' ? value.length : Array.isArray(value) ? value.length : 0;
            if (len > rule.maxLength) {
              throw new Error(rule.message || this.locale.maxLength.replace('{maxLength}', String(rule.maxLength)));
            }
          }

          // pattern
          if (rule.pattern && !rule.pattern.test(String(value))) {
            throw new Error(rule.message || this.locale.pattern);
          }

          // custom validator
          if (rule.validator) {
            const result = rule.validator(value, allValues);
            if (result && typeof (result as any).then === 'function') {
              hasAsync = true;
              // Only notify validating state for async validators
              if (!this.validating.has(key)) {
                this.validating.add(key);
                this.invalidateSnapshot(key);
                this.notifyField(key);
              }
              await result;
            }
          }
        }
      } catch (err: any) {
        const msg = err?.message || this.locale.validateFailed;
        if (rule.warningOnly) {
          warnings.push(msg);
        } else {
          errors.push(msg);
        }
      }
    }

    if (hasAsync) {
      this.validating.delete(key);
    }

    if (errors.length > 0) {
      this.errors.set(key, errors);
    } else {
      this.errors.delete(key);
    }

    if (warnings.length > 0) {
      this.warnings.set(key, warnings);
    } else {
      this.warnings.delete(key);
    }

    this.invalidateSnapshot(key);
    this.notifyField(key);

    if (errors.length > 0 || warnings.length > 0) {
      return { name: key, errors, warnings };
    }
    return null;
  };

  private validateFields = async (names?: NamePath[]): Promise<Record<string, any>> => {
    const keys = names
      ? names.map(toNameKey)
      : Array.from(this.fieldRules.keys());

    const results = await Promise.all(keys.map((k) => this.validateField(k)));
    const errorFields = results.filter(Boolean) as FieldError[];
    const realErrors = errorFields.filter((f) => f.errors.length > 0);

    if (realErrors.length > 0) {
      const err = new Error('Validation Failed') as any;
      err.errorFields = realErrors;
      throw err;
    }

    return { ...this.values };
  };

  // ---- Reset ----

  private resetFields = (names?: NamePath[]): void => {
    if (!names) {
      this.values = { ...this.initialValues };
      this.errors.clear();
      this.warnings.clear();
      this.touched.clear();
      this.validating.clear();
      this.snapshots.clear();
      // Notify all registered fields
      for (const key of Array.from(this.listeners.keys())) {
        this.notifyField(key);
      }
      this.notifyGlobal(this.values);
    } else {
      for (const n of names) {
        const key = toNameKey(n);
        const initVal = getNestedValue(this.initialValues, key);
        if (initVal !== undefined) {
          this.values = setNestedValue(this.values, key, initVal);
        } else {
          this.values = deleteNestedValue(this.values, key);
        }
        this.errors.delete(key);
        this.warnings.delete(key);
        this.touched.delete(key);
        this.validating.delete(key);
        this.invalidateSnapshot(key);
        this.notifyField(key);
      }
      this.notifyGlobal(this.values);
    }
  };

  // ---- Submit ----

  private submit = async (): Promise<void> => {
    try {
      const values = await this.validateFields();
      this.callbacks.onFinish?.(values);
    } catch (err: any) {
      this.callbacks.onFinishFailed?.({
        values: { ...this.values },
        errorFields: err.errorFields || [],
      });
    }
  };

  // ---- Subscribe ----

  private subscribe = (key: string, listener: () => void): (() => void) => {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }
    this.listeners.get(key)!.add(listener);
    return () => {
      this.listeners.get(key)?.delete(listener);
    };
  };

  private subscribeGlobal = (listener: (changed: Record<string, any>, all: Record<string, any>) => void): (() => void) => {
    this.globalListeners.add(listener);
    return () => {
      this.globalListeners.delete(listener);
    };
  };

  private registerField = (key: string, rules: Rule[]): (() => void) => {
    this.fieldRules.set(key, rules);
    return () => {
      this.fieldRules.delete(key);
      this.errors.delete(key);
      this.warnings.delete(key);
      this.touched.delete(key);
      this.snapshots.delete(key);
    };
  };

  private getFieldState = (key: string): FieldState => {
    const cached = this.snapshots.get(key);
    if (cached) return cached;

    const state: FieldState = {
      value: getNestedValue(this.values, key),
      errors: this.errors.get(key) || [],
      warnings: this.warnings.get(key) || [],
      touched: this.touched.has(key),
      validating: this.validating.has(key),
    };
    this.snapshots.set(key, state);
    return state;
  };

  private setInitialValues = (values: Record<string, any>, init: boolean): void => {
    this.initialValues = values || {};
    if (init) {
      this.values = { ...this.initialValues };
    }
  };

  private setCallbacks = (cbs: StoreCallbacks): void => {
    this.callbacks = cbs;
  };

  private setLocale = (locale: FormLocale): void => {
    this.locale = locale;
  };

  // ---- Notifications ----

  private invalidateSnapshot(key: string): void {
    this.snapshots.delete(key);
  }

  private notifyField(key: string): void {
    const set = this.listeners.get(key);
    if (set) {
      set.forEach((fn) => fn());
    }
  }

  private notifyGlobal(changed: Record<string, any>): void {
    const all = { ...this.values };
    this.globalListeners.forEach((fn) => fn(changed, all));
    this.callbacks.onValuesChange?.(changed, all);
  }
}

// ---- Type validation helper ----

function validateType(value: any, type: string, message: string | undefined, locale: FormLocale): void {
  switch (type) {
    case 'email': {
      if (typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        throw new Error(message || locale.email);
      }
      break;
    }
    case 'url': {
      try {
        new URL(typeof value === 'string' ? value : String(value));
      } catch {
        throw new Error(message || locale.url);
      }
      break;
    }
    case 'number': {
      if (isNaN(Number(value))) {
        throw new Error(message || locale.number);
      }
      break;
    }
    case 'integer': {
      if (!Number.isInteger(Number(value))) {
        throw new Error(message || locale.integer);
      }
      break;
    }
  }
}
