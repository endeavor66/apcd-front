import request from '@/utils/request'

export function anomalyDetect(query) {
  return request({
    url: '/anomaly-detect',
    method: 'post',
    params: query
  })
}

export function getAnomalyResult(query) {
  return request({
    url: '/get-anomaly-result',
    method: 'post',
    params: query
  })
}
