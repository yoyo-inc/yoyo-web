import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';

export default function RunLog() {
  const columns: FormTableColumnsType = [
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '文件名',
      dataIndex: 'filename',
    },
    {
      title: '文件大小(kb)',
      dataIndex: 'filesize',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      render(_: any, entity: any, action) {},
    },
  ];
  return (
    <div>
      <FormTable columns={columns} customToolBarRender={() => []} />
    </div>
  );
}
