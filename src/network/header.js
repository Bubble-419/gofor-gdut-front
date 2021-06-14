import {
  request
} from './request';

export function searchByKeywords(params) {
  return request({
    url: `/orders/search`,
    method: 'post',
    params
  })
}