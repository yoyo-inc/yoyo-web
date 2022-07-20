import { useModel } from '@umijs/max';
import { Avatar, Dropdown, Menu } from 'antd';

import styles from './index.less';

export default function RightContent() {
  const { initialState } = useModel('@@initialState');
  const menu = (
    <Menu
      items={[
        // {
        //   key: "personal",
        //   label: "个人设置"
        // },
        // {
        //   key: "system",
        //   label: "系统设置"
        // },
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
        <>
          <Avatar
            className={styles.avatar}
            src={initialState.currentUser.avatar}
          ></Avatar>
          <span>{initialState.currentUser.username}</span>
        </>
      </Dropdown>
    </div>
  );
}
