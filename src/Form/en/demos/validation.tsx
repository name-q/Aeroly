/**
 * title: " "
 * description: Supports `required`, `min/max`, `minLength/maxLength`, `pattern`, `type`, `whitespace`, custom `validator`, and more. `warningOnly` only warns without blocking submission.
 */
import React from 'react';
import { Form, Input, InputNumber, Button, Flex, ConfigProvider, enUS } from 'aeroly';

export default () => {
  const [form] = Form.useForm();

  return (
    <ConfigProvider locale={enUS}>
    <Form
      form={form}
      onFinish={(values) => console.log('Submit success:', values)}
      onFinishFailed={(info) => console.log('Validation failed:', info)}
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          { required: true, message: 'Please enter username' },
          { minLength: 2, message: 'At least 2 characters' },
          { maxLength: 20, message: 'At most 20 characters' },
        ]}
      >
        <Input placeholder="2-20 characters" />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        name="age"
        label="Age"
        rules={[
          { required: true, message: 'Please enter age' },
          { min: 1, message: 'Age cannot be less than 1' },
          { max: 150, message: 'Age cannot be greater than 150' },
        ]}
      >
        <InputNumber placeholder="1-150" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { required: true, message: 'Please enter phone number' },
          { pattern: /^1[3-9]\d{9}$/, message: 'Invalid phone number format' },
        ]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="Nickname"
        rules={[
          { whitespace: true, message: 'Cannot contain only spaces' },
          { warningOnly: true, minLength: 3, message: 'Recommended at least 3 characters' },
        ]}
      >
        <Input placeholder="Optional, 3+ characters recommended" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          { required: true, message: 'Please enter password' },
          {
            validator: (value) => {
              if (value && value.length < 6) {
                throw new Error('Password must be at least 6 characters');
              }
              if (value && !/[A-Z]/.test(value)) {
                throw new Error('Password must contain at least one uppercase letter');
              }
            },
          },
        ]}
      >
        <Input type="password" placeholder="At least 6 chars with uppercase" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="Confirm Password"
        dependencies={['password']}
        rules={[
          { required: true, message: 'Please confirm password' },
          {
            validator: (value, formValues) => {
              if (value && value !== formValues.password) {
                throw new Error('Passwords do not match');
              }
            },
          },
        ]}
      >
        <Input type="password" placeholder="Re-enter password" />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">Register</Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Flex>
      </Form.Item>
    </Form>
    </ConfigProvider>
  );
};
