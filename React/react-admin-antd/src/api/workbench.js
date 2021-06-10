import request from '../utils/request'
/* 获取到访 */
export function workbenchEntryData(data) {
  return request({
    url: '/workbench/entry-data',
    method: 'get',
    params: data
  })
}

/* 获取营收 */
export function workbenchSalesData(data) {
  return request({
    url: '/workbench/sales-data',
    method: 'get',
    params: data
  })
}

/* 上课 */
export function workbenchClassData(data) {
  return request({
    url: '/workbench/class-data',
    method: 'get',
    params: data
  })
}

/* 生日 */
export function workbenchMemberAlert(data) {
  return request({
    url: '/workbench/member-alert',
    method: 'get',
    params: data
  })
}

/* 审批列表 */
export function getApprovalIndex(query) {
  return request({
    url: '/approval/index',
    method: 'get',
    params: query
  })
}

/* 订单列表 */
export function orderList(data) {
  return request({
    url: '/order/list',
    method: 'post',
    data
  })
}