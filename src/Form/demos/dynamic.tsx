/**
 * title: " "
 * description: 使用 `Form.List` 实现动态增减表单项，支持 `add`、`remove`、`move` 操作。
 */
import React from 'react';
import { Form, Input, Button, Flex } from 'aeroui';

export default () => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={{ members: [{ name: '', email: '' }] }}
      onFinish={(values) => console.log('提交:', values)}
      style={{ maxWidth: 500 }}
    >
      <Form.List name="members">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div key={field.key} style={{ marginBottom: 12 }}>
                <div style={{ marginBottom: 8, fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>
                  成员 {index + 1}
                </div>
                <Flex gap={8} align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      name={`members.${field.name}.name`}
                      rules={[{ required: true, message: '请输入姓名' }]}
                    >
                      <Input placeholder="姓名" />
                    </Form.Item>
                  </div>
                  <div style={{ flex: 1 }}>
                    <Form.Item
                      name={`members.${field.name}.email`}
                      rules={[
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '邮箱格式不正确' },
                      ]}
                    >
                      <Input placeholder="邮箱" />
                    </Form.Item>
                  </div>
                  {fields.length > 1 && (
                    <Button
                      onClick={() => remove(index)}
                      style={{ marginTop: 2 }}
                    >
                      删除
                    </Button>
                  )}
                </Flex>
              </div>
            ))}
            <Form.Item>
              <Button onClick={() => add({ name: '', email: '' })}>
                + 添加成员
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
