import request from '../utils/request'
export function login(data) {
  return request({
    url: '/site/login',
    method: 'post',
    data,
  })
}

// 获取登录人场馆权限
export function getEmployeeVenue(data) {
  return request({
    // url: '/merchant-employee/get-employee-data',
    url: '/merchant-employee/get-employee-venue',
    method: 'get',
    params: data
  })
}