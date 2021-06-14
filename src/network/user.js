import {
  request
} from './request';

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function register(params, data) {
  return request({
    url: '/register',
    method: 'post',
    params,
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
  })
}

export function getUserInfo() {
  return request({
    url: '/info',
  })
}

export function getUserInfoById(params) {
  return request({
    url: '/users/getUserById',
    params
  })
}

export function updateUserInfo(data) {
  return request({
    url: '/users/userinfo',
    method: 'put',
    data
  })
}

export function getCaptcha() {
  return request({
    url: '/captcha?time=' + new Date(),
  })
}

export function updatePwd(data) {
  return request({
    url: '/users/userpwd',
    method: 'put',
    data
  })
}

// 用户进行投诉反馈
export function complain(data) {
  return request({
    url: '/complains/complain',
    method: 'post',
    data
  })
}