import {
  request
} from './request';

export function searchByKeywords(params) {
  return request({
    url: `/orders/search`,
    params
  })
}