// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 删除报告 DELETE /report/${param0} */
export async function deleteReportId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteReportIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>(`/report/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 生成报告 POST /report/generate/${param0} */
export async function postReportGenerateReportType(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postReportGenerateReportTypeParams,
  body: API.GenerateReportVO,
  options?: { [key: string]: any },
) {
  const { reportType: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>(`/report/generate/${param0}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询报告类型 GET /report/types */
export async function getReportTypes(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.Dict[] }>('/report/types', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 查询报告列表 GET /reports */
export async function getReports(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getReportsParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: API.PaginatedData & { data?: API.Report[] } }>(
    '/reports',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
