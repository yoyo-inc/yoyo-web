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
            key: 'alert_list',
            label: '告警列表',
          },
          {
            key: 'alert_config',
            label: '告警配置',
          },
          {
            key: 'alert_access',
            label: '告警接入',
          },
          {
            key: 'alert_push',
            label: '告警推送',
          },
        ]}
        initialActiveKey="alert_list"
      />
    </Page>
  );
}
