import axios from 'axios';
import store from '../../store';
import {getToken} from './auth';
// 创建axios实例
const service = axios.create({
        baseURL: 'http://118.190.143.6/',  //  admin的base_url
        timeout: 5000                  //  请求超时
    }
);
service.interceptors.request.use(config => {
    // 发送请求之前检测Token
    if (store.getters.token) {
        config.headers['auth-token'] = getToken(); // 为每个请求添加token
    }
    return config;
}, error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
});
export default service;
