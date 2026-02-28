/**
 * title: " "
 * description: Form.Item supports nested layouts — the direct child doesn't have to be a form control. You can wrap controls with containers like Flex, and Form.Item will automatically traverse the tree to find and inject value / onChange / status into the form control.
 */
import React, { useState } from 'react';
import { Form, Input, Button, Flex } from 'aeroly';
import { Smartphone, Lock } from 'lucide-react';

export default () => {
  const [form] = Form.useForm();
  const [countdown, setCountdown] = useState(0);

  const startCountdown = () => {
    setCountdown(10);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const onFinish = (values: any) => {
    console.log('Submitted:', values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 360 }}>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[{ required: true, message: 'Please enter your phone number' }]}
      >
        <Input
          prefix={<Smartphone size={16} />}
          placeholder="Enter phone number"
          allowClear
          maxLength={11}
        />
      </Form.Item>

      <Form.Item
        label="Verification Code"
        name="code"
        rules={[{ required: true, message: 'Please enter the verification code' }]}
      >
        <Flex gap="sm" align="center">
          <Input
            prefix={<Lock size={16} />}
            placeholder="Enter verification code"
            style={{ flex: 1 }}
          />
          <Button
            disabled={countdown > 0}
            onClick={startCountdown}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Get Code'}
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Log In
        </Button>
      </Form.Item>
    </Form>
  );
};
