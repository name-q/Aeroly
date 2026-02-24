/**
 * title: " "
 * description: 命令式调用，适合简单的确认/提示场景。支持 `confirm`、`info`、`success`、`warning`、`error` 五种类型。
 */
import React from 'react';
import { Button, Modal } from 'aeroly';

export default () => (
  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
    <Button
      onClick={() =>
        Modal.confirm({
          title: '确认删除',
          content: '删除后不可恢复，确定要继续吗？',
          onOk: () => console.log('确认'),
        })
      }
    >
      Confirm
    </Button>
    <Button onClick={() => Modal.info({ title: '提示', content: '这是一条信息。' })}>
      Info
    </Button>
    <Button onClick={() => Modal.success({ title: '成功', content: '操作已完成。' })}>
      Success
    </Button>
    <Button onClick={() => Modal.warning({ title: '警告', content: '请注意风险。' })}>
      Warning
    </Button>
    <Button onClick={() => Modal.error({ title: '错误', content: '操作失败，请重试。' })}>
      Error
    </Button>
  </div>
);
