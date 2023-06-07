export interface ICategory {
	id: number
	name: string
	slug: string
	generalCategory: ICategory
	subcategories: ICategory[]
}
