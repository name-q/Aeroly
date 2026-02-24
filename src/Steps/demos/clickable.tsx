/**
 * title: " "
 * description: 设置 `clickable` 允许点击步骤切换，配合 `onChange` 使用。
 */
import React, { useState } from 'react';
import { Steps } from 'aeroly';

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <Steps
      current={current}
      clickable
      onChange={setCurrent}
      items={[
        { title: '第一步', description: '填写基本信息' },
        { title: '第二步', description: '上传资料' },
        { title: '第三步', description: '确认提交' },
      ]}
    />
  );
};
