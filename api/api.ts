import request from "./request";
export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}
export async function get<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await request.get<ApiResult<T>>(url, { params });
  return response.data;
}
export async function post<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await request.post<ApiResult<T>>(url, data);
  return response.data;
}
export async function put<T>(url: string, data?: any): Promise<ApiResult<T>> {
  const response = await request.put<ApiResult<T>>(url, data);
  return response.data;
}
export async function del<T>(url: string, params?: any): Promise<ApiResult<T>> {
  const response = await request.delete<ApiResult<T>>(url, { params });
  return response.data;
}
