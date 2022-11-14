import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActionType,
  ProColumnType,
  ProFormColumnsType,
  ProTable,
  StepFormProps,
  //@ts-ignore
  FormSchema,
  ProTableProps,
} from '@ant-design/pro-components';
import { useBoolean } from 'ahooks';
import { Button, Popconfirm } from 'antd';
import { flatten } from 'lodash';
import Detail from './detail';
import Desc from './desc';

export type FormTableColumnType<T = any> = ProColumnType<T> &
  ProFormColumnsType<T> & {
    customFieldProps?: (isAdd: boolean) => any;
    customProps?: (isAdd: boolean) => FormTableColumnType;
  };

export type FormTableColumnsType<T = any> = FormTableColumnType<T>[] | FormTableColumnType<T>[][];

export type SupportedLayoutTypes = 'ModalForm' | 'DrawerForm' | 'StepsForm';

export interface CommonFormTableProps<T> {
  columns: FormTableColumnsType;
  onFinish?: (isAdd: boolean, values: T) => Promise<boolean | void>;
  moduleName?: string;
  layoutType?: SupportedLayoutTypes;
  steps?: StepFormProps[];
  formClassName?: string;
  formProps?: FormSchema;
  transformDetail?: (values: T) => any;
  grid?: boolean;
}

interface FormTableProps<T> extends CommonFormTableProps<T> {
  rowKey?: string;
  request: (params: any) => Promise<any>;
  onDelete?: (rowKey: string, entity: T) => Promise<void>;
  tableProps?: ProTableProps<T, any>;
  customToolBarRender?: (
    dom: ReactNode,
    action: ActionType | undefined,
    rows: {
      selectedRowKeys?: (string | number)[];
      selectedRows?: T[];
    },
  ) => ReactNode[];
}

export default function FormTable<T extends Record<string, any>>(props: FormTableProps<T>) {
  const {
    columns = [],
    rowKey = 'id',
    moduleName = '',
    layoutType = 'ModalForm',
    steps,
    request,
    formClassName,
    tableProps,
    formProps,
    customToolBarRender,
    transformDetail,
    grid,
  } = props;
  const [visible, { set: setVisible }] = useBoolean(false);
  const [detail, setDetail] = useState<T>();
  const [openDesc, { set: setOpenDesc }] = useBoolean(false);
  const [desc, setDesc] = useState<T>();
  const [isAdd, { set: setIsAdd }] = useBoolean(true);
  const tableRef = useRef<ActionType>();

  const handleEdit = (entity: T) => {
    setIsAdd(false);
    setDetail(entity);
    setVisible(true);
  };

  const handleDelete = (entity: T) => {
    if (props.onDelete) {
      props.onDelete(entity[rowKey], entity).then(() => {
        tableRef.current?.reload();
      });
    }
  };

  const handleDesc = (entity: T) => {
    setDesc(entity);
    setOpenDesc(true);
  };

  const columnsWithOperator = useMemo(() => {
    if (columns.length === 0) {
      return [];
    }
    let newColumns = [] as any;
    if (layoutType == 'StepsForm') {
      newColumns = [...flatten(columns)];
    } else {
      newColumns = [...columns];
    }
    if (
      !columns.some(
        (column: any) => column.dataIndex === 'operator' && column.valueType === 'option',
      )
    ) {
      newColumns.push({
        title: '操作',
        valueType: 'option',
        width: 160,
        render(_: any, entity: T) {
          return [
            <a
              key="desc"
              onClick={() => {
                handleDesc(entity);
              }}
            >
              查看
            </a>,
            <a key="edit" onClick={() => handleEdit(entity)}>
              编辑
            </a>,
            <Popconfirm
              key="delete"
              title="确定删除?"
              onConfirm={() => {
                handleDelete(entity);
              }}
            >
              <a>删除</a>
            </Popconfirm>,
          ];
        },
      });
    }
    return newColumns;
  }, columns);

  const handleFinish = async (isAdd: boolean, values: any): Promise<boolean | void> => {
    if (props.onFinish) {
      return props.onFinish(isAdd, values).then(() => {
        tableRef.current?.reload();
        setVisible(false);
      });
    }
    return Promise.resolve();
  };

  const defaultToolBarDom = (
    <Button
      type="primary"
      onClick={() => {
        setVisible(true);
        setIsAdd(true);
      }}
    >
      新增
    </Button>
  );

  useEffect(() => {
    if (!visible) {
      setDetail(undefined);
    }
  }, [visible]);

  return (
    <div>
      <ProTable
        rowKey={rowKey}
        columns={columnsWithOperator}
        actionRef={tableRef}
        search={{
          defaultCollapsed: false,
        }}
        toolBarRender={(action, rows) => {
          return customToolBarRender
            ? customToolBarRender(defaultToolBarDom, action, rows)
            : [defaultToolBarDom];
        }}
        request={request}
        {...tableProps}
      ></ProTable>
      <Detail
        columns={columns}
        detail={detail}
        visible={visible}
        onVisibleChange={setVisible}
        onFinish={handleFinish}
        moduleName={moduleName}
        layoutType={layoutType}
        steps={steps}
        isAdd={isAdd}
        formClassName={formClassName}
        formProps={formProps}
        transformDetail={transformDetail}
        grid={grid}
      ></Detail>
      <Desc
        columns={columns}
        open={openDesc}
        setOpen={setOpenDesc}
        desc={desc}
        moduleName={moduleName}
      ></Desc>
    </div>
  );
}
