import { describe, it, expect } from 'vitest';
import { FormStore, toNameKey } from '../FormStore';

function createStore(initialValues?: Record<string, any>) {
  const store = new FormStore();
  const form = store.getForm();
  if (initialValues) {
    form.__INTERNAL__.setInitialValues(initialValues, true);
  }
  return form;
}

describe('FormStore', () => {
  describe('toNameKey', () => {
    it('converts string to string', () => {
      expect(toNameKey('name')).toBe('name');
    });
    it('converts number to string', () => {
      expect(toNameKey(0)).toBe('0');
    });
    it('joins array with dots', () => {
      expect(toNameKey(['user', 'name'])).toBe('user.name');
    });
  });

  describe('value operations', () => {
    it('gets and sets field value', () => {
      const form = createStore();
      form.setFieldValue('name', 'Alice');
      expect(form.getFieldValue('name')).toBe('Alice');
    });

    it('gets all values', () => {
      const form = createStore({ a: 1, b: 2 });
      expect(form.getFieldsValue()).toEqual({ a: 1, b: 2 });
    });

    it('gets specific field values', () => {
      const form = createStore({ a: 1, b: 2, c: 3 });
      expect(form.getFieldsValue(['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('sets multiple values at once', () => {
      const form = createStore();
      form.setFieldsValue({ x: 10, y: 20 });
      expect(form.getFieldValue('x')).toBe(10);
      expect(form.getFieldValue('y')).toBe(20);
    });

    it('handles nested values', () => {
      const form = createStore({ user: { name: 'Bob' } });
      expect(form.getFieldValue('user.name')).toBe('Bob');
      form.setFieldValue('user.age', 25);
      expect(form.getFieldValue('user.age')).toBe(25);
    });
  });

  describe('touched / validating status', () => {
    it('marks field as touched after setValue', () => {
      const form = createStore();
      expect(form.isFieldTouched('name')).toBe(false);
      form.setFieldValue('name', 'test');
      expect(form.isFieldTouched('name')).toBe(true);
    });
  });

  describe('resetFields', () => {
    it('resets all fields to initial values', () => {
      const form = createStore({ name: 'init' });
      form.setFieldValue('name', 'changed');
      form.resetFields();
      expect(form.getFieldValue('name')).toBe('init');
      expect(form.isFieldTouched('name')).toBe(false);
    });

    it('resets specific fields', () => {
      const form = createStore({ a: 1, b: 2 });
      form.setFieldValue('a', 99);
      form.setFieldValue('b', 99);
      form.resetFields(['a']);
      expect(form.getFieldValue('a')).toBe(1);
      expect(form.getFieldValue('b')).toBe(99);
    });
  });

  describe('validation', () => {
    it('validates required rule', async () => {
      const form = createStore();
      form.__INTERNAL__.registerField('name', [{ required: true }]);
      await expect(form.validateFields(['name'])).rejects.toThrow('Validation Failed');
      expect(form.getFieldError('name').length).toBeGreaterThan(0);
    });

    it('passes required when value exists', async () => {
      const form = createStore({ name: 'Alice' });
      form.__INTERNAL__.registerField('name', [{ required: true }]);
      const values = await form.validateFields(['name']);
      expect(values.name).toBe('Alice');
      expect(form.getFieldError('name')).toEqual([]);
    });

    it('validates min/max', async () => {
      const form = createStore({ age: 5 });
      form.__INTERNAL__.registerField('age', [{ min: 10 }]);
      await expect(form.validateFields(['age'])).rejects.toThrow();

      form.setFieldValue('age', 15);
      await expect(form.validateFields(['age'])).resolves.toBeDefined();
    });

    it('validates minLength/maxLength', async () => {
      const form = createStore({ code: 'ab' });
      form.__INTERNAL__.registerField('code', [{ minLength: 3 }]);
      await expect(form.validateFields(['code'])).rejects.toThrow();

      form.setFieldValue('code', 'abc');
      await expect(form.validateFields(['code'])).resolves.toBeDefined();
    });

    it('validates pattern', async () => {
      const form = createStore({ zip: 'abc' });
      form.__INTERNAL__.registerField('zip', [{ pattern: /^\d{5}$/ }]);
      await expect(form.validateFields(['zip'])).rejects.toThrow();

      form.setFieldValue('zip', '12345');
      await expect(form.validateFields(['zip'])).resolves.toBeDefined();
    });

    it('validates type email', async () => {
      const form = createStore({ email: 'not-email' });
      form.__INTERNAL__.registerField('email', [{ type: 'email' }]);
      await expect(form.validateFields(['email'])).rejects.toThrow();

      form.setFieldValue('email', 'a@b.com');
      await expect(form.validateFields(['email'])).resolves.toBeDefined();
    });

    it('validates type integer', async () => {
      const form = createStore({ num: 3.5 });
      form.__INTERNAL__.registerField('num', [{ type: 'integer' }]);
      await expect(form.validateFields(['num'])).rejects.toThrow();

      form.setFieldValue('num', 3);
      await expect(form.validateFields(['num'])).resolves.toBeDefined();
    });

    it('validates whitespace rule', async () => {
      const form = createStore({ name: '   ' });
      form.__INTERNAL__.registerField('name', [{ whitespace: true }]);
      await expect(form.validateFields(['name'])).rejects.toThrow();
    });

    it('supports custom validator', async () => {
      const form = createStore({ pw: '123' });
      form.__INTERNAL__.registerField('pw', [{
        validator: (val) => { if (val.length < 6) throw new Error('Too short'); },
      }]);
      await expect(form.validateFields(['pw'])).rejects.toThrow();

      form.setFieldValue('pw', '123456');
      await expect(form.validateFields(['pw'])).resolves.toBeDefined();
    });

    it('supports async validator', async () => {
      const form = createStore({ code: 'bad' });
      form.__INTERNAL__.registerField('code', [{
        validator: async (val) => {
          await new Promise((r) => setTimeout(r, 10));
          if (val === 'bad') throw new Error('Invalid');
        },
      }]);
      await expect(form.validateFields(['code'])).rejects.toThrow();
    });

    it('uses custom message when provided', async () => {
      const form = createStore({});
      form.__INTERNAL__.registerField('name', [{ required: true, message: 'Name is required!' }]);
      try {
        await form.validateFields(['name']);
      } catch {}
      expect(form.getFieldError('name')).toEqual(['Name is required!']);
    });

    it('warningOnly does not cause validation failure', async () => {
      const form = createStore({ name: '' });
      form.__INTERNAL__.registerField('name', [{ required: true, warningOnly: true }]);
      const values = await form.validateFields(['name']);
      expect(values).toBeDefined();
      expect(form.getFieldWarning('name').length).toBeGreaterThan(0);
      expect(form.getFieldError('name')).toEqual([]);
    });

    it('clears errors after valid re-validation', async () => {
      const form = createStore({});
      form.__INTERNAL__.registerField('name', [{ required: true }]);
      try { await form.validateFields(['name']); } catch {}
      expect(form.getFieldError('name').length).toBeGreaterThan(0);

      form.setFieldValue('name', 'filled');
      await form.validateFields(['name']);
      expect(form.getFieldError('name')).toEqual([]);
    });
  });
});
