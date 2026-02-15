/**
 * title: " "
 * description: 在 Form 中使用 AutoComplete，输入邮箱前缀后自动补全常用后缀。
 */
import React, { useMemo } from 'react';
import { Form, AutoComplete, Button, Flex } from 'aero-ui';

const emailSuffixes = ['@gmail.com', '@qq.com', '@163.com', '@outlook.com', '@foxmail.com'];

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
        {(fieldState) => {
          const current = fieldState.value || '';
          const options = current && !current.includes('@')
            ? emailSuffixes.map((s) => ({
                value: current + s,
                label: current + s,
              }))
            : [];

          return (
            <AutoComplete
              value={current}
              onChange={(val) => form.setFieldValue('email', val)}
              options={options}
              filterOption={false}
              placeholder="请输入邮箱"
            />
          );
        }}
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
