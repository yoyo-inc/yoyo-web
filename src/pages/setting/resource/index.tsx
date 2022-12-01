import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

export default function Resource() {
  const columns: FormTableColumnsType<API.Resource> = [
    {
      title: '上传时间',
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
      title: '文件名',
      dataIndex: 'filename',
    },
    {
      title: '文件类型',
      dataIndex: 'filetype',
      hideInSearch: true,
    },
    {
      title: '文件大小(kb)',
      dataIndex: 'filesize',
      hideInSearch: true,
    },
  ];
  return (
    <div>
      <FormTable
        columns={columns}
        actions={['delete']}
        request={async (params) => {
          return api.resource.getResources({ ...params }).then(transformPaginatedData);
        }}
        onDelete={async (rowKey) => {
          return api.resource.deleteResourceId({ id: rowKey }).then((res) => res.data);
        }}
      ></FormTable>
    </div>
  );
}
