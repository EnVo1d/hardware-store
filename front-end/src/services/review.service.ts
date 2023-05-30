import { IReview, TypeReviewData } from '@/types/review.interface'

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

	async leave(productId: string | number, data: TypeReviewData) {
		return instance<IReview>({
			url: `${REVIEWS}/leave/${productId}`,
			method: 'POST',
			data
		})
	}
}
