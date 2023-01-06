import request from '@/utils/request'

export function buildModel(query) {
  return request({
    url: '/build-process-model',
    method: 'post',
    params: query
  })
}

export function getModel(query) {
  return request({
    url: '/get-process-model',
    method: 'post',
    params: query
  })
}

export function conformanceCheck(query) {
  return request({
    url: '/conformance-check',
    method: 'post',
    params: query
  })
}

export function getConformanceCheckResult(query) {
  return request({
    url: '/get-conformance-check-result',
    method: 'post',
    params: query
  })
}
