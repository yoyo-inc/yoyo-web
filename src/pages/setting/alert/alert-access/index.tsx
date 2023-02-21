import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';
import { Alert, Tag } from 'antd';

const FIELDS = [
  ['告警时间字段', 'startAtField'],
  ['类型字段', 'typeField'],
  ['级别字段', 'levelField'],
  ['告警内容字段', 'contentField'],
];

export default function AlertAccess() {
  const columns: FormTableColumnsType<API.AlertAccess> = [
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
      title: 'ID',
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
      title: '接入IP',
      dataIndex: 'accessIP',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '接入字段',
      dataIndex: '',
      hideInSearch: true,
      hideInForm: true,
      render(_: any, entity: any) {
        return FIELDS.map((item) => (
          <Tag>
            {item[0]}:{entity[item[1]] || '无'}
          </Tag>
        ));
      },
    },
    {
      title: '字段映射',
      //@ts-ignore
      valueType: 'group',
      hideInSearch: true,
      hideInTable: true,
      columns: FIELDS.map((field) => ({
        title: field[0],
        dataIndex: field[1],
        hideInSearch: true,
        hideInTable: true,
      })),
    },
  ];
  return (
    <div>
      <Alert
        message={`通过HTTP方式，将告警数据发送到接口 POST ${location.origin}/api/access/alert`}
      ></Alert>
      <FormTable<API.AlertAccess>
        moduleName="告警接入"
        columns={columns}
        request={async (params) => {
          return api.alert.getAlertAccesses({ ...params }).then(transformPaginatedData);
        }}
        onFinish={async (isAdd, values) => {
          if (isAdd) {
            return api.alert.postAlertAccess(values).then(() => {
              return true;
            });
          } else {
            //@ts-ignore
            return api.alert.putAlertAccess(values).then(() => {
              return true;
            });
          }
        }}
        onDelete={(rowKey) =>
          api.alert
            .deleteAlertAccessId({
              id: rowKey,
            })
            .then(() => {
              return true;
            })
        }
      ></FormTable>
    </div>
  );
}
