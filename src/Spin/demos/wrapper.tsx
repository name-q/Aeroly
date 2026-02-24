/**
 * title: " "
 * description: 包裹内容时，加载状态会在内容上方覆盖遮罩。可通过切换按钮控制加载状态。
 */
import React, { useState } from 'react';
import { Spin, Button, Alert } from 'aeroui';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Button onClick={() => setLoading((v) => !v)} style={{ marginBottom: 16 }}>
        {loading ? '停止加载' : '开始加载'}
      </Button>
      <Spin spinning={loading} tip="加载中...">
        <Alert
          type="info"
          title="内容区域"
          description="这里是被 Spin 包裹的内容。加载时会显示遮罩和居中的加载指示器，内容会降低对比度。"
        />
      </Spin>
    </div>
  );
};
