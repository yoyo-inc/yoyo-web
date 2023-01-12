import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData, getToken } from '@/utils';

export default function RunLog() {
  const columns: FormTableColumnsType = [
    {
      title: '文件名',
      dataIndex: 'filename',
    },
    {
      title: '文件大小(kb)',
      dataIndex: 'filesize',
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      render(_: any, entity: any, action) {
        return [
          <a
            onClick={() => {
              window.open(
                `/api/runlog/download?service=${entity.service}&filename=${
                  entity.filename
                }&token=${getToken()}`,
                '_blank',
              );
            }}
          >
            下载
          </a>,
        ];
      },
    },
  ];
  return (
    <div>
      <FormTable
        tableProps={{
          search: false,
        }}
        request={async (params) => {
          return api.runLog.getRunlogs(params).then(transformPaginatedData);
        }}
        columns={columns}
        customToolBarRender={() => []}
      />
    </div>
  );
}
