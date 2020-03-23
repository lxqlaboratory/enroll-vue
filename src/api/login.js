import request from '@/utils/request'

export function webLogin(jsonForm) {
  return request({
    url: '/auth/webCasLogin',
    method: 'POST',
    data: jsonForm
  })
}

export function initMenu(data) {
  return request({
    url: '/auth/getWebMenuList',
    method: 'POST',
    data
  })
}

