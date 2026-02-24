/**
 * title: " "
 * description: Switch language packs via the `locale` property. All child component built-in texts switch automatically. Component's own props (e.g. `okText`) take priority over locale.
 */
import React, { useState } from 'react';
import {
  ConfigProvider, zhCN, enUS,
  Modal, Button, Flex, Segmented, DatePicker,
  TimePicker, Pagination, Empty, Tour,
} from 'aeroly';

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
            { label: 'Chinese', value: 'zh' },
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
          <p>{lang === 'zh' ? 'Notice the footer button text changes with locale' : 'Notice the footer button text changes with locale'}</p>
        </Modal>

        <Tour
          open={tourOpen}
          onOpenChange={setTourOpen}
          steps={[
            { target: btnRef, title: lang === 'zh' ? 'Step 1' : 'Step 1', description: lang === 'zh' ? 'Click here to start' : 'Click here to start' },
            { title: lang === 'zh' ? 'Step 2' : 'Step 2', description: lang === 'zh' ? 'No target, centered' : 'No target, centered' },
          ]}
        />
      </Flex>
    </ConfigProvider>
  );
};
