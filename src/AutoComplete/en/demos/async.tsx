/**
 * title: " "
 * description: Connects to a local Koa server (localhost:3001) for async city search. Real-time requests on input with loading state and debounce.
 */
import React, { useState, useRef, useCallback } from 'react';
import { AutoComplete, Icon, ConfigProvider, enUS } from 'aeroly';
import { MapPin } from 'lucide-react';
import type { AutoCompleteOption } from 'aeroly';

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
    <ConfigProvider locale={enUS}>
    <AutoComplete
      value={value}
      onChange={handleChange}
      options={options}
      filterOption={false}
      loading={loading}
      placeholder="Search city name, connects to localhost:3001"
      allowClear
      notFoundContent="No matching cities found"
      prefix={<Icon icon={MapPin} size={15} />}
      style={{ maxWidth: 360 }}
    />
    </ConfigProvider>
  );
};
