import React, { useState } from 'react';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';
import FormTable, { FormTableColumnsType } from '@/components/form-table';

export default function User() {
  const columns: FormTableColumnsType<API.User>[] = [
    {
      dataIndex: 'username',
      title: '用户名',
    },
    {
      dataIndex: 'email',
      title: '邮箱',
      search: false,
    },
    {
      dataIndex: 'phone',
      title: '手机号',
      search: false,
    },
  ];
  return (
    <div>
      <FormTable
        columns={columns}
        rowKey={'id'}
        request={async (params) => {
          return api.user
            .getUsers({
              ...params,
            })
            .then(transformPaginatedData);
        }}
      />
    </div>
  );
}
