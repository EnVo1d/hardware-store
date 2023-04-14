import { IReview, TypeReviewData } from '@/types/review.interface'

import { instance } from '@/api/api.interceptor'

const REVIEWS = 'reviews'

export const ReviewService = {
	async getAll() {
		return instance<IReview[]>({
			url: REVIEWS,
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
