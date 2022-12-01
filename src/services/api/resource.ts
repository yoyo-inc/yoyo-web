// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 上传资源 POST /resource */
export async function postResource(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.Response & { data?: boolean }>('/resource', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 删除资源文件 DELETE /resource/${param0} */
export async function deleteResourceId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteResourceIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.Response & { data?: boolean }>(`/resource/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 查询资源文件列表 GET /resources */
export async function getResources(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getResourcesParams,
  options?: { [key: string]: any },
) {
  return request<API.Response & { data?: any[] }>('/resources', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
