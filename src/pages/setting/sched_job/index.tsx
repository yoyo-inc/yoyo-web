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
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '关闭',
          },
        ],
        [
          1,
          {
            text: '启用',
          },
        ],
      ]),
    },
    {
      title: '上次运行时间',
      dataIndex: 'lastRunTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      width: 160,
      render(_, entity, index, actions) {
        return [
          <a
            onClick={() => {
              api.schedJob
                //@ts-ignore
                .putSchedjobOpen({ id: entity.id })
                .then(() => {
                  actions?.reload();
                })
                .catch(() => {});
            }}
          >
            开启
          </a>,
          <a
            onClick={() => {
              api.schedJob
                //@ts-ignore
                .putSchedjobClose({ id: entity.id })
                .then(() => {
                  actions?.reload();
                })
                .catch(() => {});
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
