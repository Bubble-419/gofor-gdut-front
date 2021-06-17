import {request} from './request';

export function searchbyorderid(orderId){
    return request({
        url:'/admin/getOrdersById?orderId='+orderId,
    })
}
export function allorders(currentPage,size=20){
    return request({
        url:'/admin/allOrders?currentPage='+currentPage+'&size='+size,
    })
}
export function dateorders(currentPage,size=20,time){
    return request({
        url:'/orders/dateOrders?currentPage='+currentPage+'&size='+size+'&time='+time,
    })
}