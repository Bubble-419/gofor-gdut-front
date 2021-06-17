import {request} from './request';

export function searchuser(username){
    return request({
        url:'/admin/getUserByName?username='+username,
    })
}

export function getUsersData(currentPage=1,size=20){
    return request({
        url:'/admin/allUsers?currentPage='+currentPage+'&size='+size,
    })
}

export function freezing(params){
    return request({
        url:'/admin/userstatus',
        method:'put',
        params,
    })
}

export function role(params){
    return request({
        url:'/admin/role',
        method:'put',
        params,
    })
}