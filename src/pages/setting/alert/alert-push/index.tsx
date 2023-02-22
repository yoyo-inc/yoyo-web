import React from 'react';
import { Tag } from 'antd';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

const NETWORK_ENUM = {
  tcp: {
    text: 'tcp',
  },
  udp: {
    text: 'udp',
  },
};

export default function AlertPush() {
  const columns: FormTableColumnsType<API.AlertPush> = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInSearch: true,
      formItemProps: {
        style: {
          display: 'none',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      hideInForm: true,
      search: {
        transform(value) {
          return { startTime: value[0], endTime: value[1] };
        },
      },
      render(_: any, entity) {
        return entity.createTime;
      },
    },
    {
      title: '推送方式',
      dataIndex: 'type',
      valueType: 'radio',
      valueEnum: {
        syslog: {
          text: 'syslog',
        },
        kafka: {
          text: 'kafka',
        },
      },
      initialValue: 'syslog',
      hideInSearch: true,
    },
    {
      title: '推送配置',
      dataIndex: 'config',
      hideInSearch: true,
      valueType: 'dependency',
      name: ['type'],
      render(dom, entity) {
        if (entity.type === 'syslog') {
          return (
            <>
              <Tag>网络类型:{entity.syslogNetwork}</Tag>
              <Tag>地址:{entity.syslogAddr}</Tag>
              <Tag>端口:{entity.syslogPort}</Tag>
              <Tag>tag:{entity.syslogTag}</Tag>
            </>
          );
        } else if (entity.type === 'kafka') {
          return (
            <>
              <Tag>网络类型:{entity.kafkaNetwork}</Tag>
              <Tag>地址:{entity.kafkaAddr}</Tag>
              <Tag>端口:{entity.kafkaPort}</Tag>
              <Tag>topic:{entity.kafkaTopic}</Tag>
            </>
          );
        } else {
          return dom;
        }
      },
    },
    {
      title: 'syslog配置',
      dataIndex: 'syslog',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'dependency',
      name: ['type'],
      columns: ({ type }) => {
        if (type === 'syslog') {
          return [
            {
              title: 'syslog网络类型',
              dataIndex: 'syslogNetwork',
              valueType: 'select',
              valueEnum: NETWORK_ENUM,
              initialValue: 'udp',
              hideInSearch: true,
            },
            {
              title: 'syslog地址',
              dataIndex: 'syslogAddr',
              hideInSearch: true,
            },
            {
              title: 'syslog端口',
              dataIndex: 'syslogPort',
              hideInSearch: true,
              valueType: 'digit',
              initialValue: 514,
            },
            {
              title: 'syslog tag',
              dataIndex: 'syslogTag',
              hideInSearch: true,
            },
          ];
        } else {
          return [];
        }
      },
    },
    {
      title: 'kafka配置',
      dataIndex: 'kafka',
      hideInSearch: true,
      hideInTable: true,
      valueType: 'dependency',
      name: ['type'],
      columns: ({ type }) => {
        if (type === 'kafka') {
          return [
            {
              title: 'kafka网络类型',
              dataIndex: 'kafkaNetwork',
              valueType: 'select',
              valueEnum: NETWORK_ENUM,
              initialValue: 'tcp',
              hideInSearch: true,
            },
            {
              title: 'kafka地址',
              dataIndex: 'kafkaAddr',
              hideInSearch: true,
            },
            {
              title: 'kafka端口',
              dataIndex: 'kafkaPort',
              hideInSearch: true,
              valueType: 'digit',
            },
            {
              title: 'kafka topic',
              dataIndex: 'kafkaTopic',
              hideInSearch: true,
            },
          ];
        } else {
          return [];
        }
      },
    },
    {
      title: '订阅告警类型',
      dataIndex: 'alertTypes',
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      async request() {
        return api.alert.getAlertTypes({}).then((res) => res.data);
      },
      hideInSearch: true,
    },
  ];
  return (
    <div>
      <FormTable
        moduleName="告警推送"
        columns={columns}
        request={async (params) => {
          return api.alert.getAlertPush({ ...params }).then(transformPaginatedData);
        }}
        onFinish={async (isAdd, values) => {
          if (isAdd) {
            return api.alert.postAlertPush(values).then((res) => res.data);
          } else {
            return api.alert.putAlertPush(values).then((res) => res.data);
          }
        }}
        onDelete={async (rowKey, _, actions) => {
          return api.alert.deleteAlertPushId({ id: rowKey }).then((res) => {
            actions.reload();
            return res.data;
          });
        }}
      ></FormTable>
    </div>
  );
}
