/**
 * title: " "
 * description: 通过 `description` 添加辅助说明文字，适合需要更多上下文的场景。
 */
import React from 'react';
import { Alert } from 'aeroui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Alert type="info" description="这里是辅助描述文字，提供更多上下文信息帮助用户理解。">
      信息提示标题
    </Alert>
    <Alert type="success" description="所有数据已同步至云端，可在其他设备上查看。">
      同步完成
    </Alert>
    <Alert type="warning" description="当前版本将于 30 天后停止维护，请尽快升级。">
      版本即将过期
    </Alert>
    <Alert type="error" description="错误码：500，请联系管理员或稍后重试。">
      服务器异常
    </Alert>
  </div>
);
