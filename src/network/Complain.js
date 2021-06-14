import {request} from './request';

export function searchcomplain(currentPage,size=20){
    return request({
        url:'/complains/admin/allComplains?currentPage='+currentPage+'&size='+size,
    })
}
export function changecomplain(complainId=1){
    return request({
        url:'/complains/admin/allComplains?complainId='+complainId,
    })
}
export function selectisread(currentPage,size=20){
    return request({
        url:'/complains/complainsList?currentPage='+currentPage+'&size='+size,
    })
}
export function selectread(currentPage,size=20){
    return request({
        url:'/complains/readComplains?currentPage='+currentPage+'&size='+size,
    })
}
export function selectmonth(currentPage,size=20,time){
    return request({
        url:'/complains/dateComplains?currentPage='+currentPage+'&size='+size+'&time='+time,
    })
}


