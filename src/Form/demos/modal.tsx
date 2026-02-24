/**
 * title: " "
 * description: Modal 弹窗中的表单 — 通过 `ref` 让父组件操作子组件的 Form。表单在 Modal 内部，提交按钮在 Modal footer，父组件通过 `ref.current.submit()` 触发校验和提交。
 */
import React, { useState, useRef } from 'react';
import { Form, Input, Select, Modal, Button, message } from 'aeroui';
import type { FormInstance } from 'aeroui';

export default () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);

  const handleOk = async () => {
    try {
      // 父组件通过 ref 触发子组件表单校验 + 提交
      const values = await formRef.current!.validateFields();
      console.log('表单数据:', values);
      message.success('创建成功');
      setOpen(false);
      formRef.current!.resetFields();
    } catch (err: any) {
      // 校验失败，用 toast 提示第一条错误
      const firstMsg = err?.errorFields?.[0]?.errors?.[0];
      if (firstMsg) message.error(firstMsg);
      return Promise.reject();
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        新建用户
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="新建用户"
        onOk={handleOk}
        onCancel={() => {
          setOpen(false);
          formRef.current?.resetFields();
        }}
      >
        <Form
          ref={formRef}
          layout="vertical"
          style={{ marginTop: 16 }}
        >
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
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
            name="role"
            label="角色"
            rules={[{ required: true, message: '请选择角色' }]}
          >
            <Select
              placeholder="请选择"
              options={[
                { label: '管理员', value: 'admin' },
                { label: '编辑', value: 'editor' },
                { label: '访客', value: 'viewer' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
