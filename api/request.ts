import axios, { AxiosInstance, AxiosResponse } from "axios";
const request: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.2:3000",
  timeout: 5000,
});
// 添加请求拦截器
request.interceptors.request.use(
  (config: any) => {
    let token = localStorage.getItem("Token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

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
