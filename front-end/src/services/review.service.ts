import { ILeaveReview, IReview } from '@/types/review.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

const REVIEWS = 'reviews'

export const ReviewService = {
	async getAll() {
		return axiosClassic<IReview[]>({
			url: REVIEWS,
			method: 'GET'
		})
	},

	async getAverageByProduct(productId: number | string) {
		return axiosClassic<number>({
			url: `${REVIEWS}/average/${productId}`,
			method: 'GET'
		})
	},

	async leave(params: ILeaveReview) {
		return instance<IReview>({
			url: `${REVIEWS}/leave/${params.productId}`,
			method: 'POST',
			data: params.data
		})
	}
}
