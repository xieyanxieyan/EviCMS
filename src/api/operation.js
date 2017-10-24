import fetch from '@/common/js/fetch';
// 获取出证详情
export function getCertifyDetail(cert_id) {
    return fetch({
       method: 'get',
       url: 'operation/certify/detail',
        cert_id
    });
}
// 出证列表
export function certifyList(phone, cert_num, time_begin, time_end) {
const params = {
    phone,
    cert_num,
    time_begin,
    time_end
};
return fetch({
    method: 'get',
    url: 'operation/certify/list',
    params
});
}

// 出庭列表
export function trailManage(time_begin, time_end) {
    const params = {
        time_begin,
        time_end
    };
    return fetch({
        method: 'get',
        url: 'operation/court/list',
        params
    });
}
