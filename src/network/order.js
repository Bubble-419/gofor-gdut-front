import {
  request
} from './request';

// 获取订单详情
export function getDetail(params) {
  return request({
    url: '/orders/detail',
    params
  })
}

// 创建订单
export function publishOrder(params) {
  return request({
    url: '/orders/publish',
    method: 'post',
    params
  })
}

// 获取用户发布的定单
export function publishedOrders(params) {
  return request({
    url: '/orders/publishOrders',
    params
  })
}
// 获取用户接受的定单
export function receivedOrders(params) {
  return request({
    url: '/orders/receiveOrders',
    params
  })
}

// 修改订单信息
export function uodateOrder(params) {
  return request({
    url: '/orders/update',
    method: 'put',
    params
  })
}

// 取消订单
export function cancelOrder(params) {
  return request({
    url: '/orders/cancel',
    method: 'put',
    params
  })
}

// 接受订单
export function receiveOrder(params) {
  return request({
    url: '/orders/receive',
    method: 'put',
    params
  })
}

// 完成订单
export function finishOrder(params) {
  return request({
    url: '/orders/finish',
    method: 'put',
    params
  })
}

// 评价订单
export function commentOrder(params) {
  return request({
    url: '/orders-comment/comment',
    method: 'post',
    params
  })
}

// 回复评价
export function commentRepalyOrder(params) {
  return request({
    url: '/orders-comment-replay/replay',
    method: 'post',
    params
  })
}