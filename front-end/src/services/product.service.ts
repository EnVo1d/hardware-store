import {
	IProduct,
	TypeProductData,
	TypeProductFilters
} from '@/types/product.interface'

import { instance } from '@/api/api.interceptor'

const PRODUCTS = 'products'

export const ProductService = {
	async getAll(queryData = {} as TypeProductFilters) {
		return instance<IProduct[]>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})
	},

	async getAllByCategory(categorySlug: string) {
		return instance<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getSimilar(productId: string | number) {
		return instance<IProduct[]>({
			url: `${PRODUCTS}/similar/${productId}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return instance<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})
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
