import {
  FormInstance,
  ProForm,
  ProFormCheckbox,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useEffect, useRef } from 'react';
import api from '@/services/api';
import { message } from 'antd';

export default function ReportConfig() {
  const formRef = useRef<FormInstance>();
  useEffect(() => {
    api.report.getReportConfig().then((res) => {
      formRef.current?.setFields(
        Object.keys(res.data).map((key) => ({
          name: key,
          value: res.data[key],
        })),
      );
    });
  }, []);
  return (
    <div style={{ width: '640px' }}>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={async (values) => {
          return api.report.putReportConfig(values).then((res) => {
            message.success('更新成功');
            return res.data;
          });
        }}
      >
        <ProForm.Group title="定期报告设置" direction="vertical">
          <ProFormCheckbox.Group
            name="period"
            label="周期"
            options={[
              { label: '每天', value: 'day' },
              { label: '每周', value: 'week' },
              { label: '每月', value: 'month' },
              { label: '每年', value: 'year' },
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
        </ProForm.Group>
      </ProForm>
    </div>
  );
}
