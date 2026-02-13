import { useRef } from 'react';
import { FormStore } from './FormStore';
import type { FormInstance } from './FormStore';

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
