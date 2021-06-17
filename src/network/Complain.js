import {request} from './request';

export function searchcomplain(currentPage,size=20){
    return request({
        url:'/admin/allComplains?currentPage='+currentPage+'&size='+size,
    })
}
export function changecomplain(params){
    return request({
        url:'/complains/isread',
        method:'put',
        params,
    })
}
//获取未读状态
export function selectisread(currentPage,size=20){
    return request({
        url:'/admin/complainsList?currentPage='+currentPage+'&size='+size,
    })
}
//获取已读状态
export function selectread(currentPage,size=20){
    return request({
        url:'/admin/readComplains?currentPage='+currentPage+'&size='+size,
    })
}
export function selectmonth(currentPage,size=20,time){
    return request({
        url:'/admin/dateComplains?currentPage='+currentPage+'&size='+size+'&time='+time,
    })
}


