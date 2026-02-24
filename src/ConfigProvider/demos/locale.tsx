/**
 * title: " "
 * description: 通过 `locale` 属性切换语言包，所有子组件的内置文案自动切换。组件自身的 prop（如 `okText`）优先级高于 locale。
 */
import React, { useState } from 'react';
import {
  ConfigProvider, zhCN, enUS,
  Modal, Button, Flex, Segmented, DatePicker,
  TimePicker, Pagination, Empty, Tour,
} from 'aeroui';

export default () => {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [modalOpen, setModalOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const btnRef = React.useRef<HTMLButtonElement>(null);

  const locale = lang === 'zh' ? zhCN : enUS;

  return (
    <ConfigProvider locale={locale}>
      <Flex direction="column" gap={16}>
        <Segmented
          value={lang}
          onChange={(v) => setLang(v as 'zh' | 'en')}
          options={[
            { label: '中文', value: 'zh' },
            { label: 'English', value: 'en' },
          ]}
        />

        <Flex gap={12} wrap>
          <Button onClick={() => setModalOpen(true)}>Modal</Button>
          <Button ref={btnRef} onClick={() => setTourOpen(true)}>Tour</Button>
          <DatePicker />
          <TimePicker />
        </Flex>

        <Pagination total={100} showSizeChanger showQuickJumper />

        <Empty preset="search" />

        <Modal open={modalOpen} onOpenChange={setModalOpen} title="Locale Demo">
          <p>{lang === 'zh' ? '注意底部按钮文案随语言切换' : 'Notice the footer button text changes with locale'}</p>
        </Modal>

        <Tour
          open={tourOpen}
          onOpenChange={setTourOpen}
          steps={[
            { target: btnRef, title: lang === 'zh' ? '第一步' : 'Step 1', description: lang === 'zh' ? '点击这里开始' : 'Click here to start' },
            { title: lang === 'zh' ? '第二步' : 'Step 2', description: lang === 'zh' ? '无目标居中显示' : 'No target, centered' },
          ]}
        />
      </Flex>
    </ConfigProvider>
  );
};
