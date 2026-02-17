/**
 * title: " "
 * description: Form in Modal -- parent component controls the child Form via `ref`. The form is inside the Modal, submit button is in the Modal footer, and the parent triggers validation and submission via `ref.current.submit()`.
 */
import React, { useState, useRef } from 'react';
import { Form, Input, Select, Modal, Button, message, ConfigProvider, enUS } from 'aero-ui';
import type { FormInstance } from 'aero-ui';

export default () => {
  const [open, setOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);

  const handleOk = async () => {
    try {
      // Parent triggers child form validation + submission via ref
      const values = await formRef.current!.validateFields();
      console.log('Form data:', values);
      message.success('Created successfully');
      setOpen(false);
      formRef.current!.resetFields();
    } catch (err: any) {
      // Validation failed, show first error via toast
      const firstMsg = err?.errorFields?.[0]?.errors?.[0];
      if (firstMsg) message.error(firstMsg);
      return Promise.reject();
    }
  };

  return (
    <ConfigProvider locale={enUS}>
      <Button type="primary" onClick={() => setOpen(true)}>
        Create User
      </Button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Create User"
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
            label="Name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input placeholder="Enter name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Invalid email format' },
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
              placeholder="Select"
              options={[
                { label: 'Admin', value: 'admin' },
                { label: 'Editor', value: 'editor' },
                { label: 'Viewer', value: 'viewer' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </ConfigProvider>
  );
};
