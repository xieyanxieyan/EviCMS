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

// 退款列表
export function getRefundList(username, cert_no, time_begin, time_end, status) {
    const params = {
        username,
        cert_no,
        time_begin,
        time_end,
        status
    };
    return fetch({
        method: 'get',
        url: 'operation/refund/list',
        params
    });
}

// 退款处理
export function refundHandle(request_id, reason, is_agree) {
    const params = {
        request_id,
        reason,
        is_agree
    };
    return fetch({
        method: 'post',
        url: 'operation/refund/handle',
        params
    });
}

// 获取出证详情
export function getCertifyDetail(apply_id) {
    const params = {
        apply_id
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
// 出证编辑
export function certifyUpdate(apply_id, username, phone, address, exp_num, exp_company, form_sign) {
    const params = {
        apply_id,
        username,
        phone,
        address,
        exp_num,
        exp_company,
        form_sign
    };
    return fetch({
        method: 'post',
        url: 'operation/certify/update',
        params
    });
}
// 出庭列表
export function trailManage(time_begin, time_end, status) {
    const params = {
        time_begin,
        time_end,
        status
    };
    return fetch({
        method: 'get',
        url: 'operation/court/list',
        params
    });
}
// 出庭详情
export function courtDetail(apply_id) {
    const params = {
        apply_id
    };
    return fetch({
        method: 'get',
        url: 'operation/court/detail',
        params
    });
}

