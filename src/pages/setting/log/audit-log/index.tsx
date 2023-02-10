import React from 'react';
import { Tag } from 'antd';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

export default function AuditLog() {
  const columns: FormTableColumnsType<API.AuditLog> = [
    {
      title: '时间',
      dataIndex: 'createTime',
      valueType: 'dateTimeRange',
      width: 220,
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
      title: '操作人',
      dataIndex: 'user',
      width: 120,
      renderText(text: API.User) {
        if (!text.nickname) {
          return '';
        }
        return `${text.nickname}(${text.username})`;
      },
      valueType: 'select',
      request() {
        return api.user.getUsers({ current: 1, pageSize: 100 }).then((res) =>
          res.data.list.map((item: API.User) => ({
            label: item.nickname || item.username,
            value: item.id,
          })),
        );
      },
    },
    {
      title: '接入IP',
      dataIndex: 'ip',
    },
    {
      title: '模块',
      dataIndex: 'module',
      valueType: 'select',
      async request() {
        return api.auditLog.getAuditLogModules().then((res) =>
          res.data?.map((item: string) => ({
            label: item,
            value: item,
          })),
        );
      },
    },
    {
      title: '动作',
      dataIndex: 'operation',
      hideInSearch: true,
    },
    {
      title: '结果',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '失败',
            status: 'error',
          },
        ],
        [
          1,
          {
            text: '成功',
            status: 'success',
          },
        ],
      ]),
      render(_: any, entity) {
        if (entity.status === 0) {
          return <Tag color="red">失败</Tag>;
        } else {
          return <Tag color="green">成功</Tag>;
        }
      },
    },
    {
      title: '描述',
      dataIndex: 'detail',
      width: 360,
      hideInSearch: true,
      ellipsis: true,
      customFieldProps(isAdd, isDesc) {
        if (isDesc) {
          return {
            ellipsis: false,
          };
        }
        return {};
      },
    },
  ];

  return (
    <div>
      <FormTable
        moduleName="审计日志"
        columns={columns}
        actions={['desc']}
        request={async (params) => {
          return api.auditLog.getAuditLogs({ ...params }).then(transformPaginatedData);
        }}
        customToolBarRender={() => []}
      ></FormTable>
    </div>
  );
}
