import { history, RequestConfig } from '@umijs/max';
import { message } from 'antd';

import logo from '@/assets/logo.png';
import RightContent from '@/components/right-content';

export const request: RequestConfig = {
  baseURL: '/api',
  timeout: 60 * 1000,
  responseInterceptors: [
    [
      (response) => {
        if (response.status === 401) {
          history.push('/login');
        }
        return response;
      },
      (err: any) => {
        if (err.response.status === 401) {
          message.error(err.response.data.message);
          history.push('/login');
        }
        return err;
      },
    ],
  ],
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  return { name: 'yoyo-web' };
}

export const layout = ({
  initialState,
}: {
  initialState: { currentUser: API.User };
}) => {
  console.log(initialState);
  return {
    logo,
    title: 'yoyo-web',
    rightContentRender: () => <RightContent />,
  };
};
