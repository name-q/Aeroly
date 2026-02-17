import type { Locale } from './types';

const enUS: Locale = {
  locale: 'en_US',

  Modal: {
    okText: 'OK',
    cancelText: 'Cancel',
  },

  Empty: {
    default: { title: 'No Data', description: 'No content to display' },
    search: { title: 'No Results', description: 'Try adjusting your search criteria' },
    noData: { title: 'No Data', description: 'Data is empty, please try again later' },
    noPermission: { title: 'No Permission', description: 'You do not have access to this content' },
    networkError: { title: 'Network Error', description: 'Please check your network connection' },
    noContent: { title: 'No Content', description: 'No content has been created yet' },
  },

  Tour: {
    prevStep: 'Previous',
    nextStep: 'Next',
    finish: 'Finish',
  },

  Upload: {
    dragText: 'Drag files here, or click to upload',
    uploadText: 'Upload',
    sizeExceed: 'File size exceeds limit (max {maxSize})',
  },

  DatePicker: {
    placeholder: 'Select date',
    yearFormat: '{year}',
    monthFormat: '{month}',
    today: 'Today',
    now: 'Now',
    confirm: 'OK',
    weekdays: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },

  DateRangePicker: {
    startPlaceholder: 'Start date',
    endPlaceholder: 'End date',
    now: 'Now',
    confirm: 'OK',
  },

  TimePicker: {
    placeholder: 'Select time',
    now: 'Now',
    confirm: 'OK',
  },

  Pagination: {
    prevPage: 'Previous page',
    nextPage: 'Next page',
    itemsPerPage: '{size} / page',
    jumpTo: 'Go to',
    page: '',
  },

  QRCode: {
    expired: 'QR code expired',
    refresh: 'Refresh',
    scanned: 'Scanned',
    download: 'Download',
    copy: 'Copy',
  },

  FloatButton: {
    backToTop: 'Back to top',
  },

  Form: {
    required: 'This field is required',
    whitespace: 'Cannot be only whitespace',
    min: 'Cannot be less than {min}',
    max: 'Cannot be greater than {max}',
    minLength: 'Must be at least {minLength} characters',
    maxLength: 'Cannot exceed {maxLength} characters',
    pattern: 'Invalid format',
    validateFailed: 'Validation failed',
    email: 'Please enter a valid email address',
    url: 'Please enter a valid URL',
    number: 'Please enter a number',
    integer: 'Please enter an integer',
    optional: '(optional)',
  },

  AutoComplete: {
    searching: 'Searching...',
  },
};

export default enUS;
