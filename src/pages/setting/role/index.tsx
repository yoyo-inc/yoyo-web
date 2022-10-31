import React from 'react';
import type { FormTableColumnsType } from '@/components/form-table';
import FormTable from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

export default function Role() {
  const columns: FormTableColumnsType<API.Role>[][] = [
    [
      {
        title: '角色名',
        dataIndex: 'name',
      },
      {
        title: '描述',
        search: false,
        dataIndex: 'description',
        valueType: 'textarea',
      },
      {
        dataIndex: 'id',
        hideInTable: true,
        formItemProps: {
          style: { display: 'none' },
        },
      },
    ],
    [],
  ];
  const handleFinish = async (isAdd: boolean, values: API.RoleVO): Promise<boolean> => {
    if (isAdd) {
      return api.role.postRole(values).then(() => {
        return true;
      });
    } else {
      return api.role.putRole(values).then(() => {
        return true;
      });
    }
  };
  const handleDelete = (key: string) => {
    return api.role.deleteRoleRoleID({ roleID: key });
  };
  return (
    <div>
      <FormTable
        columns={columns}
        moduleName="角色"
        layoutType="StepsForm"
        steps={[{ title: '基础信息' }, { title: '权限设置' }]}
        request={async (values: any) => {
          return api.role.getRoles(values).then(transformPaginatedData);
        }}
        onFinish={handleFinish}
        onDelete={handleDelete}
      />
    </div>
  );
}
