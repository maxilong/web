import request from '../utils/request'
// 线索来源
export function getConfigDetail(data) {
  return request({
    url: '/config/detail',
    method: 'get',
    params: data
  })
}

// 获取用户列表
export function getDepartmentIndex(data) {
  return request({
    url: '/department-seas/index',
    method: 'get',
    params: data
  })
}

// 删除部门客户
export function departmentSeasDel(data) {
  return request({
    url: '/department-seas/del',
    method: 'get',
    params: data
  })
}

// 获取员工列表
export function getEmployeeList(data) {
  return request({
    url: '/merchant-employee/employee-list',
    method: 'get',
    params: data
  })
}

// 部门分配员工
export function departmentAllocation(data) {
  return request({
    url: '/department-seas/allocation',
    method: 'post',
    data
  })
}