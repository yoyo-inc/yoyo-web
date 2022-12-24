import React from 'react';
import { ProForm, ProFormDigit } from '@ant-design/pro-components';
import FormPanel from '@/components/form-panel';

export default function LogConfig() {
  return (
    <FormPanel>
      <ProForm layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <ProFormDigit label="日志保留时间"></ProFormDigit>
      </ProForm>
    </FormPanel>
  );
}
