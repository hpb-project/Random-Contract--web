import Vue from 'vue'
import axios from 'axios' 
import { VueAxios } from './axios' 
 
// let baseDomain = "/api2" ;   
let baseDomain = "/" ;   
// 创建 axios 实例
const service = axios.create({ 
  baseURL: baseDomain, // api base_url
  timeout: 9000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    let data = error.response.data  
    console.log("------异常响应------",error.response.status,data)
  } 
  return Promise.reject(error)
};


// request interceptor  网络请求拦截器
service.interceptors.request.use(config => {
  config.headers['Content-Type']="application/json";
  config.data=JSON.stringify(config.data);  
  return config
},(error) => {
  return Promise.reject(error)
})

// response interceptor
service.interceptors.response.use((response) => {
    return response.data
  }, err)

const installer = {
  vm: {},
  install (Vue, router = {}) {
    Vue.use(VueAxios, router, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}