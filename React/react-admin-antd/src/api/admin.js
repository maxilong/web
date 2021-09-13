import request from '../utils/request'
/* 搜索卡信息 */
export function workbenchSearch(data) {
  return request({
    url: '/workbench/search',
    method: 'get',
    params: data
  })
}

// 获取 会员信息
export function getCustomerDetail(id) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params: { id }
  })
}

/* 卡状态 */
export function cardStatus(data) {
  return request({
    url: '/member-product/card-status-all',
    method: 'get',
    params: data
  })
}

/* 获取卡列表 */
export function getCardList(data) {
  return request({
    url: '/member-product/use-venue-card-list',
    method: 'post',
    data
  })
}