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
