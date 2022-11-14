import React from 'react';
import { ProForm, ProFormDigit } from '@ant-design/pro-components';

export default function LogConfig() {
  return (
    <div>
      <ProForm>
        <ProFormDigit label="日志保留时间"></ProFormDigit>
      </ProForm>
    </div>
  );
}
