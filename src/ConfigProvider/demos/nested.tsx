/**
 * title: " "
 * description: ConfigProvider 支持嵌套，内层配置覆盖外层。未显式传入的属性继承外层。
 */
import React, { useState } from 'react';
import { ConfigProvider, zhCN, enUS, Modal, Button, Flex, DatePicker } from 'aero-ui';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <Flex direction="column" gap={16}>
        <Flex gap={12}>
          <Button onClick={() => setOpen1(true)}>English Modal</Button>
          <DatePicker />
        </Flex>

        <ConfigProvider locale={zhCN}>
          <Flex gap={12}>
            <Button onClick={() => setOpen2(true)}>中文 Modal（嵌套覆盖）</Button>
            <DatePicker />
          </Flex>
        </ConfigProvider>
      </Flex>

      <Modal open={open1} onOpenChange={setOpen1} title="English">
        <p>This modal inherits English locale from the outer ConfigProvider.</p>
      </Modal>
      <Modal open={open2} onOpenChange={setOpen2} title="中文">
        <p>这个弹窗继承了内层 ConfigProvider 的中文 locale。</p>
      </Modal>
    </ConfigProvider>
  );
};
