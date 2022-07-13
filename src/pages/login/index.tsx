import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';

import logo from '@/assets/logo.png';
import styles from './index.less';

export default function Login() {
  return (
    <div className={styles.login}>
      <LoginFormPage
        title={'API网关'}
        subTitle={'API网关'}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo={logo}
        onFinish={() => {}}
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
        ></ProFormText>
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
        ></ProFormText.Password>
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
