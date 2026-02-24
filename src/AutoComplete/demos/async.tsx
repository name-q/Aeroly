/**
 * title: " "
 * description: 连接本地 Koa 服务（localhost:3001）异步搜索城市，输入时实时请求，带 loading 状态和防抖。
 */
import React, { useState, useRef, useCallback } from 'react';
import { AutoComplete, Icon } from 'aeroui';
import { MapPin } from 'lucide-react';
import type { AutoCompleteOption } from 'aeroui';

const API = 'http://localhost:3001/api/search/cities';

export default () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState<AutoCompleteOption[]>([]);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const fetchCities = useCallback((keyword: string) => {
    clearTimeout(timerRef.current);
    if (!keyword.trim()) {
      setOptions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    timerRef.current = setTimeout(() => {
      fetch(`${API}?keyword=${encodeURIComponent(keyword)}`)
        .then((res) => res.json())
        .then((json) => {
          setOptions(
            (json.data || []).map((city: string) => ({ value: city })),
          );
        })
        .catch(() => setOptions([]))
        .finally(() => setLoading(false));
    }, 300);
  }, []);

  const handleChange = (val: string) => {
    setValue(val);
    fetchCities(val);
  };

  return (
    <AutoComplete
      value={value}
      onChange={handleChange}
      options={options}
      filterOption={false}
      loading={loading}
      placeholder="搜索城市名称，连接 localhost:3001"
      allowClear
      notFoundContent="未找到匹配城市"
      prefix={<Icon icon={MapPin} size={15} />}
      style={{ maxWidth: 360 }}
    />
  );
};
