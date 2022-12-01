import React from 'react';
import { message } from 'antd';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { QuestionCircleFilled } from '@ant-design/icons';

import logo from '@/assets/logo.png';
import RightContent from '@/components/right-content';
import api from '@/services/api';
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
        if (response.status === 401) {
          history.push('/login');
        }
        return response;
      },
    ],
  ],
  errorConfig: {
    errorThrower(data: API.Response) {
      if (!data.success) {
        const error = new Error(data.message);
        // @ts-ignore
        error.info = data;
        throw error;
      }
    },
    errorHandler(error, opts) {
      if (opts.skipErrorHandler) {
        return;
      }
      // @ts-ignore
      if (error.info) {
        message.error(error.message);
      } else {
        message.error('服务异常');
      }
    },
  },
};

export type IInitialState = {
  currentUser?: API.User;
  systemSetting?: API.SystemSetting;
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<IInitialState> {
  const initialState = {} as IInitialState;
  try {
    initialState.systemSetting = (await api.system.getSystemSettings({})).data;
    initialState.currentUser = (await api.user.getUserCurrent({})).data;
  } catch (e) {}
  return initialState;
}

export const layout = ({ initialState }: { initialState: IInitialState }) => {
  return {
    logo,
    title: initialState?.systemSetting?.name,
    layout: 'mix',
    menu: {
      locale: false,
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
          <ProPageHeader title={false} prefixedClassName="" />
          {dom}
        </>
      );
    },
    ErrorBoundary: false,
  };
};
