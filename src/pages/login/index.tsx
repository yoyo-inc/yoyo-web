import React, { useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { history, request } from '@umijs/max';
import { useModel } from '@umijs/max';
import { flushSync } from 'react-dom';

import Logo from '@/components/logo';
import styles from './index.less';
import api from '@/services/api';
import backgroundImage from '@/assets/background.png';
import { getToken } from '@/utils';

export default function Login() {
  const { initialState, setInitialState } = useModel('@@initialState');
  useEffect(() => {
    if (getToken()) {
      history.push('/');
    }
  }, []);
  return (
    <div className={styles.login}>
      <LoginFormPage
        title={initialState?.systemSetting?.name}
        subTitle={initialState?.systemSetting?.description}
        backgroundImageUrl={backgroundImage}
        logo={<Logo />}
        onFinish={async (data: any) => {
          const { autoLogin, ...restData } = data;
          return request('/login', {
            method: 'POST',
            data: restData,
          }).then(async (res) => {
            if (autoLogin) {
              localStorage.setItem('token', res.data.token);
            } else {
              sessionStorage.setItem('token', res.data.token);
            }
            const [currentUser, currentPermissions] = await Promise.all([
              api.user.getUserCurrent({}),
              api.user.getUserCurrentPermissions(),
            ]);
            flushSync(() => {
              setInitialState((initialState) => ({
                ...initialState,
                currentUser: currentUser.data,
                currentPermissions: currentPermissions.data,
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
          {/* <a className={styles.forgotPassword}>忘记密码</a> */}
        </div>
      </LoginFormPage>
    </div>
  );
}
