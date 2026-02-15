export interface Locale {
  locale: string;

  Modal: {
    okText: string;
    cancelText: string;
  };

  Empty: {
    default: { title: string; description: string };
    search: { title: string; description: string };
    noData: { title: string; description: string };
    noPermission: { title: string; description: string };
    networkError: { title: string; description: string };
    noContent: { title: string; description: string };
  };

  Tour: {
    prevStep: string;
    nextStep: string;
    finish: string;
  };

  Upload: {
    dragText: string;
    uploadText: string;
    sizeExceed: string;
  };

  DatePicker: {
    placeholder: string;
    yearFormat: string;
    monthFormat: string;
    today: string;
    now: string;
    confirm: string;
    weekdays: string[];
    months: string[];
  };

  DateRangePicker: {
    startPlaceholder: string;
    endPlaceholder: string;
    now: string;
    confirm: string;
  };

  TimePicker: {
    placeholder: string;
    now: string;
    confirm: string;
  };

  Pagination: {
    prevPage: string;
    nextPage: string;
    itemsPerPage: string;
    jumpTo: string;
    page: string;
  };

  QRCode: {
    expired: string;
    refresh: string;
    scanned: string;
    download: string;
    copy: string;
  };

  FloatButton: {
    backToTop: string;
  };
}
