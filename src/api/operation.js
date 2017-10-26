import fetch from '@/common/js/fetch';
// 投诉建议列表
export function feedbackList(status) {
    const params = {
        status
    };
    return fetch({
        method: 'get',
        url: 'operation/feedback/list',
        params
    });
}
// 投诉建议详情
export function feedbackdetail(report_id) {
    const params = {
        report_id
    };
    return fetch({
        method: 'get',
        url: 'operation/feedback/detail',
        params
    });
}
// 投诉建议回复
export function feedbackreplay(report_id, content) {
    const params = {
        report_id,
        content
    };
    return fetch({
        method: 'post',
        url: 'operation/feedback/reply',
        params
    });
}
// 获取出证详情
export function getCertifyDetail(cert_id) {
    const params = {
        cert_id
    };
    return fetch({
       method: 'get',
       url: 'operation/certify/detail',
        params
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
