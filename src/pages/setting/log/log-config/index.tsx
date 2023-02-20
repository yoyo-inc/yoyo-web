import React, { useEffect, useRef } from 'react';
import {
  ProForm,
  ProFormDigit,
  ProFormInstance,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import FormPanel from '@/components/form-panel';
import api from '@/services/api';
import { expand } from '@/utils';
import { message } from 'antd';

export default function LogConfig() {
  const formRef = useRef<ProFormInstance>();
  useEffect(() => {
    api.logConfig.getLogConfig().then((res) => {
      formRef.current?.setFields(expand(res.data));
    });
  }, []);
  return (
    <FormPanel>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        onFinish={async (values) => {
          return api.logConfig.postLogConfig(values).then((res) => {
            message.success('更新成功');
            return res.data;
          });
        }}
      >
        <ProFormText label="id" name="id" hidden></ProFormText>
        <ProFormDigit
          width={120}
          label="日志保留时间"
          name="keepTime"
          tooltip="超过时间的日志文件将会被删除"
          addonAfter="天"
        ></ProFormDigit>
        <ProFormSwitch
          label="日志归档"
          name="archive"
          tooltip="系统自动对历史日志文件归档保存"
        ></ProFormSwitch>
      </ProForm>
    </FormPanel>
  );
}
