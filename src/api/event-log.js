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
    data: query
  })
}

export function getUploadRecord(query) {
  return request({
    url: '/get-upload-record',
    method: 'get'
  })
}

