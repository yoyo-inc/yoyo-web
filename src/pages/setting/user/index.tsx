import React, { useState } from 'react';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import { request } from '@umijs/max';

export default function User() {
  const columns: FormTableColumnsType<API.User> = [
    {
      title: '创建时间',
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
      dataIndex: 'username',
      title: '用户名',
      customFieldProps(isAdd) {
        if (!isAdd) {
          return {
            disabled: true,
          };
        }
        return {};
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      dataIndex: 'nickname',
      title: '昵称',
      hideInSearch: true,
    },
    {
      dataIndex: 'password',
      title: '密码',
      valueType: 'password',
      hideInTable: true,
      hideInSearch: true,
      customProps(isAdd) {
        if (isAdd) {
          return {
            formItemProps: {
              rules: [
                {
                  required: true,
                },
              ],
            },
          };
        } else {
          return {};
        }
      },
    },
    {
      dataIndex: 'roles',
      title: '角色',
      renderText(text) {
        return text.map((item: API.Role) => item.id);
      },
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      async request() {
        const roles = await api.role.getRoles({});
        return (roles.data.list as API.Role[]).map((role) => ({
          label: role.name,
          value: role.id,
        }));
      },
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      dataIndex: 'email',
      title: '邮箱',
      hideInSearch: true,
    },
    {
      dataIndex: 'phone',
      title: '手机号',
      hideInSearch: true,
    },
  ];
  return (
    <div>
      <FormTable<API.User>
        columns={columns}
        rowKey={'id'}
        moduleName="用户"
        transformDetail={(detail) => {
          const newDetail = { ...detail };
          // @ts-ignore
          newDetail.roles = newDetail.roles.map((role) => role.id);
          return newDetail;
        }}
        request={async (params) => {
          return api.user
            .getUsers({
              ...params,
            })
            .then(transformPaginatedData);
        }}
        onFinish={async (isAdd, values) => {
          if (isAdd) {
            request('/user', {
              method: 'post',
              data: values,
            }).then(() => {
              return true;
            });
          } else {
            request('/user', {
              method: 'put',
              data: values,
            }).then(() => {
              return true;
            });
          }
        }}
      />
    </div>
  );
}
