import {request} from './request';

export function searchuser(userId){
    return request({
        url:'/users/admin/getUserByName?'+userId,
    })
}

export function getUsersData(currentPage=1,size=20){
    return request({
        url:'/users/admin/allUsers?currentPage='+currentPage+'&size='+size,
    })
}

export function freezing(username,userStatus){
    return request({
        url:'/users/admin/userstatus?username='+username+'&userStatus='+userStatus,
    })
}

export function role(userId,roleId){
    return request({
        url:'/admin/role?userId='+userId+'&roleId='+roleId,
    })
}