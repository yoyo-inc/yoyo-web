// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询字典表 GET /dicts */
export async function getDicts(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDictsParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { list?: API.Dict } }>('/dicts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
