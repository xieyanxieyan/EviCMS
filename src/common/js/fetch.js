import axios from 'axios';
// 创建axios实例
const service = axios.create({
    baseURL: 'http://118.190.143.6/', // admin的base_url
    timeout: 5000                  // 请求超时
}
);
// service.interceptors.request.use(config => {
//     //发送请求之前检测Token
//     if (store.getters.token) {
//     config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
// }
// return config
// },error => {
//     // Do something with request error
//     console.log(error) // for debug
//     Promise.reject(error)
// });
export default service;
