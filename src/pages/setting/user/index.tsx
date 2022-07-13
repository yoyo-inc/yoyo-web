import { ProColumns, ProTable } from '@ant-design/pro-components';

export default function User() {
  const columns: ProColumns<API.User>[] = [
    {
      dataIndex: 'username',
      title: '用户名',
      onFilter: true,
    },
  ];
  return (
    <div>
      <ProTable columns={columns}></ProTable>
    </div>
  );
}
