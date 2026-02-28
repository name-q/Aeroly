/**
 * title: " "
 * description: Form.Item 支持嵌套布局——子元素不必是表单控件本身，可以用 Flex 等容器包裹，Form.Item 会自动穿透找到内部的表单控件并注入 value / onChange / status。
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
    console.log('提交成功:', values);
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} style={{ maxWidth: 360 }}>
      <Form.Item
        label="手机号"
        name="phone"
        rules={[{ required: true, message: '请输入手机号' }]}
      >
        <Input
          prefix={<Smartphone size={16} />}
          placeholder="请输入手机号"
          allowClear
          maxLength={11}
        />
      </Form.Item>

      <Form.Item
        label="验证码"
        name="code"
        rules={[{ required: true, message: '请输入验证码' }]}
      >
        <Flex gap="sm" align="center">
          <Input
            prefix={<Lock size={16} />}
            placeholder="请输入验证码"
            style={{ flex: 1 }}
          />
          <Button
            disabled={countdown > 0}
            onClick={startCountdown}
          >
            {countdown > 0 ? `${countdown}s 后重发` : '获取验证码'}
          </Button>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
