export function transformPaginatedData(result: API.Response) {
  return {
    success: result.success,
    total: result.data.total,
    data: result.data.list,
  };
}
