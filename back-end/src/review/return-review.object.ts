import { Prisma } from '@prisma/client'

export const returnReviewObject: Prisma.ReviewSelect = {
	user: {
		select: {
			id: true,
			name: true,
			surname: true
		}
	},
	createdAt: true,
	text: true,
	rating: true,
	id: true
}
