
import request from '@/utils/request'

//在线评阅
export function personBaseInfoMaintainInit(data) {
  return request({
    url: '/person/personBaseInfoMaintainInit',
    method: 'POST',
    data
  })
}
export function personBaseInfoMaintain(data) {
    return request({
      url: '/person/personBaseInfoMaintain',
      method: 'POST',
      data
    })
  }
