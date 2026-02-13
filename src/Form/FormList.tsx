import React, { useContext, useCallback, useSyncExternalStore } from 'react';
import { FormContext } from './FormContext';
import type { NamePath, FieldState } from './FormStore';
import { toNameKey } from './FormStore';

export interface FormListField {
  name: number;
  key: number;
}

export interface FormListOperation {
  add: (defaultValue?: any, index?: number) => void;
  remove: (index: number | number[]) => void;
  move: (from: number, to: number) => void;
}

export interface FormListMeta {
  errors: string[];
}

export interface FormListProps {
  name: NamePath;
  initialValue?: any[];
  children: (fields: FormListField[], operation: FormListOperation, meta: FormListMeta) => React.ReactNode;
}

let keyCounter = 0;

const FormList: React.FC<FormListProps> = ({ name, initialValue, children }) => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error('Form.List must be used inside a Form');
  }

  const { form } = ctx;
  const { __INTERNAL__: internal } = form;
  const nameKey = toNameKey(name);

  // 订阅数组字段
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      return internal.subscribe(nameKey, onStoreChange);
    },
    [nameKey, internal],
  );

  const getSnapshot = useCallback(() => {
    return internal.getFieldState(nameKey);
  }, [nameKey, internal]);

  const fieldState = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const getList = useCallback((): any[] => {
    const val = form.getFieldValue(name);
    return Array.isArray(val) ? val : (initialValue || []);
  }, [form, name, initialValue]);

  const keysRef = React.useRef<number[]>([]);

  // 确保 keys 与列表长度同步
  const list = getList();
  while (keysRef.current.length < list.length) {
    keysRef.current.push(keyCounter++);
  }
  if (keysRef.current.length > list.length) {
    keysRef.current = keysRef.current.slice(0, list.length);
  }

  const fields: FormListField[] = list.map((_, index) => ({
    name: index,
    key: keysRef.current[index],
  }));

  const operation: FormListOperation = {
    add: (defaultValue?: any, index?: number) => {
      const arr = [...getList()];
      const newKey = keyCounter++;
      if (index !== undefined && index >= 0 && index <= arr.length) {
        arr.splice(index, 0, defaultValue);
        keysRef.current.splice(index, 0, newKey);
      } else {
        arr.push(defaultValue);
        keysRef.current.push(newKey);
      }
      form.setFieldValue(name, arr);
    },
    remove: (index: number | number[]) => {
      const arr = [...getList()];
      const indices = Array.isArray(index) ? index.sort((a, b) => b - a) : [index];
      for (const i of indices) {
        arr.splice(i, 1);
        keysRef.current.splice(i, 1);
      }
      form.setFieldValue(name, arr);
    },
    move: (from: number, to: number) => {
      const arr = [...getList()];
      if (from < 0 || from >= arr.length || to < 0 || to >= arr.length) return;
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      const [key] = keysRef.current.splice(from, 1);
      keysRef.current.splice(to, 0, key);
      form.setFieldValue(name, arr);
    },
  };

  const meta: FormListMeta = {
    errors: fieldState.errors,
  };

  return <>{children(fields, operation, meta)}</>;
};

export default FormList;
