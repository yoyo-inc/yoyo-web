import React, { useEffect, useRef, useState } from 'react';
import { Popconfirm } from 'antd';
import { useSearchParams } from '@umijs/max';
import FormTable, { FormTableColumnsType } from '@/components/form-table';
import api from '@/services/api';
import { transformPaginatedData } from '@/utils';
import { BetaSchemaForm } from '@ant-design/pro-components';

export default function AlertList() {
  const [searchParams] = useSearchParams();
  const [open, setOpen] = useState<boolean>();
  const [record, setRecord] = useState<API.Alert | undefined>();
  const tableRef = useRef();

  useEffect(() => {
    if (!open) {
      setRecord(undefined);
    }
  }, [open]);

  const columns: FormTableColumnsType = [
    {
      title: '告警时间',
      dataIndex: 'startAt',
      valueType: 'dateTimeRange',
      width: 220,
      search: {
        transform(value) {
          return { startTime: value[0], endTime: value[1] };
        },
      },
      render(_: any, entity) {
        return entity.startAt;
      },
    },
    {
      title: '来源',
      dataIndex: 'from',
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'select',
      request() {
        return api.alert.getAlertTypes({ type: 1 }).then((res) => res.data);
      },
    },
    {
      title: '级别',
      dataIndex: 'level',
      valueType: 'select',
      valueEnum: {
        warning: {
          text: '警告',
          status: 'warning',
        },
        critical: {
          text: '严重',
          status: 'error',
        },
      },
    },
    {
      title: '告警内容',
      dataIndex: 'content',
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
            text: '未读',
            status: 'default',
          },
        ],
        [
          1,
          {
            text: '已读',
            status: 'success',
          },
        ],
      ]),
      initialValue: searchParams.get('status')
        ? //@ts-ignore
          Number.parseInt(searchParams.get('status'))
        : undefined,
    },
    {
      title: '处置状态',
      dataIndex: 'resolvedStatus',
      valueType: 'select',
      valueEnum: new Map([
        [
          0,
          {
            text: '未处置',
            status: 'default',
          },
        ],
        [
          1,
          {
            text: '已处置',
            status: 'success',
          },
        ],
        [
          2,
          {
            text: '自动处置',
            color: 'blue',
          },
        ],
        [
          3,
          {
            text: '已忽略',
            status: 'default',
          },
        ],
      ]),
    },
    {
      title: '处置结果',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'operator',
      valueType: 'option',
      width: 140,
      render(_, entity: API.Alert, index, actions) {
        return [
          entity.resolvedStatus === 0 && (
            <a
              key="resolved"
              onClick={() => {
                setRecord(entity);
                setOpen(true);
              }}
            >
              处置
            </a>
          ),
          entity.resolvedStatus === 0 && (
            <Popconfirm
              key="ignore"
              title="确认忽略该告警？"
              onConfirm={() => {
                api.alert.putAlertIgnore({ id: entity.id as number }).then(() => {
                  actions?.reload();
                });
              }}
            >
              <a>忽略</a>
            </Popconfirm>
          ),
        ];
      },
    },
  ];
  return (
    <div>
      <FormTable
        columns={columns}
        request={async (params) => {
          return api.alert.getAlerts({ ...params }).then(transformPaginatedData);
        }}
        customToolBarRender={() => []}
        ref={tableRef}
      ></FormTable>
      <BetaSchemaForm<API.Alert>
        layout={'horizontal'}
        layoutType={'ModalForm'}
        open={open}
        modalProps={{
          onCancel: () => {
            setOpen(false);
          },
        }}
        title={'处置告警'}
        columns={[
          {
            title: '备注',
            dataIndex: 'remark',
            valueType: 'textarea',
          },
        ]}
        onFinish={async (values) => {
          return api.alert
            .putAlertResolve({
              //@ts-ignore
              id: record?.id,
              remark: values.remark,
            })
            .then((res) => {
              // @ts-ignore
              tableRef.current?.reload();
              setOpen(false);
              return res.data;
            });
        }}
      ></BetaSchemaForm>
    </div>
  );
}
