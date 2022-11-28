import React, { useEffect, useRef } from 'react';
import {
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import Page from '@/components/page';
import { useRequest } from '@umijs/max';
import api from '@/services/api';
import { expand } from '@/utils';

export default function SystemSetting() {
  const { data: systemSetting } = useRequest(api.system.getSystemSettings);
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (systemSetting) {
      formRef.current?.setFields(expand(systemSetting));
    }
  }, [systemSetting]);
  return (
    <Page>
      <div style={{ width: '640px' }}>
        <ProForm
          formRef={formRef}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <ProFormText label="系统名称" name="name"></ProFormText>
          <ProFormTextArea label="系统描述" name="description"></ProFormTextArea>
          <ProFormUploadButton label="系统logo" name="logo"></ProFormUploadButton>
        </ProForm>
      </div>
    </Page>
  );
}
