import React from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { CommonFormTableProps, FormTableColumnType } from '.';
import styles from './desc.less';

export interface DescProps<T> extends CommonFormTableProps<T> {
  open: boolean;
  setOpen: (open: boolean) => void;
  desc: T;
}

export default function Desc<T>(props: DescProps<T>) {
  const { columns, open, setOpen, desc = {}, moduleName } = props;

  return (
    <Modal
      width={800}
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      title={moduleName + '详情'}
    >
      <ProDescriptions
        className={styles.desc}
        layout="horizontal"
        column={1}
        columns={columns}
        request={() => ({
          success: true,
          data: desc,
        })}
      ></ProDescriptions>
    </Modal>
  );
}
