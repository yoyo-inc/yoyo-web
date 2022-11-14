import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';
import { Popconfirm } from 'antd';

export default function AlertList() {
  const columns: FormTableColumnsType = [
    {
      title: '告警时间',
      dataIndex: 'startAt',
    },

    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
    },
    {
      title: '级别',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: {
        warning: {
          text: '警告',
          status: 'warning',
        },
        critical: {
          text: '严重',
          status: 'error',
        },
      },
    },
    {
      title: '告警内容',
      dataIndex: 'content',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '未读',
            status: 'default',
          },
        ],
        [
          1,
          {
            text: '已读',
            status: 'success',
          },
        ],
      ]),
    },
    {
      title: '处置状态',
      dataIndex: 'resolvedStatus',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '未处置',
            status: 'default',
          },
        ],
        [
          1,
          {
            text: '已处置',
            status: 'success',
          },
        ],
        [
          2,
          {
            text: '自动处置',
            color: 'blue',
          },
        ],
      ]),
    },
    {
      title: '处置结果',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      width: 140,
      render() {
        return [
          <a key="resolved">处置</a>,
          <Popconfirm key="ignore" title="确认忽略该告警？" onConfirm={() => {}}>
            <a>忽略</a>
          </Popconfirm>,
        ];
      },
    },
  ];
  return (
    <div>
      <FormTable
        columns={columns}
        request={async (params) => {
          return api.alert.getAlerts({ ...params }).then(transformPaginatedData);
        }}
        customToolBarRender={() => []}
      ></FormTable>
    </div>
  );
}
