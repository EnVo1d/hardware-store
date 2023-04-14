import { IPaymentResponse } from '@/types/payment.interface'

import { instance } from '@/api/api.interceptor'

const PAYMENT = 'payment'

export const PaymentService = {
	async createPayment(amount: number) {
		return instance.post<IPaymentResponse>(PAYMENT, { amount })
	}
}
