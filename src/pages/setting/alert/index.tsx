import React, { useState } from 'react';
import TabsMenu from '@/components/tabs-menu';
import Page from '@/components/page';

export default function Alert() {
  return (
    <Page>
      <TabsMenu
        commonPath="/setting/alert"
        items={[
          {
            key: 'list',
            label: '告警列表',
          },
          {
            key: 'config',
            label: '告警配置',
          },
        ]}
        initialActiveKey="list"
      />
    </Page>
  );
}