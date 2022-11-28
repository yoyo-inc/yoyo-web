import React, { useEffect, useState } from 'react';
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
      renderText(text: API.User) {
        return `${text.nickname}(${text.username})`;
      },
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
      width: 460,
      hideInSearch: true,
      ellipsis: true,
    },
  ];

  return (
    <div>
      <FormTable
        moduleName="审计日志"
        columns={columns}
        actions={['desc']}
        request={async () => {
          return api.auditLog.getAuditLogs({}).then(transformPaginatedData);
        }}
        customToolBarRender={() => []}
      ></FormTable>
    </div>
  );
}
