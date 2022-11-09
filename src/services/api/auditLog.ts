// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 查询操作日志列表 GET /audit_logs */
export async function getAuditLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAuditLogsParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { list?: API.AuditLog[] } }>(
    '/audit_logs',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
