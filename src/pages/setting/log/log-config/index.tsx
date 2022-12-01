import React from 'react';
import { ProForm, ProFormDigit } from '@ant-design/pro-components';

export default function LogConfig() {
  return (
    <div style={{ width: '640px' }}>
      <ProForm layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <ProFormDigit label="日志保留时间"></ProFormDigit>
      </ProForm>
    </div>
  );
}
