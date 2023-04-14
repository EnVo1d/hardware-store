import { IUser } from './user.interface'

export interface IReview {
	id: number
	user: IUser
	createdAt: string
	text: string
	rating: string
}

export type TypeReviewData = {
	rating: number
	text: string
}
