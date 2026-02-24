/**
 * title: " "
 * description: ConfigProvider supports nesting. Inner configuration overrides outer. Properties not explicitly passed are inherited from the outer layer.
 */
import React, { useState } from 'react';
import { ConfigProvider, zhCN, enUS, Modal, Button, Flex, DatePicker } from 'aeroly';

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
            <Button onClick={() => setOpen2(true)}>Chinese Modal (nested override)</Button>
            <DatePicker />
          </Flex>
        </ConfigProvider>
      </Flex>

      <Modal open={open1} onOpenChange={setOpen1} title="English">
        <p>This modal inherits English locale from the outer ConfigProvider.</p>
      </Modal>
      <Modal open={open2} onOpenChange={setOpen2} title="Chinese">
        <p>This modal inherits Chinese locale from the inner ConfigProvider.</p>
      </Modal>
    </ConfigProvider>
  );
};
