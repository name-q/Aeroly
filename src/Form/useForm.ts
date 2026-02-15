import { useRef, useCallback, useSyncExternalStore } from 'react';
import { FormStore, toNameKey } from './FormStore';
import type { FormInstance, NamePath } from './FormStore';

export function useForm(form?: FormInstance): [FormInstance] {
  const formRef = useRef<FormInstance>();

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const store = new FormStore();
      formRef.current = store.getForm();
    }
  }

  return [formRef.current];
}

export function useWatch(name: NamePath, form: FormInstance): any {
  const key = toNameKey(name);
  const { __INTERNAL__: internal } = form;

  const subscribe = useCallback(
    (onStoreChange: () => void) => internal.subscribe(key, onStoreChange),
    [key, internal],
  );

  const getSnapshot = useCallback(
    () => internal.getFieldState(key).value,
    [key, internal],
  );

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
