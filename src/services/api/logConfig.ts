// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询日志配置 GET /log_config */
export async function getLogConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.LogConfig }>('/log_config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 保存日志配置 POST /log_config */
export async function postLogConfig(body: API.LogConfig, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/log_config', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
