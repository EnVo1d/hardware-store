import { Prisma } from '@prisma/client'

export const returnCategoryObject: Prisma.CategorySelect = {
	id: true,
	name: true,
	slug: true,
	generalCategory: {
		select: {
			id: true,
			name: true,
			slug: true,
			generalCategory: true,
			subcategories: true
		}
	},
	subcategories: {
		select: {
			id: true,
			name: true,
			slug: true,
			generalCategory: true,
			subcategories: true
		}
	}
}
