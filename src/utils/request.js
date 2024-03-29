import Vue from 'vue'
import axios from 'axios' 
import { VueAxios } from './axios' 

//自动设置后台服务 baseURL (也可以手工指定写死项目名字)
/* let baseDomain = window._CONFIG['domianURL'];
let baseProject = baseDomain.substring(baseDomain.lastIndexOf("/"));
console.log("baseDomain= ",baseDomain)
console.log("baseProject= ",baseProject) */
// let baseProject = "/api1";
let baseProject = "/";
// 创建 axios 实例
const service = axios.create({ 
  baseURL: baseProject, // api base_url
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