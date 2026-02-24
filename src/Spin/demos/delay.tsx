/**
 * title: " "
 * description: 设置 `delay` 延迟显示加载指示器，避免短时间加载导致的闪烁。
 */
import React, { useState } from 'react';
import { Spin, Button, Alert } from 'aeroly';

export default () => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 3000);
        }}
        style={{ marginBottom: 16 }}
      >
        加载 3 秒（延迟 500ms 显示）
      </Button>
      <Spin spinning={loading} delay={500} tip="加载中...">
        <Alert
          type="info"
          title="延迟加载"
          description="Spin 会在 500ms 后才显示，如果加载在 500ms 内完成则不会出现闪烁。"
        />
      </Spin>
    </div>
  );
};
