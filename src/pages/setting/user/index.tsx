import React from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';

import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

export default function User() {
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'username',
      title: '用户名',
      onFilter: true,
    },
    {
      dataIndex: 'sex',
      title: '性别',
      valueEnum: {
        '0': {
          text: '男',
        },
        '1': {
          text: '女',
        },
      },
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'phone',
      title: '手机号',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: () => [<a key="edit">编辑</a>, <a key="delete">删除</a>],
    },
  ];
  return (
    <div>
      <ProTable
        columns={columns}
        rowKey={'id'}
        request={async (params) => {
          return api.user
            .getUser({
              ...params,
            })
            .then(transformPaginatedData);
        }}
      />
    </div>
  );
}
