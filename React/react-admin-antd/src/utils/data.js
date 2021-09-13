export function statusOptions() {
  const arr = [
    { label: '无效客户', key: '0' },
    { label: '报备客户', key: '1' },
    { label: '到访客户', key: '2' },
    { label: '进馆体验', key: '3' },
    { label: '认购', key: '4' }
  ]
  return arr
}

export function statusObj() {
  const obj = { 0: '无效客户', 1: '报备客户', 2: '到访客户', 3: '进馆体验', 4: '认购', 5: '有效会员', 6: '失效会员' }
  return obj
}

export function intentionOptions() {
  const arr = [
    { label: '必买', key: 1 },
    { label: '高意向', key: 2 },
    { label: '一般意向', key: 3 },
    { label: '无意向', key: 4 }
  ]
  return arr
}

export function intentionObj() {
  const obj = { 1: '必买', 2: '高意向', 3: '一般意向', 4: '无意向' }
  return obj
}

export function learningOptions() {
  const arr = [
    { label: '幼儿园', key: 1 },
    { label: '小学', key: 2 },
    { label: '初中', key: 3 },
    { label: '高中', key: 4 },
    { label: '大学', key: 5 }
  ]
  return arr
}

// 公共的支付类型
export function initPayTypeArr() {
  const arr = [
    { id: 1, name: '现金' },
    { id: 2, name: '微信' },
    { id: 3, name: '支付宝' },
    { id: 4, name: 'POS刷卡' },
    { id: 5, name: '建设分期' },
    { id: 6, name: '广发分期' },
    { id: 7, name: '招行分期' },
    { id: 8, name: '借记卡' },
    { id: 9, name: '贷记卡' },
    { id: 10, name: '库分期' },
    { id: 11, name: '银联分期' },
    { id: 12, name: '通联收款码' },
    { id: 13, name: '线上支付' }
  ]
  return arr
}

// 公共的支付类型
export function initCouponTypeArr() {
  const arr = [
    { id: 1, name: '现金券' },
    { id: 2, name: '满减券' },
    { id: 3, name: '折扣券' },
    { id: 4, name: '礼品券' }
  ]
  return arr
}

// 使用平台
export function initPlatformArr() {
  const arr = [
    { id: 1, name: '全平台' },
    { id: 2, name: 'ERP' },
    { id: 3, name: '会员app' }
  ]
  return arr
}

// APP所有需要更新的端
export function versionArr() {
  const arr = [
    { id: 1, name: '尚褆达斯员工端' }
  ]
  return arr
}

// 使用平台
export function renewUnitArr() {
  const arr = [
    { id: '1', name: '天' },
    { id: '2', name: '月' },
    { id: '3', name: '年' }
  ]
  return arr
}

export function leaveArr() {
  const arr = [
    {
      value: '一星',
      id: '1'
    },
    {
      value: '二星',
      id: '2'
    },
    {
      value: '三星',
      id: '3'
    },
    {
      value: '四星',
      id: '4'
    },
    {
      value: '五星',
      id: '5'
    }
  ]
  return arr
}
