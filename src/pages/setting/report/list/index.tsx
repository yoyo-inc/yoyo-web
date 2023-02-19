import React, { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { Button } from 'antd';
import { BetaSchemaForm, ActionType, FormInstance } from '@ant-design/pro-components';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData, getToken } from '@/utils';
import { DEFAULT_FORM_LAYOUT } from '@/components/form-table/detail';

export default function ReportList() {
  const [visible, setVisible] = useState(false);
  const tableRef = useRef<ActionType>();
  const columns: FormTableColumnsType<API.Report> = [
    {
      title: '生成时间',
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
      dataIndex: 'reportName',
    },
    {
      title: '报告类型',
      dataIndex: 'reportType',
      valueType: 'select',
      async request() {
        return api.report.getReportTypes().then((res) => res.data);
      },
    },
    {
      title: '报告大小(kb)',
      dataIndex: ['resource', 'filesize'],
      hideInSearch: true,
    },
    {
      title: '生成状态',
      dataIndex: 'reportStatus',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '生成中',
            status: 'processing',
          },
        ],
        [
          1,
          {
            text: '成功',
            status: 'success',
          },
        ],
        [
          2,
          {
            text: '失败',
            status: 'error',
          },
        ],
      ]),
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      hideInSearch: true,
      render(_, entity) {
        return [
          <a
            style={{ display: entity.reportStatus === 1 ? 'block' : 'none' }}
            onClick={() => {
              window.open(
                '/api/resource/download/' + entity?.resource?.id + '?token=' + getToken(),
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
        ref={tableRef}
        actions={[]}
        columns={columns}
        request={async (params) => {
          return api.report.getReports(params).then(transformPaginatedData);
        }}
        customToolBarRender={() => {
          return [
            <Button
              type={'primary'}
              onClick={() => {
                setVisible(true);
              }}
            >
              生成报告
            </Button>,
          ];
        }}
      ></FormTable>
      <GenerateReport
        visible={visible}
        onVisibleChange={setVisible}
        onReload={() => {
          tableRef.current?.reload();
        }}
      />
    </div>
  );
}

interface GenerateReportProps {
  visible: boolean;

  onVisibleChange(value: boolean): void;

  onReload(): void;
}

function GenerateReport(props: GenerateReportProps) {
  const { onReload, ...extraProps } = props;
  const formRef = useRef<FormInstance>();
  const columns = [
    {
      title: '时间',
      dataIndex: 'time',
      valueType: 'dateRange',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '报告类型',
      dataIndex: 'reportType',
      valueType: 'select',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      async request() {
        return api.report.getReportTypes().then((res) => res.data);
      },
    },
    {
      title: '报告名称',
      dataIndex: 'reportName',
    },
  ];
  useEffect(() => {
    if (!props.visible) {
      formRef.current?.resetFields();
    }
  }, [props.visible]);
  return (
    <BetaSchemaForm
      title="生成报告"
      columns={columns}
      layoutType={'ModalForm'}
      {...extraProps}
      {...DEFAULT_FORM_LAYOUT}
      layout="horizontal"
      formRef={formRef}
      onFinish={async (values: any) => {
        const startTime = dayjs(values.time[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endTime = dayjs(values.time[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss');
        await api.report.postReportGenerateReportType(
          {
            reportType: values.reportType,
          },
          {
            startTime,
            endTime,
            reportName: values.reportName,
          },
        );
        props.onReload();
        return true;
      }}
    ></BetaSchemaForm>
  );
}
