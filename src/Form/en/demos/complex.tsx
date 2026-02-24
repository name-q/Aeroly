/**
 * title: " "
 * description: Comprehensive example showcasing `disabled`, `size`, `requiredMark`, `render props`, `Checkbox`, `Radio`, and more.
 */
import React, { useState } from 'react';
import { Form, Input, Switch, Checkbox, Radio, Button, Flex } from 'aero-ui';

export default () => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  return (
    <div>
      <Flex gap={16} style={{ marginBottom: 24 }} align="center">
        <span>Disabled:</span>
        <Switch checked={disabled} onChange={setDisabled} />
        <span style={{ marginLeft: 16 }}>Size:</span>
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
        onFinish={(values) => console.log('Submit:', values)}
        style={{ maxWidth: 420 }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>

        <Form.Item name="bio" label="Bio">
          <Input placeholder="Optional" />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true }]}
        >
          <Radio.Group
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="notify"
          label="Notification"
        >
          <Checkbox.Group
            options={[
              { label: 'Email', value: 'email' },
              { label: 'SMS', value: 'sms' },
              { label: 'Push', value: 'push' },
            ]}
          />
        </Form.Item>

        <Form.Item
          name="agree"
          rules={[
            {
              validator: (value) => {
                if (!value) throw new Error('Please agree to the terms of service');
              },
            },
          ]}
        >
          <Checkbox>I have read and agree to the Terms of Service</Checkbox>
        </Form.Item>

        <Form.Item>
          <Flex gap={12}>
            <Button type="primary" htmlType="submit">Submit</Button>
            <Button onClick={() => form.resetFields()}>Reset</Button>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  );
};
