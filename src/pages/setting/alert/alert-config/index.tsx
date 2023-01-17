import React, { useEffect, useRef, useState } from 'react';
import {
  EditableProTable,
  ProForm,
  ProFormCheckbox,
  ProFormDependency,
  ProFormGroup,
  ProFormInstance,
  ProFormText,
} from '@ant-design/pro-components';
import { Checkbox, message } from 'antd';
import api from '@/services/api';

export default function AlertConfig() {
  const formRef = useRef<ProFormInstance>();
  const [editableKeys, setEditableKeys] = useState<string[]>([]);
  useEffect(() => {
    api.alert
      .getAlertConfig({
        skipErrorHandler: true,
      })
      .then((res) => {
        const { emailEnable, ...otherValues } = res.data;
        const types = ['station'];
        if (emailEnable) {
          types.push('email');
        }
        setEditableKeys(
          (otherValues.smtpReceivers as any[]).reduce((prev, _, i) => {
            prev.push(i);
            return prev;
          }, []),
        );
        formRef.current?.setFields([
          {
            name: 'types',
            value: types,
          },
          ...Object.keys(otherValues).map((key) => ({
            name: key,
            value: otherValues[key],
          })),
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ width: '640px' }}>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={async (values) => {
          const { types, ...otherValues } = values;
          return api.alert
            .putAlertConfig({
              emailEnable: types.includes('email'),
              ...otherValues,
            })
            .then(() => {
              message.success('保存成功');
              return true;
            });
        }}
      >
        <ProFormCheckbox.Group
          name="types"
          label="告警方式"
          labelCol={{ span: 24 }}
          options={[
            {
              label: '站内信',
              value: 'station',
              disabled: true,
            },
            {
              label: '邮件',
              value: 'email',
            },
          ]}
          initialValue={['station']}
        ></ProFormCheckbox.Group>
        <ProFormDependency name={['types']}>
          {({ types }) => {
            if (types?.includes('email')) {
              return (
                <ProFormGroup title="邮件配置" direction="vertical">
                  <ProFormText
                    name="smtpServer"
                    label="邮件服务地址"
                    placeholder={'请输入IP或者域名'}
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  />
                  <ProFormText
                    name="smtpSender"
                    label="邮件发送方"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  ></ProFormText>
                  <ProFormText
                    name="smtpAuthUser"
                    label="邮件发送方账号"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  ></ProFormText>
                  <ProFormText.Password
                    name="smtpAuthPassword"
                    label="邮件发送方密码"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  ></ProFormText.Password>
                  <ProForm.Item label="接收人">
                    <EditableProTable
                      loading={false}
                      rowKey="id"
                      name="smtpReceivers"
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
                          title: '接收人',
                          dataIndex: 'email',
                          fieldProps: {
                            placeholder: '请输入邮箱',
                          },
                          formItemProps: {
                            rules: [
                              {
                                required: true,
                              },
                            ],
                          },
                        },
                        { title: '操作', valueType: 'option', width: 60 },
                      ]}
                      editable={{
                        type: 'multiple',
                        editableKeys: editableKeys,
                        actionRender(row: any, _, defaultDOM) {
                          return [defaultDOM.delete];
                        },
                        onChange(editableKeys) {
                          setEditableKeys(editableKeys as string[]);
                        },
                      }}
                      recordCreatorProps={{
                        record(index) {
                          return { id: index + 1, enable: true };
                        },
                        creatorButtonText: '新增接收人',
                      }}
                    ></EditableProTable>
                  </ProForm.Item>
                </ProFormGroup>
              );
            }
            return <></>;
          }}
        </ProFormDependency>
      </ProForm>
    </div>
  );
}
