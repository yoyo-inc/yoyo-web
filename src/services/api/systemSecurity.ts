// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询系统安全设置 GET /system_security */
export async function getSystemSecurity(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.SystemSecurity }>('/system_security', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新系统安全设置 PUT /system_security */
export async function putSystemSecurity(
  body: API.SystemSecurityVO,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: boolean }>('/system_security', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
