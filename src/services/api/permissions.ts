// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询列表 GET /permissions */
export async function getPermissions(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PermissionVO }>('/permissions', {
    method: 'GET',
    ...(options || {}),
  });
}
