import axios from 'axios';
import { getToken, getUserData } from './auth'
import { message } from 'antd';
import store from '@/store/index' // 获取 redux
import { removeToken, removeUserData, removeVenueData, removeVenueId } from '@/utils/auth'
import { Modal } from 'antd';
const logout = () => {
  removeToken()
  removeUserData()
  removeVenueData()
  removeVenueId()
}
const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 30000, // request timeout
  headers: {
    'source': 'pc'
  }
})

service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['access-token'] = getToken()
      config.headers['userId'] = getUserData().id
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 1) {
      if (res.code !== 4 && res.code !== 6) {
        message.error(res.message);
      }
      if (res.code === 6 && store.getState().preCode !== res.code) {
        message.warning(res.message);
      }
      // 0:失败码1:成功码2:来源错误码3:权限错误码4:token错误码5:ip黑名单 6:缺少参数警示 404:Not Find
      if (res.code === 4 && store.getState().preCode !== res.code) {
        Modal.warning({
          title: '确定退出',
          content: '您的登录已过期，请退出重新登录！',
          okText: '重新登录',
          onOk: () => {
            logout();
            window.location.reload();
          }
        });
      }
      store.dispatch({type: 'CHANGE_PRECODE', preCode: res.code})
      return Promise.reject(res || 'error')
    } else {
      return res
    }
  },
  error => {
    message.error(error.message);
    return Promise.reject(error)
  }
)
export default service