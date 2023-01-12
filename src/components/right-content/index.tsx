import React from 'react';
import { useModel, history, useRequest } from '@umijs/max';
import { Avatar, Badge, Dropdown, Menu, Space } from 'antd';
import { AlertOutlined } from '@ant-design/icons';

import styles from './index.less';
import api from '@/services/api';
import { request } from '@umijs/max';
import { clearToken } from '@/utils/token';

export default function RightContent() {
  const { data: count } = useRequest(api.alert.getAlertCount, {
    defaultParams: {
      //@ts-ignore
      status: 0,
    },
  });
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'personal':
        break;
      case 'system':
        history.push('/setting/system');
        break;
      case 'logout':
        request('/logout').then(() => {
          clearToken();
          setInitialState((state) => ({
            ...state,
            currentUser: {} as API.User,
          }));
          history.push('/login');
        });
        break;
    }
  };
  const menu = (
    <Menu
      onClick={onMenuClick}
      items={[
        // {
        //   key: 'personal',
        //   label: '个人设置',
        // },
        {
          key: 'system',
          label: '系统设置',
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          label: '退出登录',
        },
      ]}
    ></Menu>
  );
  return (
    <>
      <div className={styles.rightContent}>
        <Space size="middle">
          <Badge count={count}>
            <AlertOutlined
              onClick={() => {
                history.push('/setting/alert/list?status=0');
              }}
            />
          </Badge>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className={styles.user}>
              <Avatar className={styles.avatar} src={initialState?.currentUser?.avatar}></Avatar>
              <span className={styles.username}>{initialState?.currentUser?.username}</span>
            </div>
          </Dropdown>
        </Space>
      </div>
    </>
  );
}
