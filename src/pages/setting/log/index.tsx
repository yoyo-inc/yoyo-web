import React, { useState } from 'react';
import Page from '@/components/page';
import TabsMenu from '@/components/tabs-menu';

export default function Log() {
  return (
    <Page>
      <TabsMenu
        commonPath="/setting/log"
        initialActiveKey="audit_log"
        items={[
          {
            key: 'audit_log',
            label: '审计日志',
          },
          {
            key: 'security_log',
            label: '安全日志',
          },
          {
            key: 'run_log',
            label: '运行日志',
          },
          // {
          //   key: 'log_config',
          //   label: '日志设置',
          // },
        ]}
      />
    </Page>
  );
}
