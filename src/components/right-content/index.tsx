import React from 'react';
import { useModel, history } from '@umijs/max';
import { Avatar, Button, Dropdown, Menu } from 'antd';

import styles from './index.less';

export default function RightContent() {
  const { initialState, setInitialState } = useModel('@@initialState');
  const onMenuClick = ({ key }) => {
    switch (key) {
      case 'personal':
        break;
      case 'system':
        break;
      case 'logout':
        localStorage.removeItem('token');
        setInitialState((state) => ({
          ...state,
          currentUser: {},
        }));
        history.push('/login');
        break;
    }
  };
  const menu = (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          key: 'personal',
          label: '个人设置',
        },
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
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <div style={{ cursor: 'pointer' }}>
          <Avatar className={styles.avatar} src={initialState.currentUser?.avatar}></Avatar>
          <span className={styles.username}>{initialState.currentUser?.username}</span>
        </div>
      </Dropdown>
    </div>
  );
}
