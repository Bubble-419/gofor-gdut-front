import axios from 'axios';

export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 6000,
  });

  instance.interceptors.request.use(config => {
    // TO-DO
    return config;
  }, err => {
    // TO-DO
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    // TO-DO
    return res;
  }, err => {
    // TO-DO
    console.log(err);
  });

  return instance(config);
}