import React, { useEffect, useRef } from 'react';
import { Drawer } from 'antd';
import { BetaSchemaForm, ProFormInstance } from '@ant-design/pro-components';
import { CommonFormTableProps, FormTableColumnsType, FormTableColumnType } from '.';

export const DEFAULT_FORM_LAYOUT = {
  labelCol: {
    sm: { span: 6 },
    xs: { span: 8 },
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 18 },
  },
};

interface FormTableDetailProps<T> extends CommonFormTableProps {
  detail?: T;
  isAdd?: boolean;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

export default function FormTableDetail<T extends Record<string, any>>(
  props: FormTableDetailProps<T>,
) {
  let {
    detail = {},
    isAdd = true,
    columns,
    onFinish,
    visible,
    onVisibleChange,
    moduleName,
    layoutType,
    steps,
    formClassName,
    formProps,
    transformDetail,
    grid = true,
  } = props;
  const formRef = useRef<
    ProFormInstance | React.MutableRefObject<ProFormInstance<any> | undefined>[]
  >();
  const title = (isAdd ? '新增' : '编辑') + moduleName;

  const hide = () => {
    onVisibleChange(false);
  };

  useEffect(() => {
    if (visible && !isAdd) {
      if (transformDetail) {
        detail = transformDetail(detail);
      }

      const newDetail = Object.keys(detail).map((item) => ({
        name: item,
        // @ts-ignore
        value: detail[item],
      }));
      if (layoutType === 'StepsForm') {
        (formRef.current as React.MutableRefObject<ProFormInstance<any> | undefined>[])?.forEach(
          (formInstanceRef) => {
            formInstanceRef.current?.setFields(newDetail);
          },
        );
      } else {
        (formRef.current as ProFormInstance)?.setFields(newDetail);
      }
    } else {
      if (layoutType === 'StepsForm') {
        (formRef.current as React.MutableRefObject<ProFormInstance<any> | undefined>[])?.forEach(
          (formInstanceRef) => {
            formInstanceRef.current?.resetFields();
          },
        );
      } else {
        (formRef.current as ProFormInstance)?.resetFields();
      }
    }
  }, [visible]);

  const convertCustomColumn = (column: FormTableColumnType): FormTableColumnType => {
    const { customFieldProps, ...extraColumn } = column;
    let fieldProps = {};
    if (customFieldProps) {
      fieldProps = customFieldProps(isAdd);
    }
    return {
      ...extraColumn,
      fieldProps,
    };
  };

  columns = columns.map((column) => {
    if (Array.isArray(column)) {
      return column.map(convertCustomColumn);
    } else {
      return convertCustomColumn(column);
    }
  }) as FormTableColumnsType;

  const SchemaFormDom = (extraProps: any = {}) => {
    let refProps = {} as any;
    if (layoutType === 'StepsForm') {
      refProps['formMapRef'] = formRef;
    } else {
      refProps['formRef'] = formRef;
    }

    return (
      <BetaSchemaForm
        {...refProps}
        layout="horizontal"
        layoutType={layoutType as any}
        columns={columns}
        steps={steps}
        grid={grid}
        onFinish={async (values: any) => {
          //@ts-ignore
          return onFinish(isAdd, values);
        }}
        omitNil={false}
        className={formClassName}
        modalProps={{ maskClosable: false }}
        // drawerProps={{ destroyOnClose: true }}
        {...formProps}
        {...DEFAULT_FORM_LAYOUT}
        {...extraProps}
      ></BetaSchemaForm>
    );
  };

  return (
    <div>
      {layoutType === 'StepsForm' ? (
        <Drawer open={visible} title={title} width={1200} onClose={hide} destroyOnClose>
          {SchemaFormDom()}
        </Drawer>
      ) : (
        SchemaFormDom({ title, visible, onVisibleChange })
      )}
    </div>
  );
}
