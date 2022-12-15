import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

export default function SchedJob() {
  const columns: FormTableColumnsType<API.SchedJob> = [
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
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '表达式',
      dataIndex: 'spec',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '否',
          },
        ],
        [
          1,
          {
            text: '是',
          },
        ],
      ]),
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      render(_, entity, index, actions) {
        return [
          <a
            onClick={() => {
              api.schedJob.putSchedjobOpen({ id: entity.id }).then(() => {
                actions?.reload();
              });
            }}
          >
            开启
          </a>,
          <a
            onClick={() => {
              api.schedJob.putSchedjobClose({ id: entity.id }).then(() => {
                actions?.reload();
              });
            }}
          >
            关闭
          </a>,
        ];
      },
    },
  ];
  return (
    <div>
      <FormTable
        actions={[]}
        columns={columns}
        request={async (params) => {
          return api.schedJob.getSchedjobs().then(transformPaginatedData);
        }}
      ></FormTable>
    </div>
  );
}
