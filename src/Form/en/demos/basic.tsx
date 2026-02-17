/**
 * title: " "
 * description: Basic form with input, select, switch, and other common controls.
 */
import React from 'react';
import { Form, Input, Select, Switch, Button, Flex, ConfigProvider, enUS } from 'aero-ui';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Submit success:', values);
  };

  return (
    <ConfigProvider locale={enUS}>
      <Form
        form={form}
        initialValues={{ remember: false }}
        onFinish={onFinish}
        style={{ maxWidth: 400 }}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please enter username' }]}
        >
          <Input placeholder="Enter username" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please enter email' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role' }]}
        >
          <Select
            placeholder="Select a role"
            options={[
              { label: 'Admin', value: 'admin' },
              { label: 'Editor', value: 'editor' },
              { label: 'Viewer', value: 'viewer' },
            ]}
          />
        </Form.Item>

        <Form.Item name="remember" label="Remember me">
          <Switch />
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
