export function transformPaginatedData(result: API.Response) {
  return {
    success: result.success,
    total: result.data.total,
    data: result.data.list,
  };
}

export function expand(record: Record<string, any>) {
  return Object.keys(record).map((key) => ({
    name: key,
    value: record[key],
  }));
}
