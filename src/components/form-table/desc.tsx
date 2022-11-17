import React from 'react';
import { ProDescriptions } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { CommonFormTableProps, FormTableColumnType } from '.';
import styles from './desc.less';

export interface DescProps<T> extends CommonFormTableProps<T> {
  open: boolean;
  setOpen: (open: boolean) => void;
  desc: T;
  onCancel: () => void;
}

export default function Desc<T>(props: DescProps<T>) {
  const { columns, open, setOpen, onCancel, desc = {}, moduleName } = props;

  return (
    <Modal
      width={800}
      open={open}
      onCancel={() => {
        setOpen(false);
        onCancel();
      }}
      title={moduleName + '详情'}
      destroyOnClose
    >
      <ProDescriptions
        className={styles.desc}
        layout="horizontal"
        column={1}
        columns={columns}
        request={() =>
          Promise.resolve({
            success: true,
            data: desc,
          })
        }
      ></ProDescriptions>
    </Modal>
  );
}
