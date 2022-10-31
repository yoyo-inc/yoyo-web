// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新角色 PUT /role */
export async function putRole(body: API.RoleVO, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建角色 POST /role */
export async function postRole(body: API.RoleVO, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/role', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 DELETE /role/${param0} */
export async function deleteRoleRoleID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteRoleRoleIDParams,
  options?: { [key: string]: any },
) {
  const { roleID: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>(`/role/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询角色列表 GET /roles */
export async function getRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRolesParams,
  options?: { [key: string]: any },
) {
  return request<API.Response>('/roles', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
