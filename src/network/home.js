import {
	request
} from './request';

export function getHomeRecommendList() {
	return request({
		url: '/orders/randomOrders',
		params: {time: new Date()},
	})
}