// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 更新告警 PUT /alert */
export async function putAlert(body: API.UpdateAlertVO, options?: { [key: string]: any }) {
  return request<API.Response & { data?: boolean }>('/alert', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

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
