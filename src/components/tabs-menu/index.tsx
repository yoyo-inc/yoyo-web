import React, { useState } from 'react';
import { useLocation, history } from '@umijs/max';
import { Tabs } from 'antd';
import { Outlet } from '@umijs/max';

export interface TabsMenuItem {
  key: string;
  label: string;
}

export interface TabsMenuProps {
  commonPath: string;
  items: TabsMenuItem[];
  initialActiveKey: string;
}

export default function TabsMenu(props: TabsMenuProps) {
  const { commonPath, items, initialActiveKey } = props;
  const location = useLocation();
  const typeExp = new RegExp(commonPath + '/(?<type>.*)');
  const type = typeExp.exec(location.pathname)?.groups?.type;
  const [activeKey, setActiveKey] = useState(type || initialActiveKey);

  return (
    <div>
      <Tabs
        destroyInactiveTabPane
        tabPosition="left"
        activeKey={activeKey}
        onChange={(key) => {
          setActiveKey(key);
          history.push(`${commonPath}/${key}`);
        }}
        items={items.map((item) => ({
          ...item,
          children: <Outlet />,
        }))}
      ></Tabs>
    </div>
  );
}
