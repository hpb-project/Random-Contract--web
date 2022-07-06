import { axios } from '@/utils/request'
 
const api = { 
  consumedOneday: '/srng/api/consumedOneday', //获取24小时消费的随机数数量
  consumedHistory: '/srng/api/consumedHistory',//获取历史14天消费的随机数数量 
  tokeninfo: '/srng/api/tokeninfo'//Token信息的接口 
}
 

export function getTokeninfo() {
  return new Promise((resolve, reject) => { axios.post(api.tokeninfo,{}).then(function (result) {
    if (result) {
        resolve(result)
    } else {
        reject(undefined)
    }
  });
});
}
export function getConsumedOneday() {
  return new Promise((resolve, reject) => { axios.post(api.consumedOneday,{}).then(function (result) {
    if (result) {
        resolve(result)
    } else {
        reject(undefined)
    }
  });
});
}


export function getConsumedHistory(parameter){
  return new Promise((resolve, reject) => { axios.post(api.consumedHistory,{}).then(function (result) {
      if (result) {
          resolve(result)
      } else {
          reject(undefined)
      }
    });
  });
}



//post
export function postAction(url,parameter) {
  return axios({
    url: url,
    method:'post' ,
    data: parameter
  })
}

//post method= {post | put}
export function httpAction(url,parameter,method) {
  return axios({
    url: url,
    method:method ,
    data: parameter
  })
}

//put
export function putAction(url,parameter) {
  return axios({
    url: url,
    method:'put',
    data: parameter
  })
}

//get
export function getAction(url,parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

//deleteAction
export function deleteAction(url,parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}
 
export function getServiceList(parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions(parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

// id == 0 add     post
// id != 0 update  put
export function saveService(parameter) {
  return axios({
    url: api.service,
    method: parameter.id == 0 ? 'post' : 'put',
    data: parameter
  })
}
