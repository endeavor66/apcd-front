import request from '@/utils/request'

export function upload(query) {
  return request({
    url: '/upload-event-log',
    method: 'post',
    data: query,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function getEventLog(query) {
  return request({
    url: '/get-event-log',
    method: 'post',
    params: query
  })
}

export function getUploadRecord() {
  return request({
    url: '/get-upload-record',
    method: 'get'
  })
}

export function processData(query) {
  return request({
    url: '/data-preprocess',
    method: 'post',
    params: query,
    timeout: 60000 // TODO 超时时间,此处设置为60s(后续考虑调整为更大,因为该请求处理时间较长)
  })
}

export function getPermissionChange(query) {
  return request({
    url: '/get-permission-change',
    method: 'post',
    params: query
  })
}

