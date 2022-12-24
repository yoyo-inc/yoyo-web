import { ProForm, ProFormCheckbox, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import api from '@/services/api';

export default function ReportConfig() {
  return (
    <div style={{ width: '640px' }}>
      <ProForm layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <ProForm.Group title="定期报告设置" direction="vertical">
          <ProFormCheckbox.Group
            name=""
            label="周期"
            options={[
              { label: '每天', value: 'day' },
              { label: '每周', value: 'week' },
              { label: '每月', value: 'month' },
            ]}
          ></ProFormCheckbox.Group>
          <ProFormSelect
            name="reportType"
            label="报告类型"
            fieldProps={{
              mode: 'multiple',
            }}
            request={async () => {
              return api.report.getReportTypes().then((res) => res.data);
            }}
          ></ProFormSelect>
          <ProFormText name="reportName" label="报告名称"></ProFormText>
        </ProForm.Group>
      </ProForm>
    </div>
  );
}
