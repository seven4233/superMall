import request from './request'

// 请求详情页数据
export function getDetail(id) {

    return request({
        url: '/detail',
        params: {
            iid: id
        }

    })
}

// 请求详情页 ————推荐数据
export function getRecommend() {
    return request({
        url: '/recommend',

    })
}