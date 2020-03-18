import request from '@/utils/request'

export function webLogin(jsonForm) {
  return request({
    url: '/auth/webLogin',
    method: 'POST',
    data: jsonForm
  })
}

export function initMenu() {
  return request({
    url: '/auth/initMenu',
    method: 'POST',
    data: {}
  })
}

