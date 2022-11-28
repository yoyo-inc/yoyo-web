// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新系统设置 PUT /system/setting */
export async function putSystemSetting(
  body: API.UpdateSystemSettingVO,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: boolean }>('/system/setting', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询系统设置 GET /system/settings */
export async function getSystemSettings(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.SystemSetting }>('/system/settings', {
    method: 'GET',
    ...(options || {}),
  });
}
