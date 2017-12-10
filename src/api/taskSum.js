import fetch from '@/common/js/fetch';
// 待处理事件统计
export function task() {
    return fetch({
        method: 'get',
        url: 'statistic/task'
    });
}
