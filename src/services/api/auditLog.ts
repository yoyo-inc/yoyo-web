// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询操作日志列表 GET /audit_log */
export async function getAuditLog(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLogParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { list?: API.AuditLog[] } }>(
    '/audit_log',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
