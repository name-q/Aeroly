/**
 * title: " "
 * description: 基础表单，包含输入框、选择器、开关等常见控件。
 */
import React from 'react';
import { Form, Input, Select, Switch, Button, Flex } from 'aeroly';

export default () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('提交成功:', values);
  };

  return (
    <Form
      form={form}
      initialValues={{ remember: false }}
      onFinish={onFinish}
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item
        name="role"
        label="角色"
        rules={[{ required: true, message: '请选择角色' }]}
      >
        <Select
          placeholder="请选择角色"
          options={[
            { label: '管理员', value: 'admin' },
            { label: '编辑', value: 'editor' },
            { label: '访客', value: 'viewer' },
          ]}
        />
      </Form.Item>

      <Form.Item name="remember" label="记住我">
        <Switch />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
