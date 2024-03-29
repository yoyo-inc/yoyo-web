import React, { useEffect, useRef } from 'react';
import { message } from 'antd';
import {
  ProForm,
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { isEmpty } from 'lodash';
import Page from '@/components/page';
import api from '@/services/api';
import { expand } from '@/utils';
import styles from './index.less';
import { getToken } from '@/utils/token';

export default function SystemSetting() {
  const { data: systemSetting } = useRequest<API.IResponse<API.SystemSetting>>(
    api.system.getSystemSettings,
  );
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    if (!isEmpty(systemSetting)) {
      if (systemSetting.logo) {
        // @ts-ignore
        systemSetting.logo = [
          {
            uid: systemSetting.logo.id,
            name: systemSetting.logo.filename,
            url:
              systemSetting.logo.resourceName &&
              '/api/resource/upload/' + systemSetting.logo.resourceName + '?token=' + getToken(),
          },
        ];
      }
      formRef.current?.setFields(expand(systemSetting));
    }
  }, [systemSetting]);
  return (
    <Page>
      <div className={styles.system}>
        <ProForm
          formRef={formRef}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={async (values) => {
            const { logo, ...extraValues } = values;
            if (!isEmpty(logo) && logo[0].status !== 'error') {
              if (logo[0].response) {
                extraValues['resourceID'] = logo[0]?.response.data.id;
              } else {
                extraValues['resourceID'] = logo[0]?.uid;
              }
            }
            return api.system.putSystemSetting(extraValues).then((res) => {
              if (res.data) {
                message.success('更新成功');
              }
              return res.data;
            });
          }}
        >
          <ProFormText label="id" name="id" hidden></ProFormText>
          <ProFormText label="系统名称" name="name" required></ProFormText>
          <ProFormTextArea label="系统描述" name="description"></ProFormTextArea>
          <ProFormUploadButton
            label="系统logo"
            name="logo"
            accept="image/png,image/jpg"
            action="/api/resource/upload/upload"
            max={1}
            fieldProps={{
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token') || '',
              },
              async onRemove(file) {
                if (file.status !== 'done') {
                  return true;
                }
                return api.resource.deleteResourceId({ id: file.uid }).then((res) => res.data);
              },
            }}
          ></ProFormUploadButton>
        </ProForm>
      </div>
    </Page>
  );
}
