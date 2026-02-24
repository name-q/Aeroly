/**
 * title: " "
 * description: 支持 `required`、`min/max`、`minLength/maxLength`、`pattern`、`type`、`whitespace`、自定义 `validator` 等校验规则。`warningOnly` 仅警告不阻止提交。
 */
import React from 'react';
import { Form, Input, InputNumber, Button, Flex } from 'aeroui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={(values) => console.log('提交成功:', values)}
      onFinishFailed={(info) => console.log('校验失败:', info)}
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[
          { required: true, message: '请输入用户名' },
          { minLength: 2, message: '至少 2 个字符' },
          { maxLength: 20, message: '最多 20 个字符' },
        ]}
      >
        <Input placeholder="2-20 个字符" />
      </Form.Item>

      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      >
        <Input placeholder="请输入邮箱" />
      </Form.Item>

      <Form.Item
        name="age"
        label="年龄"
        rules={[
          { required: true, message: '请输入年龄' },
          { min: 1, message: '年龄不能小于 1' },
          { max: 150, message: '年龄不能大于 150' },
        ]}
      >
        <InputNumber placeholder="1-150" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="phone"
        label="手机号"
        rules={[
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确' },
        ]}
      >
        <Input placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item
        name="nickname"
        label="昵称"
        rules={[
          { whitespace: true, message: '不能只包含空格' },
          { warningOnly: true, minLength: 3, message: '建议至少 3 个字符' },
        ]}
      >
        <Input placeholder="选填，建议 3 个字符以上" />
      </Form.Item>

      <Form.Item
        name="password"
        label="密码"
        rules={[
          { required: true, message: '请输入密码' },
          {
            validator: (value) => {
              if (value && value.length < 6) {
                throw new Error('密码至少 6 位');
              }
              if (value && !/[A-Z]/.test(value)) {
                throw new Error('密码需包含至少一个大写字母');
              }
            },
          },
        ]}
      >
        <Input type="password" placeholder="至少 6 位，含大写字母" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label="确认密码"
        dependencies={['password']}
        rules={[
          { required: true, message: '请确认密码' },
          {
            validator: (value, formValues) => {
              if (value && value !== formValues.password) {
                throw new Error('两次密码不一致');
              }
            },
          },
        ]}
      >
        <Input type="password" placeholder="请再次输入密码" />
      </Form.Item>

      <Form.Item>
        <Flex gap={12}>
          <Button type="primary" htmlType="submit">注册</Button>
          <Button onClick={() => form.resetFields()}>重置</Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
