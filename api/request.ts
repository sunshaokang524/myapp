import axios, { AxiosInstance, AxiosResponse } from "axios";
import router from '../src/router/index';
import Toast from '../src/components/my-toast/index'
console.log()

const request: AxiosInstance = axios.create({
  baseURL: "http://192.168.0.3:5000",
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
    console.log(response, "[[[[");
    // 对响应数据做点什么
    return response;
  },
  (error: any) => {
    console.log(error.response.status)
    switch (error.response.status) {
      case 401:
        Toast({content:'登录状态过期，请重新登录！',time:3000,hide:()=>{
          localStorage.removeItem('Token')
          router.replace("/login");
          // @ts-ignore
        }}).show()
      
        break;
      case 500:
       
        break;
      default:
        console.log("default");
    }

    // 处理响应错误
    return Promise.reject(error);
  }
);

export default request;
