import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';
import React from 'react';

export default function Dict() {
  const columns: FormTableColumnsType<API.Dict> = [
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
      title: '分类',
      dataIndex: 'type',
    },
  ];
  return (
    <div>
      <FormTable
        actions={[]}
        columns={columns}
        request={async (params) => api.dict.getDicts(parmas).then(transformPaginatedData)}
      ></FormTable>
    </div>
  );
}
