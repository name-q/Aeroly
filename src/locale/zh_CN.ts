import type { Locale } from './types';

const zhCN: Locale = {
  locale: 'zh_CN',

  Modal: {
    okText: '确定',
    cancelText: '取消',
  },

  Empty: {
    default: { title: '暂无数据', description: '当前没有可显示的内容' },
    search: { title: '未找到结果', description: '试试调整搜索条件或关键词' },
    noData: { title: '暂无数据', description: '数据为空，请稍后再试' },
    noPermission: { title: '无访问权限', description: '你没有权限查看此内容' },
    networkError: { title: '网络异常', description: '请检查网络连接后重试' },
    noContent: { title: '暂无内容', description: '还没有创建任何内容' },
  },

  Tour: {
    prevStep: '上一步',
    nextStep: '下一步',
    finish: '完成',
  },

  Upload: {
    dragText: '拖拽文件到此处，或点击上传',
    uploadText: '上传文件',
    sizeExceed: '文件大小超过限制（最大 {maxSize}）',
  },

  DatePicker: {
    placeholder: '请选择日期',
    yearFormat: '{year}年',
    monthFormat: '{month}月',
    today: '今天',
    now: '此刻',
    confirm: '确定',
    weekdays: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  },

  DateRangePicker: {
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    now: '此刻',
    confirm: '确定',
  },

  TimePicker: {
    placeholder: '请选择时间',
    now: '此刻',
    confirm: '确定',
  },

  Pagination: {
    prevPage: '上一页',
    nextPage: '下一页',
    itemsPerPage: '{size} 条/页',
    jumpTo: '跳至',
    page: '页',
  },

  QRCode: {
    expired: '二维码已过期',
    refresh: '点击刷新',
    scanned: '已扫描',
    download: '下载',
    copy: '复制',
  },

  FloatButton: {
    backToTop: '回到顶部',
  },

  Form: {
    required: '此项为必填项',
    whitespace: '不能只包含空格',
    min: '不能小于 {min}',
    max: '不能大于 {max}',
    minLength: '长度不能少于 {minLength}',
    maxLength: '长度不能超过 {maxLength}',
    pattern: '格式不正确',
    validateFailed: '校验失败',
    email: '请输入有效的邮箱地址',
    url: '请输入有效的 URL',
    number: '请输入数字',
    integer: '请输入整数',
    optional: '（选填）',
  },

  AutoComplete: {
    searching: '搜索中...',
  },
};

export default zhCN;
