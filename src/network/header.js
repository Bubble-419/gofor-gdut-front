import {
  request
} from './request';

export function searchByKeywords(keywords) {
  return request({
    // 假设api
    url: `/search/${keywords}`,
    method: 'post',
    params: {
      keywords: keywords
    }
  })
}