import React from 'react';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { QuestionCircleFilled } from '@ant-design/icons';

import logo from '@/assets/logo.png';
import RightContent from '@/components/right-content';
import api from '@/services/api';
import { message } from 'antd';
import { ProPageHeader } from '@ant-design/pro-components';

const loginPath = '/login';

export const request: RequestConfig = {
  baseURL: '/api',
  timeout: 60 * 1000,
  requestInterceptors: [
    (req: any) => {
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
  errorConfig: {
    errorThrower(data: API.Response) {
      const error = new Error(data.message);
      // @ts-ignore
      error.info = data;
      throw error;
    },
    errorHandler(error) {
      // @ts-ignore
      if (error.info.code !== '401') {
        message.error(error.message);
      }
    },
  },
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
    title: 'YoYo-Web',
    layout: 'mix',
    menu: {
      locale: false,
      // type: 'group',
    },
    token: {
      header: {
        colorBgHeader: '#292f33',
        colorHeaderTitle: '#fff',
        colorTextMenu: '#dfdfdf',
        colorTextMenuSecondary: '#dfdfdf',
        colorTextMenuSelected: '#fff',
        colorBgMenuItemSelected: '#22272b',
        colorTextMenuActive: 'rgba(255,255,255,0.85)',
        colorTextRightActionsItem: '#dfdfdf',
      },
      colorTextAppListIconHover: '#fff',
      colorTextAppListIcon: '#dfdfdf',
      sider: {
        colorMenuBackground: '#fff',
        colorMenuItemDivider: '#dfdfdf',
        colorBgMenuItemHover: '#f6f6f6',
        colorTextMenu: '#595959',
        colorTextMenuSelected: '#242424',
        colorTextMenuActive: '#242424',
        colorBgMenuItemCollapsedHover: '#242424',
      },
    },
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: true,
    colorWeak: false,
    rightContentRender: () => <RightContent />,
    actionsRender: () => {
      return [<QuestionCircleFilled key="question" />];
    },
    onPageChange: () => {
      if (history.location.pathname !== loginPath && !initialState?.currentUser) {
        history.push(loginPath);
      }
    },
    childrenRender: (dom: any) => {
      return (
        <>
          <ProPageHeader title={false} />
          {dom}
        </>
      );
    },
    ErrorBoundary: false,
  };
};
