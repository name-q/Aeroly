/**
 * title: " "
 * description: Use `Form.List` to dynamically add/remove form items, supporting `add`, `remove`, and `move` operations.
 */
import React from 'react';
import { Form, Input, Button, Flex, ConfigProvider, enUS } from 'aero-ui';

export default () => {
  const [form] = Form.useForm();

  return (
    <ConfigProvider locale={enUS}>
    <Form
      form={form}
      initialValues={{ members: [{ name: '', email: '' }] }}
      onFinish={(values) => console.log('Submit:', values)}
      style={{ maxWidth: 500 }}
    >
      <Form.List name="members">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key} style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>
                  Member {index + 1}
                </div>
                <Flex gap={8} align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      name={`members.${field.name}.name`}
                      rules={[{ required: true, message: 'Please enter name' }]}
                    >
                      <Input placeholder="Name" />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      name={`members.${field.name}.email`}
                      rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Invalid email format' },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      onClick={() => remove(index)}
                      style={{ marginTop: 2 }}
                    >
                      Delete
                    </Button>
                  )}
                </Flex>
              </div>
            ))}
            <Form.Item>
              <Button onClick={() => add({ name: '', email: '' })}>
                + Add Member
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
    </ConfigProvider>
  );
};
