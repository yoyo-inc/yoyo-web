import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';

import logo from '@/assets/logo.png';
import RightContent from '@/components/right-content';
import api from '@/services/api';

const loginPath = '/login';

export const request: RequestConfig = {
  baseURL: '/api',
  timeout: 60 * 1000,
  requestInterceptors: [
    (req) => {
      const token = localStorage.getItem('token');
      if (token) {
        req.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
      }
      return req;
    },
  ],
  responseInterceptors: [
    [
      (response) => {
        if (200 <= response.status && response.status < 300) {
          return response;
        } else if (response.status === 401) {
          localStorage.removeItem('token');
          history.push('/login');
        }
        return response;
      },
    ],
  ],
};

export type IInitialState = {
  currentUser: API.User;
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  const initialState = {} as IInitialState;
  if (localStorage.getItem('token')) {
    try {
      const result = await api.user.getUserCurrent({});
      initialState.currentUser = result.data;
    } catch (e) {}
  }
  return initialState;
}

export const layout = ({ initialState }: { initialState: { currentUser?: API.User } }) => {
  return {
    logo,
    title: 'yoyo-web',
    layout: 'mix',
    menu: {
      locale: false,
    },
    navTheme: 'dark',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    rightContentRender: () => <RightContent />,
    onPageChange: () => {
      if (history.location.pathname !== loginPath && !initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    breadcrumbRender: (routes: any) => [
      {
        path: '/',
        breadcrumbName: '主页',
      },
      ...(routes || []),
    ],
  };
};
