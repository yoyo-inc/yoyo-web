// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询角色列表 GET /role */
export async function getRole(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoleParams,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/role', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
