/**
 * title: " "
 * description: 在 Form 中使用 AutoComplete，通过 `Form.useWatch` 获取实时值动态生成邮箱后缀建议。将 `useWatch` 与 `AutoComplete` 下沉到独立子组件 `EmailAutoComplete`，数据变化只触发子组件重渲染，不会波及整个表单。
 */
import React from 'react';
import { Form, AutoComplete, Button, Flex } from 'aero-ui';
import type { AutoCompleteProps } from 'aero-ui';
import type { FormInstance } from 'aero-ui';

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
    <Form
      form={form}
      onFinish={(values) => console.log('提交成功:', values)}
      style={{ maxWidth: 360 }}
    >
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '邮箱格式不正确' },
        ]}
      >
        <EmailAutoComplete form={form} placeholder="请输入邮箱" />
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
