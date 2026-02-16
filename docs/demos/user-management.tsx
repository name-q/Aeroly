/**
 * title: " "
 * description: 基于 AeroUI 组件实现的用户管理页面，包含搜索、Tab 筛选、表格、分页等常见后台管理功能。
 */
import React, { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';
import { Input, Button, Tabs, Table, Tag, Flex, Pagination } from 'aero-ui';
import type { ColumnType } from 'aero-ui';
import './user-management.less';

type Status = 'active' | 'pending' | 'disabled';
type Role = '管理员' | '编辑' | '用户';

interface UserRecord {
  id: number;
  name: string;
  initial: string;
  avatarColor: string;
  avatarBg: string;
  email: string;
  role: Role;
  status: Status;
}

const allUsers: UserRecord[] = [
  { id: 1, name: '张三', initial: '张', avatarColor: 'var(--aero-primary-color)', avatarBg: 'var(--aero-primary-color-light-4)', email: 'zhangsan@example.com', role: '管理员', status: 'active' },
  { id: 2, name: '李四', initial: '李', avatarColor: 'var(--aero-warning-color)', avatarBg: '#FFF3E0', email: 'lisi@example.com', role: '编辑', status: 'pending' },
  { id: 3, name: '王五', initial: '王', avatarColor: 'var(--aero-success-color)', avatarBg: '#E8F5E9', email: 'wangwu@example.com', role: '用户', status: 'active' },
  { id: 4, name: '赵六', initial: '赵', avatarColor: 'var(--aero-error-color)', avatarBg: '#FFEBEE', email: 'zhaoliu@example.com', role: '用户', status: 'disabled' },
  { id: 5, name: '陈七', initial: '陈', avatarColor: 'var(--aero-primary-color)', avatarBg: 'var(--aero-primary-color-light-4)', email: 'chenqi@example.com', role: '编辑', status: 'active' },
];

const statusMap: Record<Status, { label: string; type: 'success' | 'warning' | 'error' }> = {
  active: { label: '活跃', type: 'success' },
  pending: { label: '待审核', type: 'warning' },
  disabled: { label: '已禁用', type: 'error' },
};

const tabItems = [
  { key: 'all', label: '全部用户' },
  { key: 'active', label: '活跃用户' },
  { key: 'disabled', label: '已禁用' },
];

export default () => {
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('all');
  const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>([1]);
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(() => {
    let list = allUsers;
    if (tab === 'active') list = list.filter((u) => u.status === 'active');
    else if (tab === 'disabled') list = list.filter((u) => u.status === 'disabled');
    if (search) {
      const kw = search.toLowerCase();
      list = list.filter(
        (u) => u.name.includes(kw) || u.email.toLowerCase().includes(kw),
      );
    }
    return list;
  }, [tab, search]);

  const columns: ColumnType<UserRecord>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      render: (_: any, record: UserRecord) => (
        <Flex align="center" gap="sm">
          <span
            className="um-avatar"
            style={{ color: record.avatarColor, background: record.avatarBg }}
          >
            {record.initial}
          </span>
          <span>{record.name}</span>
        </Flex>
      ),
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 120,
      render: (role: Role) => (
        <Tag type="info" bordered={false}>{role}</Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status: Status) => {
        const s = statusMap[status];
        return <Tag type={s.type} bordered={false}>{s.label}</Tag>;
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      render: () => (
        <Flex gap="sm">
          <Button type="text" icon={Pencil} size="small" />
          <Button type="text" icon={Trash2} size="small" style={{ color: 'var(--aero-error-color)' }} />
        </Flex>
      ),
    },
  ];

  return (
    <div className="um-page">
      <Flex justify="between" align="center">
        <h2 className="um-title">用户管理</h2>
        <Flex gap="sm" align="center">
          <Input
            placeholder="搜索用户..."
            prefixIcon={Search}
            allowClear
            value={search}
            onChange={setSearch}
            style={{ width: 240 }}
          />
          <Button type="primary" icon={Plus}>添加用户</Button>
        </Flex>
      </Flex>

      <div className="um-card">
        <Tabs items={tabItems} activeKey={tab} onChange={(key) => { setTab(key); setCurrentPage(1); }} />
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          pagination={false}
        />
        <Flex justify="between" align="center" className="um-footer">
          <span className="um-footer-info">共 {filtered.length} 条记录</span>
          <Pagination
            current={currentPage}
            total={filtered.length}
            pageSize={5}
            size="small"
            onChange={(page) => setCurrentPage(page)}
          />
        </Flex>
      </div>
    </div>
  );
};
