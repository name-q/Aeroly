import { Icon } from 'aeroly';
import { Home, Search, Settings, User, Bell } from 'lucide-react';

export default () => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
    <Icon icon={Home} />
    <Icon icon={Search} />
    <Icon icon={Settings} />
    <Icon icon={User} />
    <Icon icon={Bell} size={20} />
  </div>
);
