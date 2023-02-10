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
      hideInForm: true,
    },
    {
      title: '分类',
      dataIndex: 'type',
      customFieldProps(isAdd) {
        if (!isAdd) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '标签',
      dataIndex: 'label',
      hideInSearch: true,
    },
    {
      title: '值',
      dataIndex: 'value',
      hideInSearch: true,
      customFieldProps(isAdd) {
        if (!isAdd) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
    {
      title: '值类型',
      dataIndex: 'valueType',
      valueEnum: {
        string: '字符串',
        integer: '整数',
      },
      hideInSearch: true,
      customFieldProps(isAdd) {
        if (!isAdd) {
          return {
            disabled: true,
          };
        }
        return {};
      },
    },
  ];
  return (
    <div>
      <FormTable
        actions={['edit']}
        columns={columns}
        request={async (params) => api.dict.getDicts(params).then(transformPaginatedData)}
      ></FormTable>
    </div>
  );
}
