import { createContext } from 'react';
import type { FormInstance, Rule } from './FormStore';

export interface FormContextValue {
  form: FormInstance;
  layout: 'horizontal' | 'vertical' | 'inline';
  labelWidth?: number | string;
  labelAlign: 'left' | 'right';
  disabled: boolean;
  size: 'small' | 'medium' | 'large';
  requiredMark: boolean | 'optional';
  validateTrigger: string | string[];
}

export const FormContext = createContext<FormContextValue | null>(null);
