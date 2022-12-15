import React from 'react';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';

export default function ReportList() {
  const columns: FormTableColumnsType<API.Report> = [
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
      title: '报告名称',
      dataIndex: 'name',
    },
    {
      title: '报告类型',
      dataIndex: 'type',
    },
    {
      title: '报告大小(kb)',
      dataIndex: 'size',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      hideInSearch: true,
      render() {
        return [<a>下载</a>];
      },
    },
  ];
  return (
    <div>
      <FormTable
        columns={columns}
        request={async (params) => {
          return api.report.getReports(params).then(transformPaginatedData);
        }}
      ></FormTable>
    </div>
  );
}
