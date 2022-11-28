// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新告警接入 PUT /alert/access */
export async function putAlertAccess(
  body: API.UpdateAlertAccessVO,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: boolean }>('/alert/access', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建告警接入 POST /alert/access */
export async function postAlertAccess(body: API.AlertAccess, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/alert/access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除告警接入 DELETE /alert/access/${param0} */
export async function deleteAlertAccessId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAlertAccessIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>(`/alert/access/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询告警接入 GET /alert/accesses */
export async function getAlertAccesses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlertAccessesParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { data?: API.AlertAccess } }>(
    '/alert/accesses',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 查询告警配置 GET /alert/config */
export async function getAlertConfig(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.AlertConfig }>('/alert/config', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新告警配置 PUT /alert/config */
export async function putAlertConfig(body: API.AlertConfig, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/alert/config', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询告警数量 GET /alert/count */
export async function getAlertCount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlertCountParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: boolean }>('/alert/count', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 查询告警推送设置 GET /alert/push */
export async function getAlertPush(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PaginatedData & { data?: API.AlertPush } }>(
    '/alert/push',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** 更新告警推送 PUT /alert/push */
export async function putAlertPush(body: API.AlertPush, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/alert/push', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 创建告警推送设置 POST /alert/push */
export async function postAlertPush(body: API.AlertPush, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/alert/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除告警推送 DELETE /alert/push */
export async function deleteAlertPush(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteAlertPushParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>('/alert/push', {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 处置告警 POST /alert/resolve */
export async function postAlertResolve(body: API.ResolveAlertVO, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/alert/resolve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询告警类型 GET /alert/types */
export async function getAlertTypes(options?: { [key: string]: any }) {
  return request<API.Response & { data?: any[] }>('/alert/types', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询告警列表 GET /alerts */
export async function getAlerts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAlertsParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { list?: API.Alert[] } }>('/alerts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
