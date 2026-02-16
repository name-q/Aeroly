/**
 * title: " "
 * description: 基于 AeroUI 组件实现的商品入库页面，包含表单录入、表格展示、搜索、分页等典型仓储管理功能。
 */
import React, { useState, useMemo } from 'react';
import { Download, Plus, Search, Check, Pencil, Trash2 } from 'lucide-react';
import {
  Input,
  InputNumber,
  Button,
  Select,
  TextArea,
  Table,
  Tag,
  Flex,
  Pagination,
  Form,
  message,
} from 'aero-ui';
import type { ColumnType } from 'aero-ui';
import './product-inbound.less';

type InboundStatus = 'stocked' | 'pending';

interface ProductRecord {
  id: number;
  name: string;
  code: string;
  category: string;
  quantity: number;
  price: string;
  date: string;
  status: InboundStatus;
}

const mockData: ProductRecord[] = [
  { id: 1, name: 'iPhone 15 Pro', code: 'SP-001', category: '电子产品', quantity: 50, price: '¥7,999', date: '2024-01-15', status: 'stocked' },
  { id: 2, name: 'MacBook Air M3', code: 'SP-002', category: '电子产品', quantity: 30, price: '¥8,999', date: '2024-01-14', status: 'pending' },
  { id: 3, name: 'AirPods Pro 2', code: 'SP-003', category: '配件', quantity: 100, price: '¥1,899', date: '2024-01-13', status: 'stocked' },
];

const statusMap: Record<InboundStatus, { label: string; type: 'success' | 'warning' }> = {
  stocked: { label: '已入库', type: 'success' },
  pending: { label: '待审核', type: 'warning' },
};

const categoryOptions = [
  { label: '电子产品', value: '电子产品' },
  { label: '配件', value: '配件' },
  { label: '服装', value: '服装' },
  { label: '食品', value: '食品' },
];

const supplierOptions = [
  { label: 'Apple 官方', value: 'apple' },
  { label: '华为供应链', value: 'huawei' },
  { label: '小米生态链', value: 'xiaomi' },
];

export default () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search) return mockData;
    const kw = search.toLowerCase();
    return mockData.filter(
      (r) => r.name.toLowerCase().includes(kw) || r.code.toLowerCase().includes(kw),
    );
  }, [search]);

  const handleSubmit = (values: Record<string, any>) => {
    message.success('入库成功');
    form.resetFields();
  };

  const handleReset = () => {
    form.resetFields();
  };

  const columns: ColumnType<ProductRecord>[] = [
    { title: '商品名称', dataIndex: 'name', width: 180 },
    { title: '商品编码', dataIndex: 'code', width: 120 },
    { title: '分类', dataIndex: 'category' },
    { title: '数量', dataIndex: 'quantity', width: 80 },
    { title: '单价', dataIndex: 'price', width: 100 },
    { title: '入库时间', dataIndex: 'date', width: 120 },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: InboundStatus) => {
        const s = statusMap[status];
        return <Tag type={s.type} bordered={false}>{s.label}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: 80,
      render: () => (
        <Flex gap="sm">
          <Button type="text" icon={Pencil} size="small" />
          <Button type="text" icon={Trash2} size="small" style={{ color: 'var(--aero-error-color)' }} />
        </Flex>
      ),
    },
  ];

  return (
    <div className="pi-page">
      {/* 页头 */}
      <Flex justify="between" align="center">
        <div>
          <h2 className="pi-title">商品入库</h2>
          <p className="pi-subtitle">录入新商品信息并添加到库存</p>
        </div>
        <Flex gap="sm">
          <Button icon={Download}>导出</Button>
          <Button type="primary" icon={Plus}>新增入库</Button>
        </Flex>
      </Flex>

      {/* 入库表单 */}
      <div className="pi-card">
        <h3 className="pi-card-title">入库信息</h3>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <div className="pi-form-row">
            <Form.Item label="商品名称" name="name" rules={[{ required: true, message: '请输入商品名称' }]}>
              <Input placeholder="请输入商品名称" />
            </Form.Item>
            <Form.Item label="商品编码" name="code" rules={[{ required: true, message: '请输入商品编码' }]}>
              <Input placeholder="请输入商品编码" />
            </Form.Item>
          </div>
          <div className="pi-form-row">
            <Form.Item label="商品分类" name="category" rules={[{ required: true, message: '请选择分类' }]}>
              <Select options={categoryOptions} placeholder="请选择分类" />
            </Form.Item>
            <Form.Item label="供应商" name="supplier" rules={[{ required: true, message: '请选择供应商' }]}>
              <Select options={supplierOptions} placeholder="请选择供应商" />
            </Form.Item>
          </div>
          <div className="pi-form-row">
            <Form.Item label="入库数量" name="quantity" rules={[{ required: true, message: '请输入数量' }]}>
              <InputNumber placeholder="请输入数量" min={1} controls={false} />
            </Form.Item>
            <Form.Item label="单价 (元)" name="price" rules={[{ required: true, message: '请输入单价' }]}>
              <InputNumber placeholder="请输入单价" min={0} precision={2} controls={false} />
            </Form.Item>
          </div>
          <div className="pi-form-row">
            <Form.Item label="税额 (元)" name="tax">
              <InputNumber placeholder="请输入税额" min={0} precision={2} controls={false} />
            </Form.Item>
            <Form.Item label="品牌" name="brand">
              <Input placeholder="请输入品牌" />
            </Form.Item>
          </div>
          <Form.Item label="备注" name="remark">
            <TextArea placeholder="Please enter content..." maxLength={200} showCount rows={3} />
          </Form.Item>
          <Flex justify="end" gap="sm">
            <Button onClick={handleReset}>重置</Button>
            <Button type="primary" icon={Check} htmlType="submit">确认入库</Button>
          </Flex>
        </Form>
      </div>

      {/* 入库记录表格 */}
      <div className="pi-card">
        <Flex justify="between" align="center" style={{ marginBottom: 16 }}>
          <h3 className="pi-card-title" style={{ marginBottom: 0 }}>入库记录</h3>
          <Input
            placeholder="搜索商品..."
            prefixIcon={Search}
            allowClear
            value={search}
            onChange={setSearch}
            style={{ width: 240 }}
          />
        </Flex>
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={false}
        />
        <Flex justify="between" align="center" className="pi-footer">
          <span className="pi-footer-info">共 {filtered.length} 条记录，第 1/1 页</span>
          <Pagination
            current={currentPage}
            total={filtered.length}
            pageSize={10}
            size="small"
            onChange={(page) => setCurrentPage(page)}
          />
        </Flex>
      </div>
    </div>
  );
};
