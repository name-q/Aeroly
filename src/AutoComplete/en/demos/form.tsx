/**
 * title: " "
 * description: Use AutoComplete in a Form. Dynamically generate email suffix suggestions via `Form.useWatch`. Extract `useWatch` and `AutoComplete` into a separate child component `EmailAutoComplete` so that data changes only trigger the child component re-render, not the entire form.
 */
import React from 'react';
import { Form, AutoComplete, Button, Flex, ConfigProvider, enUS } from 'aeroly';
import type { AutoCompleteProps } from 'aeroly';
import type { FormInstance } from 'aeroly';

const emailSuffixes = ['@gmail.com', '@qq.com', '@163.com', '@outlook.com', '@foxmail.com'];

const EmailAutoComplete: React.FC<AutoCompleteProps & { form: FormInstance }> = ({ form, ...props }) => {
  const email = Form.useWatch('email', form) || '';
  const options = email && !email.includes('@')
    ? emailSuffixes.map((s) => ({ value: email + s }))
    : [];
  return <AutoComplete options={options} filterOption={false} {...props} />;
};

export default () => {
  const [form] = Form.useForm();

  return (
    <ConfigProvider locale={enUS}>
    <Form
      form={form}
      onFinish={(values) => console.log('Submit success:', values)}
      style={{ maxWidth: 360 }}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter email' },
          { type: 'email', message: 'Invalid email format' },
        ]}
      >
        <EmailAutoComplete form={form} placeholder="Enter email" />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">Submit</Button>
          <Button onClick={() => form.resetFields()}>Reset</Button>
        </Flex>
      </Form.Item>
    </Form>
    </ConfigProvider>
  );
};
