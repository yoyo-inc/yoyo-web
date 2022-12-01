import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, request } from '@umijs/max';
import { useModel } from '@umijs/max';
import { flushSync } from 'react-dom';

import logo from '@/assets/logo.png';
import styles from './index.less';
import api from '@/services/api';

export default function Login() {
  const { initialState, setInitialState } = useModel('@@initialState');
  return (
    <div className={styles.login}>
      <LoginFormPage
        title={initialState?.systemSetting?.name}
        subTitle={initialState?.systemSetting?.description}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo={logo}
        onFinish={async (data: any) => {
          return request('/login', {
            method: 'POST',
            data,
          }).then(async (res) => {
            localStorage.setItem('token', res.data.token);
            const currentUser = await api.user.getUserCurrent({});
            flushSync(() => {
              setInitialState((initialState) => ({
                ...initialState,
                currentUser: currentUser.data,
              }));
            });
            history.push('/');
          });
        }}
      >
        <ProFormText
          name={'username'}
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'账户'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name={'password'}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div className={styles.footer}>
          <ProFormCheckbox noStyle name={'autoLogin'}>
            自动登录
          </ProFormCheckbox>
          <a className={styles.forgotPassword}>忘记密码</a>
        </div>
      </LoginFormPage>
    </div>
  );
}
