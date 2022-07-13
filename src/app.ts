// 运行时配置

import { RequestConfig } from '@umijs/max';

export const request: RequestConfig = {
  baseURL: '/api',
  timeout: 60 * 1000,
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<any> {
  return { name: 'yoyo-web' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: 'yoyo-web',
    menu: {
      locale: false,
    },
    navTheme: 'dark',
  };
};
