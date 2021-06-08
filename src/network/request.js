import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 6000,
  });

  instance.interceptors.request.use(config => {
    // 请求拦截判断登陆权限
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  }, err => {
    // TO-DO
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    // TO-DO
    return res;
  }, err => {
    // 响应拦截，判断401权限错误，转到登录页
    if (err.response.status == '401') {
      this.$notify({
        title: '请先登录',
        type: 'warning',
      });
      this.$router.push({
        name: 'LoginPage'
      });
    }
    console.log(err);
  });

  return instance(config);
}