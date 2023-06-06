import { IUser } from './user.interface'

export interface IReview {
	id: number
	user: IUser
	createdAt: string
	text: string
	rating: number
}

export type TypeReviewData = {
	rating: number
	text: string
}

export interface ILeaveReview {
	productId: string | number
	data: TypeReviewData
}

export interface IReviews {
	reviews: IReview[]
}
