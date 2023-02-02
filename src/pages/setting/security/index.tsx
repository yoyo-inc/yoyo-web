import React from 'react';
import {
  ProForm,
  ProFormSwitch,
  ProFormDependency,
  ProFormDigit,
  EditableProTable,
} from '@ant-design/pro-components';
import Page from '@/components/page';
import FormPanel from '@/components/form-panel';
import { Checkbox } from 'antd';

export default function SystemSecurity() {
  return (
    <Page>
      <FormPanel>
        <ProForm layout="horizontal" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <ProFormSwitch name="forbidRepeatLogin" label="禁止重复登录"></ProFormSwitch>
          <ProFormSwitch name="loginExpireEnable" label="登录过期"></ProFormSwitch>
          <ProFormDependency name={['loginExpireEnable']}>
            {({ loginExpireEnable }) => {
              if (!loginExpireEnable) {
                return;
              }
              return (
                <ProFormDigit
                  name={'loginExpireTime'}
                  label="过期时间"
                  addonAfter="分钟"
                ></ProFormDigit>
              );
            }}
          </ProFormDependency>
          <ProFormSwitch name="loginIPWhitelistEnable" label="登录白名单"></ProFormSwitch>
          <ProFormDependency name={['loginIPWhitelistEnable']}>
            {({ loginIPWhitelistEnable }) => {
              if (!loginIPWhitelistEnable) {
                return;
              }
              return (
                <EditableProTable
                  loading={false}
                  rowKey="id"
                  name="loginIPWhitelist"
                  controlled
                  columns={[
                    {
                      title: '启用',
                      dataIndex: 'enable',
                      width: 60,
                      valueType: 'checkbox',
                      formItemProps: { valuePropName: 'checked' },
                      renderFormItem() {
                        return <Checkbox></Checkbox>;
                      },
                      render(_: any, entity: any) {
                        return <Checkbox checked={entity.enable} />;
                      },
                    },
                    {
                      title: 'IP',
                      dataIndex: 'ip',
                    },
                  ]}
                ></EditableProTable>
              );
            }}
          </ProFormDependency>
        </ProForm>
      </FormPanel>
    </Page>
  );
}
