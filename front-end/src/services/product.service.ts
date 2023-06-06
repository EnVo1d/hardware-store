import {
	IProduct,
	TypePaginationProducts,
	TypeProductData,
	TypeProductFilters
} from '@/types/product.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'
import { IReviews } from '@/types/review.interface'

const PRODUCTS = 'products'

export const ProductService = {
	async getAll(queryData = {} as TypeProductFilters) {
		const { data } = await axiosClassic<TypePaginationProducts>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})
		return data
	},

	async getByCategory(categorySlug: string) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getSimilar(productId: string | number) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${productId}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async getBySlugReviews(slug: string) {
		const { data } = await axiosClassic<IReviews>({
			url: `${PRODUCTS}/by-slug-reviews/${slug}`,
			method: 'GET'
		})
		return data
	},

	async getById(productId: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${productId}`,
			method: 'GET'
		})
	},

	async create() {
		return instance<IProduct>({
			url: PRODUCTS,
			method: 'POST'
		})
	},

	async update(id: string | number, data: TypeProductData) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data
		})
	},

	async delete(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'DELETE'
		})
	}
}
