/**
 * title: " "
 * description: 基础用法，包裹子组件即可生效。不传任何配置时等同于默认行为（中文）。
 */
import React from 'react';
import { ConfigProvider, Modal, Button, Flex } from 'aeroly';

export default () => {
  const [open, setOpen] = React.useState(false);

  return (
    <ConfigProvider>
      <Flex gap={12}>
        <Button onClick={() => setOpen(true)}>打开弹窗</Button>
        <Button onClick={() => Modal.confirm({ title: '确认操作', content: '确定要继续吗？' })}>
          命令式确认
        </Button>
      </Flex>
      <Modal open={open} onOpenChange={setOpen} title="默认配置">
        <p>ConfigProvider 不传 locale 时，组件使用中文默认值。</p>
      </Modal>
    </ConfigProvider>
  );
};
