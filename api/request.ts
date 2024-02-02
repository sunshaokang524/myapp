import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
const request: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.2:3000",
  timeout: 5000,
});
// 添加请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);
// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  },
  (error: any) => {
    // 处理响应错误
    return Promise.reject(error);
  }
);
export default request;
