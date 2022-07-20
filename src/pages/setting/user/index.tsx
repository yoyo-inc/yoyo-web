import { ProColumns, ProTable } from '@ant-design/pro-components';

import api from '@/services/api';

export default function User() {
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'username',
      title: '用户名',
      onFilter: true,
    },
    {
      dataIndex: 'email',
      title: '邮箱',
    },
    {
      dataIndex: 'phone',
      title: '手机号',
    },
  ];
  return (
    <div>
      <ProTable
        columns={columns}
        request={async (params) => {
          return api.user.getUser({
            ...params,
          });
        }}
      ></ProTable>
    </div>
  );
}
