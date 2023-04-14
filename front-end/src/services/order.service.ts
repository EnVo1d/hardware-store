import { IOrder } from '@/types/order.interface'

import { instance } from '@/api/api.interceptor'

const ORDERS = 'orders'

export const OrderService = {
	async getAll() {
		return instance<IOrder[]>({
			url: ORDERS,
			method: 'GET'
		})
	}
}
