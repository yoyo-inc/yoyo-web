// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新用户 PUT /user */
export async function putUser(body: API.UserVO, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建用户 POST /user */
export async function postUser(body: API.UserVO, options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.User }>('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除用户 DELETE /user/${param0} */
export async function deleteUserUserID(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserUserIDParams,
  options?: { [key: string]: any },
) {
  const { userID: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>(`/user/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询当前用户信息 GET /user/current */
export async function getUserCurrent(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.User }>('/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询当前用户权限信息 GET /user/current/permissions */
export async function getUserCurrentPermissions(options?: { [key: string]: any }) {
  return request<API.Response & { data?: any[] }>('/user/current/permissions', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询用户列表 GET /users */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { list?: API.User[] } }>('/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
