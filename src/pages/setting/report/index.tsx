import React from 'react';
import Page from '@/components/page';
import TabsMenu from '@/components/tabs-menu';

export default function Report() {
  return (
    <Page>
      <TabsMenu
        commonPath="/setting/report"
        initialActiveKey="report_list"
        items={[
          {
            key: 'report_list',
            label: '报告列表',
          },
          {
            key: 'report_config',
            label: '报告设置',
          },
        ]}
      ></TabsMenu>
    </Page>
  );
}
