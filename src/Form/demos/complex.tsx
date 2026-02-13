/**
 * title: " "
 * description: 综合示例，展示 `disabled`、`size`、`requiredMark`、`render props`、`Checkbox`、`Radio` 等用法。
 */
import React, { useState } from 'react';
import { Form, Input, Select, Switch, Checkbox, Radio, Button, Flex } from 'aero-ui';

export default () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <div>
      <Flex gap={16} style={{ marginBottom: 24 }} align="center">
        <span>禁用：</span>
        <Switch checked={disabled} onChange={setDisabled} />
        <span style={{ marginLeft: 16 }}>尺寸：</span>
        <Radio.Group
          value={size}
          onChange={(val) => setSize(val as any)}
          optionType="button"
          options={['small', 'medium', 'large']}
        />
      </Flex>

      <Form
        form={form}
        disabled={disabled}
        size={size}
        requiredMark="optional"
        initialValues={{ gender: 'male', agree: false, notify: ['email'] }}
        onFinish={(values) => console.log('提交:', values)}
        style={{ maxWidth: 420 }}
      >
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>

        <Form.Item name="bio" label="简介">
          <Input placeholder="选填" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="性别"
          rules={[{ required: true }]}
        >
          <Radio.Group
            options={[
              { label: '男', value: 'male' },
              { label: '女', value: 'female' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="notify"
          label="通知方式"
        >
          <Checkbox.Group
            options={[
              { label: '邮件', value: 'email' },
              { label: '短信', value: 'sms' },
              { label: '推送', value: 'push' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="agree"
          rules={[
            {
              validator: (value) => {
                if (!value) throw new Error('请同意服务条款');
              },
            },
          ]}
        >
          <Checkbox>我已阅读并同意服务条款</Checkbox>
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button type="primary" htmlType="submit">提交</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
