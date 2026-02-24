import React from 'react';
import { Empty } from 'aeroly';
import { Ghost } from 'lucide-react';

export default () => (
  <Empty
    icon={Ghost}
    iconSize={56}
    title="Page Not Found"
    description="The page you visited does not exist. It may have been removed or the link is incorrect."
  />
);
