// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 关闭定时任务 PUT /schedjob/close */
export async function putSchedjobClose(
  body: API.UpdateSchedJobVO,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: boolean }>('/schedjob/close', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 开启定时任务 PUT /schedjob/open */
export async function putSchedjobOpen(
  body: API.UpdateSchedJobVO,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: boolean }>('/schedjob/open', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询定时任务类型 GET /schedjob/types */
export async function getSchedjobTypes(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.Dict[] }>('/schedjob/types', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询定时任务 GET /schedjobs */
export async function getSchedjobs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSchedjobsParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { list?: API.SchedJob[] } }>(
    '/schedjobs',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
